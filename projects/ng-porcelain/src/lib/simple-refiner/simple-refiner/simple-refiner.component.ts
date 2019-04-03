import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	faCaretDown,
	faChevronDown,
	faChevronUp
} from '@fortawesome/free-solid-svg-icons';

import { defaultOptionShowCount } from './defaultOptionShowCount';
import { defaultShowLessLabel } from '../../shared/labels/defaultShowLessLabel';
import { defaultShowMoreLabel } from '../../shared/labels/defaultShowMoreLabel';

import { SimpleRefiner, SimpleOption } from '../../shared/types';
import { defaultSelectAllLabel } from '../../shared/labels/defaultSelectAllLabel';
import { defaultSelectNoneLabel } from '../../shared/labels/defaultSelectNoneLabel';

@Component({
	selector: 'porcelain-simple-refiner',
	templateUrl: './simple-refiner.component.html',
	styleUrls: ['./simple-refiner.component.scss'],
	animations: []
})
export class SimpleRefinerComponent implements OnInit {
	// Inputs
	@Input() refiner: SimpleRefiner;
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
	faChevronDown = faCaretDown;
	contractIcon = faChevronUp;
	expandIcon = faChevronDown;

	// State
	value: object | SimpleOption;

	constructor() {}

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

		// Handle Show More/Show Less labels

		// Sets up the dictionary used for value state
		this.selectNone();

		// Options can be selected on load through Option.isSelected boolean
		if (this.refiner.options) {
			for (const optionSlug in this.refiner.options) {
				if (this.refiner.options.hasOwnProperty(optionSlug)) {
					const option = this.refiner.options[optionSlug];

					if (
						option instanceof SimpleOption ||
						option.hasOwnProperty('isSelected')
					) {
						if (option.slug !== optionSlug) {
							console.error(option);
						}

						// !! ensures a boolean value
						this.value[optionSlug] = !!option.isSelected;
					}
				}
			}
		}

		// Options should be selected on load through the refiner.selected array of selected optionSlugs
		if (this.refiner.selected) {
			for (const optionSlug of this.refiner.selected) {
				this.value[optionSlug] = true;
			}
		}
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
		return Object.keys(this.value).filter(key => this.value[key]);
	}

	canSelectNone(): boolean {
		return Object.keys(this.value).every(
			paramName => this.value[paramName] === true
		);
	}

	selectNone() {
		this.setAll(false);
	}

	canSelectAll(): boolean {
		return !this.canSelectNone();
	}

	selectAll() {
		return this.setAll(true);
	}

	setAll(value: any) {
		if (this.refiner.type === 'simple') {
			this.value = {};
			Object.keys(this.refiner.options).forEach(
				optionKey => (this.value[optionKey] = value)
			);
		}
		this.onSelectionChange();
	}

	onSelectionChange() {
		this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);
	}
}
