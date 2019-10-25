import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	faCaretDown,
	faChevronDown,
	faChevronUp,
	IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {
	defaultSelectAllLabel,
	defaultSelectNoneLabel,
	defaultShowLessLabel,
	defaultShowMoreLabel,
	defaultOptionShowCount,
	SimpleOption,
	SimpleRefinerDefinition
} from '../../shared';

@Component({
	selector: 'porcelain-simple-refiner',
	templateUrl: './simple-refiner.component.html',
	styleUrls: ['./simple-refiner.component.scss'],
	animations: []
})
export class SimpleRefinerComponent implements OnInit {
	// Inputs
	@Input() refiner: SimpleRefinerDefinition;
	@Input('showCount') _showCount: number;
	@Input('isOpen') _isOpen: boolean;
	@Input('isExpanded') _isExpanded: boolean;

	@Input('showLessLabel') showLessLabel = defaultShowLessLabel;
	@Input('showMoreLabel') showMoreLabel = defaultShowMoreLabel;
	@Input('selectAllLabel') selectAllLabel = defaultSelectAllLabel;
	@Input('selectNoneLabel') selectNoneLabel = defaultSelectNoneLabel;

	// Getters
	get showCount() {
		return this._showCount || this.refiner.showCount || defaultOptionShowCount;
	}

	set showCount(newCount: number) {
		this._showCount = newCount;
	}

	get isOpen() {
		return this._isOpen;
	}

	set isOpen(newIsOpenValue: boolean) {
		this._isOpen = newIsOpenValue;
	}

	get isExpanded(): boolean {
		return this._isExpanded;
	}

	set isExpanded(newIsExpandedValue: boolean) {
		this._isExpanded = newIsExpandedValue;
	}

	// Outputs
	@Output() onRefinerChange: EventEmitter<any> = new EventEmitter();

	// Icons
	faChevronDown: IconDefinition = faCaretDown;
	contractIcon: IconDefinition = faChevronUp;
	expandIcon: IconDefinition = faChevronDown;

	// State
	values: { [optionSlug: string]: boolean } = {};
	private ignoreNext: boolean = false;

	constructor() {
		console.group('SimpleRefinerComponent > constructor()');

		console.groupEnd();
	}

	ngOnInit() {
		// Pick the `isOpen` value;
		let isOpen = true;

		if (this.refiner && typeof this.refiner.isOpen === 'boolean') {
			isOpen = this.refiner.isOpen;
		}

		if (typeof this._isOpen === 'boolean') {
			isOpen = this._isOpen;
		}

		this.isOpen = !!isOpen;

		// Pick the `showCount` value
		let showCount = defaultOptionShowCount;

		if (this.refiner && typeof this.refiner.showCount === 'number') {
			showCount = this.refiner.showCount;
		}

		if (typeof this._showCount === 'number') {
			showCount = this._showCount;
		}

		this.showCount = showCount;

		// Pick the `isExpanded` value
		let isExpanded = false;

		if (this.refiner && typeof this.refiner.isExpanded === 'boolean') {
			isExpanded = this.refiner.isExpanded;
		}

		if (typeof this._isExpanded === 'boolean') {
			isExpanded = this._isExpanded;
		}

		this._isExpanded = !!isExpanded;

		// Selected options can be modified with the refiner.valueSubject Observable
		// newValue is an array of option slugs to set as true
		this.refiner.valueSubject.subscribe(selectedOptionSlugs => {
			console.group(
				'SimpleRefinerComponent.ngOnInit > this.refiner.valueSubject.subscribe(selectedOptionSlugs)'
			);

			if (this.ignoreNext) {
				this.ignoreNext = false;
			} else {
				// blank the values first
				this.values = Object.keys(this.refiner.options).reduce((result, optionSlug) => {
					result[optionSlug] = false;
					return result;
				}, {});

				// then, set any true values
				selectedOptionSlugs.forEach(optionSlug => {
					this.values[optionSlug] = true;
				});
			}

			console.groupEnd();
		});

		// Enables the callback API <porcelain-simple-refiner (onRefinerChange)="..."></porcelain-simple-refiner>
		this.refiner.valueSubject.subscribe(newValue =>
			this.onRefinerChange.emit([this.refiner.slug, newValue])
		);
	}

	toggleExpanded(): void {
		this._isExpanded = !this._isExpanded;
	}

	toggleOpen(): void {
		this._isOpen = !this._isOpen;
	}

	countTail(): number {
		return Object.keys(this.refiner.options).length - this._showCount;
	}

	canExpand(): boolean {
		return this.refiner.type === 'simple'
			? Object.keys(this.refiner.options).length > this._showCount
			: false;
	}

	getExpandedOptionKeys(): string[] {
		return this._isExpanded
			? Object.keys(this.refiner.options)
			: Object.keys(this.refiner.options).slice(0, this._showCount);
	}

	optionHasBadge(option: string | SimpleOption): boolean {
		if (typeof option === 'string') {
			return false;
		} else {
			return option.badge && option.badge !== '';
		}
	}

	getOptionLabel(option: string | SimpleOption): string {
		if (typeof option === 'string') {
			return option;
		} else {
			return option.label;
		}
	}

	getOptionBadge(option: SimpleOption) {
		if (typeof option.badge === 'number') {
			return option.badge.toLocaleString();
		} else {
			return option.badge;
		}
	}

	getValue(): string[] {
		// return the keys where the value is true
		return Object.keys(this.values).filter(key => this.values[key]);
	}

	canSelectNone(): boolean {
		return Object.keys(this.values).every(paramName => this.values[paramName] === true);
	}

	selectNone() {
		this.setAll(false);
	}

	canSelectAll(): boolean {
		return Object.keys(this.values).some(paramName => this.values[paramName] === false);
	}

	selectAll() {
		return this.setAll(true);
	}

	/**
	 * Sets all options to newValue; Used to enable select all/select none capability.
	 */
	setAll(newValue: boolean) {
		// only needed for TypeScript
		if (this.refiner instanceof SimpleRefinerDefinition) {
			const checked = newValue
				? Object.keys(this.refiner.options) // all selected
				: []; // none selected

			this.ignoreNext = false;
			this.refiner.valueSubject.next(checked);
		}
	}

	/**
	 * Called in Angular template to initiate the propagation of the new values.
	 */
	onSelectionChange() {
		this.ignoreNext = true;
		this.refiner.valueSubject.next(this.getValue());
	}
}
