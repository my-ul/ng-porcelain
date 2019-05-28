import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { isEqual } from 'lodash-es';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BaseRefinerDefinition } from '../../shared/types/Refiners/BaseRefinerDefinition';

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

@Component({
	selector: 'porcelain-applicator',
	templateUrl: './applicator.component.html',
	styleUrls: ['./applicator.component.scss']
})
export class ApplicatorComponent implements OnInit, OnDestroy {
	@Input()
	refiners: BaseRefinerDefinition[] = [];

	@Input() applyLabel: string = 'Apply';
	@Input() resetLabel: string = 'Reset';
	@Input() loadingLabel: string = 'Loading';

	@Output() onApply: EventEmitter<any> = new EventEmitter();

	public stagedValues: any = {};
	public initialValues: any = {};
	public appliedValues: any = {};

	private subscriptions: Subscription[] = [];

	constructor() {
		console.group('ApplicatorComponent > constructor()');

		console.groupEnd();
	}

	ngOnInit() {
		console.group('ngOnInit()');

		// take first values and send up
		this.subscriptions = this.refiners.reduce((allSubscriptions, refiner) => {
			return [
				...allSubscriptions,
				// Capture the initial value for the reset procedure
				refiner.valueSubject
					.pipe(take(1))
					.subscribe(
						initialRefinerValues => (this.initialValues[refiner.slug] = initialRefinerValues)
					),

				// Get notified when value changes
				refiner.valueSubject.subscribe(newRefinerValues =>
					this.handleRefinerValues(refiner.slug, newRefinerValues)
				)
			];
		}, []);

		// Must execute after the rest of the subscriptions callbacks.
		combineLatest(this.refiners.map(refiner => refiner.valueSubject.pipe(take(1)))).subscribe(
			allRefinersInitialized => {
				console.group('combineLatest.subscribe(allRefinersInitialized)');
				console.log({ allRefinersInitialized });

				this.apply();

				console.groupEnd();
			}
		);

		console.groupEnd();
	}

	ngOnDestroy() {
		// prevents memory leaks by properly unsubscribing when this component unmounts.
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	handleRefinerValues(refinerSlug, refinerValue): void {
		console.group('ApplicatorComponent > handleRefinerValues(refinerSlug, refinerValue)');
		console.log({ refinerSlug, refinerValue });

		this.stagedValues[refinerSlug] = refinerValue;

		console.groupEnd();
	}

	canApply(): boolean {
		return !isEqual(this.stagedValues, this.appliedValues);
	}

	canReset(): boolean {
		return !isEqual(this.stagedValues, this.initialValues);
	}

	apply(): void {
		console.group('apply()');

		this.appliedValues = Object.assign(this.appliedValues, this.stagedValues);
		this.onApply.emit(this.appliedValues);

		console.groupEnd();
	}

	reset(): void {
		console.group('reset()');

		this.refiners.forEach(refiner => {
			console.group('ApplicatorComponent > reset() > this.refiners.forEach(refiner)');
			console.log({ refiner });

			refiner.valueSubject.next(this.initialValues[refiner.slug]);

			console.groupEnd();
		});

		this.apply();

		console.groupEnd();
	}
}
