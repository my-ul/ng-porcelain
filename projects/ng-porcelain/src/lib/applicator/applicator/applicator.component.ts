import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { isEqual } from 'lodash-es';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { TranslationService } from '../../services/translation/translation.service';
import { IDictionary } from './../../shared/types/Containers/IDictonary/IDictionary';

import { BaseRefinerDefinition } from './../../shared/types/Refiners/BaseRefinerDefinition';

import { SimpleRefinerDefinition } from './../../shared/types/Refiners/SimpleRefinerDefinition';
import { OptionRefinerValue } from './../../shared/types/Values/OptionRefinerValue';

import { DateRefinerDefinition } from './../../shared/types/Refiners/DateRefinerDefinition';
import { DateRefinerValue } from './../../shared/types/Values/DateRefinerValue';
import { Loggable } from '../../Loggable';

//import refiner component
import { RefinersComponent } from '../../refiners/refiners/refiners.component';

// https://projects.invisionapp.com/share/J8RB454F2AY#/355536379_44843_-_1

/*
	<porcelain-applicator refiners="myRefinerArray" (onApply)="myControllerApplyHandler($event)"></porcelain-applicator>

	class MyComponent {
		myRefinerArray= []; // see below

		myControllerApplyHandler() {
			// console.log(args);
		}
	}
*/

export type RefinerValueDictionary = IDictionary<DateRefinerValue | OptionRefinerValue>;

@Component({
	selector: 'porcelain-applicator',
	templateUrl: './applicator.component.html',
	styleUrls: ['./applicator.component.scss']
})
export class ApplicatorComponent extends Loggable implements OnInit, OnDestroy {
	readonly name: string = 'ApplicatorComponent';
	private initialLoad: boolean = true;
	private subscriptions: Subscription[] = [];

	@Input() public applyLabel: string = 'Apply';
	@Input() public loadingLabel: string = 'Loading';
	@Input() public resetLabel: string = 'Reset';

	@Input() public allowIncompleteEmit: boolean = true;
	@Input() public applyOnInit: boolean = true;

	@Input() public defaultValues: RefinerValueDictionary = {};
	private stagedValues: RefinerValueDictionary = {};
	private appliedValues: RefinerValueDictionary = {};

	@Input() public refiners: BaseRefinerDefinition[] = [];
	@Output() public onApply: EventEmitter<any> = new EventEmitter();

	//view child for manipulating child components

	@ViewChild(RefinersComponent, { static: false }) refinerComponent: RefinersComponent;

	constructor(private translationService: TranslationService) {
		super();
		this.translationService.getTranslations().subscribe(
			TranslationService.translate<ApplicatorComponent>(this, {
				label_Apply: 'applyLabel',
				label_Loading: 'loadingLabel',
				label_Reset: 'resetLabel'
			})
		);
	}

	public apply() {
		this.appliedValues = Object.assign(this.appliedValues, this.stagedValues);
		this.onApply.emit({
			appliedValues: this.appliedValues,
			initialLoad: this.initialLoad
		});
	}

	public beforeApply(): void {
		this.initialLoad = false;
		this.apply();
	}

	public canApply(): boolean {
		return !isEqual(this.stagedValues, this.appliedValues);
	}

	public canReset(): boolean {
		return !isEqual(this.stagedValues, this.defaultValues);
	}

	public getDefaultValueForRefiner(
		refiner: SimpleRefinerDefinition | DateRefinerDefinition | BaseRefinerDefinition
	): OptionRefinerValue | DateRefinerValue {
		this.debug('getDefaultValueForRefiner(refiner)', { refiner });

		// If a default value exists for the slug, return it immediately
		if (this.defaultValues && this.defaultValues[refiner.slug]) {
			return this.defaultValues[refiner.slug];
		}

		// Otherwise, return an empty array for Simple Refiner and "All" for Date Refiner
		if (refiner.type === 'simple' || refiner instanceof SimpleRefinerDefinition) {
			return [] as OptionRefinerValue;
		} else if (refiner.type === 'date' || refiner instanceof DateRefinerDefinition) {
			return {
				from: null,
				to: null,
				optionSlug: '-1'
			} as DateRefinerValue;
		}

		// Only reached with invalid refiner definitions.
		throw new Error(
			'Unable to get determine Refiner type from Refiner Definition. Ensure Refiner Definition contains `type` field.'
		);
	}

	public handleRefinerValues(refinerSlug, refinerValue): void {
		this.log('handleRefinerValues(refinerSlug, refinerValue)', { refinerSlug, refinerValue });
		this.stagedValues[refinerSlug] = refinerValue;
	}

	public ngOnDestroy() {
		// prevents memory leaks by properly unsubscribing when this component unmounts.
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	public ngOnInit() {
		// generate defaultValues dictionary composite from implicit + explicit values
		this.refiners.forEach(refiner => {
			this.defaultValues[refiner.slug] = this.getDefaultValueForRefiner(refiner);
		});

		// take first values and send up
		this.subscriptions = this.refiners.reduce((allSubscriptions, refiner) => {
			return [
				...allSubscriptions,
				// Get notified when value changes
				refiner.valueSubject.subscribe(newRefinerValues =>
					this.handleRefinerValues(refiner.slug, newRefinerValues)
				)
			];
		}, []);

		// Must execute after the rest of the subscriptions callbacks.
		if (this.applyOnInit) {
			combineLatest(this.refiners.map(refiner => refiner.valueSubject.pipe(take(1)))).subscribe(
				allRefinersInitialized => {
					this.apply();
				}
			);
		}
	}

	public reset(): void {
		this.refiners.forEach(refiner => {
			refiner.valueSubject.next(this.getDefaultValueForRefiner(refiner));
		});
		this.beforeApply();
		//if reset if clicked empty simple refiner text selections
		this.refinerComponent.clearSearchTextOfSimpleRefiners();
	}
}
