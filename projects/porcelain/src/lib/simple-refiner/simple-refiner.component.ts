import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	faCaretDown,
	faChevronDown,
	faChevronUp
} from '@fortawesome/free-solid-svg-icons';

// Porcelain
import { SimpleOption } from '../refiners/IOption';
import { SimpleRefiner } from '../refiners/IRefiner';
import { blockInitialAnimation } from '../shared/animations/blockInitialAnimation.trigger';
import { optionsInOut } from '../shared/animations/slideInOut.trigger';
import { defaultOptionShowCount } from './defaultOptionShowCount';

@Component({
	selector: 'porcelain-simple-refiner',
	templateUrl: './simple-refiner.component.html',
	styleUrls: ['./simple-refiner.component.scss']
})
export class SimpleRefinerComponent implements OnInit {
	// Inputs
	@Input() refiner: SimpleRefiner;
	@Input('showCount') _showCount: number;
	@Input('isOpen') _isOpen: boolean;
	@Input('isExpanded') _isExpanded: boolean;

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

		// Sets up the dictionary used for value state
		this.selectNone();

		// Options can be selected on load through Option.isSelected boolean
		if (this.refiner.options) {
			for (let optionSlug in this.refiner.options) {
				let option = this.refiner.options[optionSlug];

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

		// Options should be selected on load through the refiner.selected array of selected optionSlugs
		if (this.refiner.selected) {
			for (let optionSlug of this.refiner.selected) {
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
		if (typeof option.badge === 'number')
			return option.badge.toLocaleString();
		else return option.badge;
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
			for (let optionKey in this.refiner.options) {
				this.value[optionKey] = value;
			}
		} else {
			this.value = value;
		}
		this.onSelectionChange();
	}

	onSelectionChange() {
		this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);
	}
}
