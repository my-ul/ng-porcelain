import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	OnChanges,
	SimpleChanges,
	ViewChild,
	ElementRef,
	Renderer2
} from '@angular/core';

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

import { RefinersComponent } from '../../refiners/refiners/refiners.component';
import ResizeObserver from 'resize-observer-polyfill';

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
	selector: 'porcelain-applicator, p-applicator',
	templateUrl: './applicator.component.html',
	styleUrls: ['./applicator.component.scss']
})
export class ApplicatorComponent extends Loggable implements OnInit, OnChanges, OnDestroy {
	readonly name: string = 'ApplicatorComponent';
	private initialLoad: boolean = true;
	private resetClicked: boolean = false;
	private subscriptions: Subscription[] = [];

	@Input() public applyLabel: string = 'Apply';
	@Input() public loadingLabel: string = 'Loading';
	@Input() public resetLabel: string = 'Reset';
	@Input() public allowIncompleteEmit: boolean = true;
	@Input() public applyOnInit: boolean = true;
	@Input() public disable: boolean = false; //flag to disable refiners in required apps
	@Input() public enableCustomDateRange: boolean = false; //flag to enable custom date range options in CP apps
	@Input() public defaultValues: RefinerValueDictionary = {};
	private stagedValues: RefinerValueDictionary = {};
	private appliedValues: RefinerValueDictionary = {};
	@Input() public stagedValuesofRefiner: RefinerValueDictionary = {};
	@Input() public refiners: BaseRefinerDefinition[] = [];
	@Output() public onApply: EventEmitter<any> = new EventEmitter();
	@Output() public onReset: EventEmitter<any> = new EventEmitter();
	//view child ref
	@ViewChild('refinerRef', { static: false }) public refinerCmpRef: RefinersComponent;
	@ViewChild('applicator') public applicatorRef: ElementRef<HTMLDivElement>;
	@ViewChild('stickyHeader') public stickyHeaderRef: ElementRef<HTMLDivElement>;

	private observer: ResizeObserver;

	constructor(private translationService: TranslationService, private renderer: Renderer2) {
		super();
		this.translationService.getTranslations().subscribe(
			TranslationService.translate<ApplicatorComponent>(this, {
				label_Apply: 'applyLabel',
				label_Loading: 'loadingLabel',
				label_Reset: 'resetLabel'
			})
		);
	}

	ngAfterViewInit() {
		//Observes the change in width of the #applicator element and sets the StickyHeader width accordingly
		this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const currentWidth = entries[0].contentRect.width;
			this.renderer.setStyle(this.stickyHeaderRef.nativeElement, 'width', `${currentWidth}px`);
		});
		this.observer.observe(this.applicatorRef.nativeElement);
	}

	public apply() {
		this.appliedValues = Object.assign({}, this.stagedValues);
		this.onApply.emit({
			appliedValues: this.appliedValues,
			initialLoad: this.initialLoad
		});
		console.log(this.appliedValues);
	}

	public beforeApply(): void {
		this.initialLoad = false;
		this.resetApply();
		this.apply();
	}

	public canApply(): boolean {
		this.debug('canApply()', { stagedValues: this.stagedValues, appliedValues: this.appliedValues });
		return !isEqual(this.stagedValues, this.appliedValues);
	}

	public canReset(): boolean {
		this.debug('canReset()', { stagedValues: this.stagedValues, defaultValues: this.defaultValues });
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
		if (refiner.type === 'radio') {
			return [];
		} else if (refiner.type === 'simple' || refiner instanceof SimpleRefinerDefinition) {
			return [] as OptionRefinerValue;
		} else if (refiner.type === 'date' || refiner instanceof DateRefinerDefinition) {
			if (this.enableCustomDateRange) {
				return {
					from: null,
					to: null,
					optionSlug: 'custom'
				} as DateRefinerValue;
			}
			return {
				from: null,
				to: null,
				optionSlug: '-1'
			} as DateRefinerValue;
		} else if (refiner.type === 'search') {
			return [];
		}

		// Only reached with invalid refiner definitions.
		throw new Error(
			'Unable to get determine Refiner type from Refiner Definition. Ensure Refiner Definition contains `type` field.'
		);
	}

	public handleRefinerValues(refinerSlug, refinerValue): void {
		this.log('handleRefinerValues(refinerSlug, refinerValue)', { refinerSlug, refinerValue });
		this.stagedValues[refinerSlug] = refinerValue;
		this.stagedValuesofRefiner = this.stagedValues;
	}

	public ngOnDestroy() {
		this.destroyExistingSubscriptions();
		this.observer.unobserve(this.applicatorRef.nativeElement);
	}

	public ngOnInit() {
		this.refinerNewSubscriptions();
		// Must execute after the rest of the subscriptions callbacks.
		if (this.applyOnInit) {
			combineLatest(this.refiners.map(refiner => refiner.valueSubject.pipe(take(1)))).subscribe(
				allRefinersInitialized => {
					this.apply();
				}
			);
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['refiners']) {
			console.log(changes['refiners']);
			this.destroyExistingSubscriptions();
			this.refinerNewSubscriptions();
		}
	}

	public reset(): void {
		this.refiners.forEach(refiner => {
			console.debug('reset()', refiner.slug, this.defaultValues[refiner.slug]);
			refiner.valueSubject.next(this.defaultValues[refiner.slug]);
		});
		this.resetClicked = true;
		this.beforeApply();
	}

	resetApply() {
		this.onReset.emit({
			resetClicked: this.resetClicked
		});
		this.resetClicked = false;
	}
	public refinerNewSubscriptions = (): void => {
		//reset default values for reset and apply states
		this.defaultValues = {};
		// update default values
		this.refiners.forEach(refiner => {
			this.defaultValues[refiner.slug] = this.getDefaultValueForRefiner(refiner);
		});
		// take first values and send up
		this.subscriptions = new Array<Subscription>();
		this.subscriptions = this.refiners.reduce((allSubscriptions, refiner) => {
			return [
				...allSubscriptions,
				// Get notified when value changes
				refiner.valueSubject.subscribe(newRefinerValues =>
					this.handleRefinerValues(refiner.slug, newRefinerValues)
				)
			];
		}, []);
	};
	public destroyExistingSubscriptions = (): void => {
		// prevents memory leaks by properly unsubscribing when this component unmounts.
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	};
}
