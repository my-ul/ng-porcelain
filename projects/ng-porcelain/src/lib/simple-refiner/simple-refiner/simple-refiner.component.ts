import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	faCaretDown,
	faChevronDown,
	faChevronUp,
	IconDefinition,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

import { TranslationService } from '../../services/translation/translation.service';
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { defaultShowLessLabel } from '../../shared/defaults/labels/defaultShowLessLabel';
import { defaultShowMoreLabel } from '../../shared/defaults/labels/defaultShowMoreLabel';
import { defaultSelectAllLabel } from '../../shared/defaults/labels/defaultSelectAllLabel';
import { defaultSelectNoneLabel } from '../../shared/defaults/labels/defaultSelectNoneLabel';
import { defaultOptionShowCount } from '../../shared/defaults/properties/defaultOptionShowCount';
import { SimpleOption } from '../../shared/types/Options/SimpleOption';
import { SimpleOptions } from '../../shared/types/Options/SimpleOptions';

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

	//#region Labels

	@Input('showLessLabel') showLessLabel = defaultShowLessLabel;
	@Input('showMoreLabel') showMoreLabel = defaultShowMoreLabel;
	@Input('selectAllLabel') selectAllLabel = defaultSelectAllLabel;
	@Input('selectNoneLabel') selectNoneLabel = defaultSelectNoneLabel;

	//#endregion

	/**
	 * Accessibility label for the clear button.
	 */
	labelClear: string = 'Clear';

	/**
	 * Color for the clear icon.  By default, #9dacba
	 */
	@Input() clearIconColor: string = '#9dacba';

	/**
	 * The current query.
	 */
	query: string = '';

	/**
	 * Placeholder for text input when search field is empty
	 */
	@Input() labelPlaceholder: string = 'search';

	/**
	 * Icon for the clear button
	 */
	@Input() clearIcon = faTimesCircle;

	/**
	 *No results refiner message
	 * **/
	@Input() diplayNoResultsMessage: string = 'No results found';

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

	//#region Icons
	faChevronDown: IconDefinition = faCaretDown;
	contractIcon: IconDefinition = faChevronUp;
	expandIcon: IconDefinition = faChevronDown;
	//#endregion

	// State
	values: { [optionSlug: string]: boolean } = {};
	private ignoreNext: boolean = false;

	constructor(private translationService: TranslationService) {
		this.translationService.getTranslations().subscribe(
			TranslationService.translate<SimpleRefinerComponent>(this, {
				label_ShowMore: 'showMoreLabel',
				label_ShowLess: 'showLessLabel',
				label_SelectAll: 'selectAllLabel',
				label_SelectNone: 'selectNoneLabel'
			})
		);
	}
	/**
	 *Selected Values State
	 * */
	Selectedvalues: { [optionSlug: string]: boolean } = {};
	/**
	 *UnSelected Values State
	 *
	 * */
	UnSelectedValues: { [optionSlug: string]: boolean } = {};
	/***
	 *FilterUnselectedvalues stae
	 * */
	filterUnselectedValues: { [optionSlug: string]: boolean } = {};

	public SortSelectedAndUnSelectedValues = (): void => {
		//transfer all objects to unSelected
		let ArrayKeys: string[] = Object.keys(this.values);
		this.UnSelectedValues = ArrayKeys.filter(CurrentObjectkey => {
			return !this.values[CurrentObjectkey];
		}).reduce((resultObject, Objectkey) => {
			resultObject[Objectkey] = false;
			return resultObject;
		}, {});

		this.Selectedvalues = ArrayKeys.filter(CurrentObjectkey => {
			return this.values[CurrentObjectkey];
		}).reduce((resultObject, Objectkey) => {
			resultObject[Objectkey] = true;
			return resultObject;
		}, {});
	};

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

				//updated other selected and unselected states as well
				this.SortSelectedAndUnSelectedValues();
			}
		});

		// Enables the callback API <porcelain-simple-refiner (onRefinerChange)="..."></porcelain-simple-refiner>
		this.refiner.valueSubject.subscribe(newValue => {
			this.onRefinerChange.emit([this.refiner.slug, newValue]);
			this.SortSelectedAndUnSelectedValues();
			this.applyFilter();
		});
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
		let check = Object.keys(this.refiner.options);
		console.log(check);

		return this._isExpanded
			? Object.keys(this.refiner.options)
			: Object.keys(this.refiner.options).slice(0, this._showCount);
	}

	getSelectedOptionKeys(): string[] {
		return Object.keys(this.Selectedvalues);
	}
	getUnSelectedOptionKeys(): string[] {
		return Object.keys(this.filterUnselectedValues);
	}
	dsiplayErrorMessage(): boolean {
		return (
			Object.keys(this.filterUnselectedValues).length <= 0 &&
			this.query != '' &&
			Object.keys(this.Selectedvalues).length != Object.keys(this.values).length
		);
	}

	optionHasBadge(option: string | SimpleOption): boolean {
		if (typeof option === 'string') {
			return false;
		} else {
			if (option && option.badge && option.badge !== '') {
				return true;
			}
			return false;
		}
	}

	getOptionLabel(option: string | SimpleOption): string {
		if (typeof option === 'string') {
			return option;
		} else {
			if (option && option.label && typeof option.label === 'string') {
				return option.label;
			}
			return '';
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
	 * Sets all options to newValue; Used to enable select all/select none capability. And Also update all lists
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
	onSelectionChange(optionKey: string, value: boolean) {
		this.ignoreNext = true;
		this.refiner.valueSubject.next(this.getValue());
	}

	/*
	 * onkey press filter options*
	 */

	keyUp(event: KeyboardEvent) {
		this.applyFilter();
	}
	applyFilter(): this {
		let RefinerArrayKeys: string[] = Object.keys(this.UnSelectedValues);

		if (this.query != '') {
			this.filterUnselectedValues = RefinerArrayKeys.filter(CurrentObjectKey => {
				let optionlabel = this.getOptionLabel(this.refiner.options[CurrentObjectKey]);
				if (!this.UnSelectedValues[CurrentObjectKey]) {
					return optionlabel.toLowerCase().indexOf(this.query.trim().toLowerCase()) > -1;
				}
				return false;
			}).reduce((resultObject, Objectkey) => {
				resultObject[Objectkey] = false;
				return resultObject;
			}, {});
		} else {
			//As caution check for any true object using filter and use reduce to put new object in filterUnselectedValues
			this.filterUnselectedValues = RefinerArrayKeys.filter(CurrentObjectKey => {
				return !this.UnSelectedValues[CurrentObjectKey];
			}).reduce((resultObject, objectkey) => {
				resultObject[objectkey] = false;
				return resultObject;
			}, {});
		}
		return this;
	}

	/**
	 * Resets the component state to blank query and resets the filteredItems array.
	 */
	clear() {
		this.query = '';
		this.applyFilter();
	}
}
