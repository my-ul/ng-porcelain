import { DateRefinerValue } from './../../shared/types/Values/DateRefinerValue';
import { OptionRefinerValue } from './../../shared/types/Values/OptionRefinerValue';
import { DateRefinerDefinition } from './../../shared/types/Refiners/DateRefinerDefinition';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { isEqual } from 'lodash-es';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BaseRefinerDefinition } from '../../shared';
import { SimpleRefinerDefinition, IDictionary } from '../../shared';

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
	// #region Properties (9)

	private appliedValues: RefinerValueDictionary = {};
	private stagedValues: RefinerValueDictionary = {};
	private subscriptions: Subscription[] = [];
	private initialLoad: boolean = true;

	@Input() public refiners: (BaseRefinerDefinition)[] = [];
	@Input() public defaultValues: RefinerValueDictionary = {};
	@Input() public applyOnInit: boolean = true;

	@Input() public applyLabel: string = 'Apply';
	@Input() public loadingLabel: string = 'Loading';
	@Input() public resetLabel: string = 'Reset';

	@Output() public onApply: EventEmitter<any> = new EventEmitter();

	// #endregion Properties (9)

	// #region Constructors (1)

	constructor() {
		console.group('new ApplicatorComponent()', { arguments });

		console.groupEnd();
	}

	// #endregion Constructors (1)

	// #region Public Methods (8)

	public apply(): void {
		console.group('apply()');

		this.appliedValues = Object.assign(this.appliedValues, this.stagedValues);
		this.onApply.emit(this.appliedValues);

		console.groupEnd();
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
				defaultValues: this.defaultValues
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

					this.onApplyValues();

					console.groupEnd();
				}
			);
		}

		console.groupEnd();
	}


	canApply(): boolean {
		return !isEqual(this.stagedValues, this.appliedValues);
	}

	canReset(): boolean {
		return !isEqual(this.stagedValues, this.defaultValues);
	}

	apply(): void {
		console.group('apply()');

		this.initialLoad = false;

		this.onApplyValues();

		console.groupEnd();
	}

	onApplyValues() {
		console.group('onApplyValues()');
		this.appliedValues = Object.assign(this.appliedValues, this.stagedValues);
		this.onApply.emit({ appliedValues: this.appliedValues, initialLoad: this.initialLoad });
		console.groupEnd();
	}

	reset(): void {
		console.group('reset()');

		this.refiners.forEach(refiner => {
			console.group('this.refiners.forEach(refiner)', { refiner });

			refiner.valueSubject.next(this.getDefaultValueForRefiner(refiner));

			console.groupEnd();
		});

		this.apply();

		console.groupEnd();
	}

	// #endregion Public Methods (8)
}
