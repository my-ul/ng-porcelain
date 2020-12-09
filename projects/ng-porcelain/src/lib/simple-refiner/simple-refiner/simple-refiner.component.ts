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
	 ** filtered refiner items which hold items that needs to be displayed
	 * */
	filteredUnSelectedRefinerItems: SimpleRefinerDefinition;

	/**
	 *
	 * * UI UN-Selected Filtered refiner optionKey that needs to be displayed
	 *
	 * */
	filteredUnselectedOptionKeys: string[] = [];

	/**
	 ** selected refiner items which hold items that needs to be displayed
	 * */
	SelectedRefinerItems: SimpleRefinerDefinition;

	/**
	 *
	 * * UI Selected Filtered refiner optionKey that needs to be displayed
	 *
	 * */
	selectedOptionKeys: string[] = [];

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

	/***
	 * To see if we can filter
	 **/
	isFilterListPossible: boolean = true;

	/**
	 * **/
	showNoResults: boolean = false;
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

	/***
	 *Logic:-
	 * Refiner options is master object list having all selected and unselected object items.
	 *
	 * Separate the unselected items into filteredUnSelectedRefinerItems and its UI filteredUnselectedOptionKeys
	 * separate the selected items into SelectedRefinerItems and its UI selectedOptionKeys
	 *
	 *
	 * */

	/***
	 *
	 *filterOptionsBasedOnSelection takes 3 parameters of refiner options, selectionfiltertype and return object
	 *
	 * */
	filterOptionsBasedOnSelection = (
		refinerOptions: SimpleOptions<SimpleOption, any>,
		isSelectedRefinersRequired: boolean = false,
		filteredOptionsBasedOnSelection: SimpleOptions<SimpleOption, any> = {}
	): SimpleOptions<SimpleOption, any> => {
		filteredOptionsBasedOnSelection = Object.keys(refinerOptions)
			.filter(optionidx => {
				if (refinerOptions[optionidx]) {
					//for fitlering selected block
					if (isSelectedRefinersRequired) {
						return refinerOptions[optionidx]['isSelected'] ? true : false;
					}
					//unselected block
					else {
						return refinerOptions[optionidx]['isSelected'] ? false : true;
					}
				}
				return false;
			})
			.reduce((valueidx, indexkey) => {
				valueidx[indexkey] = refinerOptions[indexkey];
				return valueidx;
			}, {});

		return filteredOptionsBasedOnSelection;
	};
	/***
	 * Set object list and object keys updates the state of boths SelectedRefinerItems & filteredUnSelectedRefinerItems
	 * For UI purposes the selectedOptionKeys And filteredUnselectedOptionKeys are also updated
	 * */
	updateSelectedAndUnselectedList = (): void => {
		//set unselected items
		let { options: Refineroptions } = this.refiner;
		this.filteredUnSelectedRefinerItems.options = this.filterOptionsBasedOnSelection(
			Refineroptions,
			false
		);
		this.filteredUnselectedOptionKeys = Object.keys(this.filteredUnSelectedRefinerItems.options);
		//set selected items
		this.SelectedRefinerItems.options = this.filterOptionsBasedOnSelection(Refineroptions, true);
		this.selectedOptionKeys = Object.keys(this.SelectedRefinerItems.options);
	};
	/**
	 *Updates indivigual selected options for
	 * @param refiner
	 * */
	UpdateRefinerIsSelectedSate = (key: string, refinerValue: boolean): void => {
		if (this.refiner.options[key] && this.refiner.options[key].hasOwnProperty('isSelected')) {
			this.refiner.options[key].isSelected = refinerValue;
		}
	};

	/***
	 *Updates all Selected options select/unselect for @param refiner
	 *
	 * */
	UpdateAllRefinerIsSelectedState = (SelectAllValue: boolean): void => {
		let { options: Alloptions } = this.refiner;
		Object.keys(Alloptions).map(key => {
			if (this.refiner.options[key] && this.refiner.options[key].hasOwnProperty('isSelected')) {
				this.refiner.options[key].isSelected = SelectAllValue;
			}
		});
	};

	ngOnInit() {
		//set intiial state for refiners and filtered items
		this.filteredUnSelectedRefinerItems = this.SelectedRefinerItems = Object.assign(
			{},
			this.refiner
		);
		this.updateSelectedAndUnselectedList();
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
			}
		});

		// Enables the callback API <porcelain-simple-refiner (onRefinerChange)="..."></porcelain-simple-refiner>
		this.refiner.valueSubject.subscribe(newValue => {
			this.onRefinerChange.emit([this.refiner.slug, newValue]);
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
			return option.hasOwnProperty('label') && option.label ? option.label : '';
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
		//updates states
		this.UpdateAllRefinerIsSelectedState(newValue);
		//update selected and unselectedlist state
		this.updateSelectedAndUnselectedList();
		this.isFilterListPossible = newValue;
	}

	/**
	 * Called in Angular template to initiate the propagation of the new values.
	 */
	onSelectionChange(optionKey: string, value: boolean) {
		this.ignoreNext = true;
		this.refiner.valueSubject.next(this.getValue());
		//update main refiner list sate
		this.UpdateRefinerIsSelectedSate(optionKey, value);
		//update selected and unselectedlist state
		this.updateSelectedAndUnselectedList();
	}

	/*
	 * onkey press filter options*
	 */

	keyUp(event: KeyboardEvent) {
		this.applyFilter();
	}
	applyFilter(): this {
		/**
		 * Logic :
		 *
		 *We destrucutre options object from refiners
		 *
		 * inside options object
		 *
		 * 1.) Object.keys gives list object keys => creates an array of string of object keys
		 * 2.) Inside that array user filter
		 *		a) use that key and access that options object and label feild. treat it as string. conevert all to lowercase . use indexof query to check the occurence
		 * 3.) Then use reduce to build new object but with only allowed properties
		 *
		 *
		 *
		 * **/
		let isAllOptionsSelected: boolean = this.canSelectNone();

		let { options } = this.refiner;
		if (options) {
			this.filteredUnSelectedRefinerItems.options = Object.keys(options)
				.filter(optionObjectKey => {
					if ('string' == typeof options[optionObjectKey]) {
						return (
							(options[optionObjectKey] as string)
								.toLowerCase()
								.indexOf(this.query.trim().toLowerCase()) > -1
						);
					} else {
						//consider only unselected options
						if (!options[optionObjectKey].isSelected) {
							return (
								(options[optionObjectKey]['label'] as string)
									.toLowerCase()
									.indexOf(this.query.trim().toLowerCase()) > -1
							);
						} else {
							return false;
						}
					}
				})
				.reduce((obj, key) => {
					obj[key] = this.refiner.options[key];
					return obj;
				}, {});

			//update filteroptions to display in UI

			this.filteredUnselectedOptionKeys = Object.keys(this.filteredUnSelectedRefinerItems.options);
			/**
			 *IF filteredUnselectedoptionskeys are empty and all options are not selected then display no results found message
			 * **/
			this.showNoResults =
				this.filteredUnselectedOptionKeys.length > 0 ||
				this.refiner.options == this.SelectedRefinerItems.options
					? false
					: true;
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
