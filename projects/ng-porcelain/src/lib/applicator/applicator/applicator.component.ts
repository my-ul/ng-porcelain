import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

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
export class ApplicatorComponent implements OnInit, OnDestroy {
	private initialLoad: boolean = true;
	private ApplyButtonDisable: boolean = false;
	private subscriptions: Subscription[] = [];

	@Input() public applyLabel: string = 'Apply';
	@Input() public loadingLabel: string = 'Loading';
	@Input() public resetLabel: string = 'Reset';

	@Input() public allowIncompleteEmit: boolean = true;
	@Input() public applyOnInit: boolean = true;
	@Input() public incorrectDateMessage: string = 'Please select a valid date range.';

	@Input() public defaultValues: RefinerValueDictionary = {};
	private stagedValues: RefinerValueDictionary = {};
	private appliedValues: RefinerValueDictionary = {};

	@Input() public refiners: BaseRefinerDefinition[] = [];
	@Output() public onApply: EventEmitter<any> = new EventEmitter();

	constructor(private translationService: TranslationService) {
		console.group('new ApplicatorComponent()', { arguments });

		this.translationService.getTranslations().subscribe(
			TranslationService.translate<ApplicatorComponent>(this, {
				label_Apply: 'applyLabel',
				label_Loading: 'loadingLabel',
				label_Reset: 'resetLabel'
			})
		);

		console.groupEnd();
	}

	public apply() {
		console.group('apply()');

		this.appliedValues = Object.assign(this.appliedValues, this.stagedValues);
		this.onApply.emit({
			appliedValues: this.appliedValues,
			initialLoad: this.initialLoad
		});

		console.groupEnd();
	}

	public beforeApply(): void {
		console.group('beforeApply()');

		this.initialLoad = false;

		this.apply();

		console.groupEnd();
	}

	public canApply(): boolean {
		if (this.ApplyButtonDisable == false) {
			return false;
		}
		return !isEqual(this.stagedValues, this.appliedValues);
	}
	disableButtonCheck(disable: boolean) {
		this.ApplyButtonDisable = disable;
	}

	public canReset(): boolean {
		return !isEqual(this.stagedValues, this.defaultValues);
	}

	public getDefaultValueForRefiner(
		refiner: SimpleRefinerDefinition | DateRefinerDefinition | BaseRefinerDefinition
	): OptionRefinerValue | DateRefinerValue {
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
		console.group('handleRefinerValues(refinerSlug, refinerValue)', {
			refinerSlug,
			refinerValue
		});

		this.stagedValues[refinerSlug] = refinerValue;

		console.groupEnd();
	}

	public ngOnDestroy() {
		// prevents memory leaks by properly unsubscribing when this component unmounts.
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	public ngOnInit() {
		console.group('ApplicatorComponent.ngOnInit()', {
			props: {
				refiners: this.refiners,
				applyLabel: this.applyLabel,
				resetLabel: this.resetLabel,
				loadingLabel: this.loadingLabel,
				defaultValues: this.defaultValues,
				allowIncompleteEmit: this.allowIncompleteEmit
			}
		});
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
					console.group('combineLatest.subscribe(allRefinersInitialized)', {
						allRefinersInitialized
					});

					this.apply();

					console.groupEnd();
				}
			);
		}

		console.groupEnd();
	}

	public reset(): void {
		console.group('reset()');

		this.refiners.forEach(refiner => {
			console.group('this.refiners.forEach(refiner)', { refiner });

			refiner.valueSubject.next(this.getDefaultValueForRefiner(refiner));

			console.groupEnd();
		});

		this.beforeApply();

		console.groupEnd();
	}
}
