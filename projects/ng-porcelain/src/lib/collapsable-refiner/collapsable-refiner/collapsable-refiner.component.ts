import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
	faCaretDown,
	faChevronDown,
	faChevronUp,
	IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import { TranslationService } from '../../services/translation/translation.service';
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { defaultShowLessLabel } from '../../shared/defaults/labels/defaultShowLessLabel';
import { defaultShowMoreLabel } from '../../shared/defaults/labels/defaultShowMoreLabel';
import { defaultSelectAllLabel } from '../../shared/defaults/labels/defaultSelectAllLabel';
import { defaultSelectNoneLabel } from '../../shared/defaults/labels/defaultSelectNoneLabel';
import { defaultOptionShowCount } from '../../shared/defaults/properties/defaultOptionShowCount';
import { SimpleOption } from '../../shared/types/Options/SimpleOption';

@Component({
	selector: 'porcelain-collapsable-refiner',
	templateUrl: './collapsable-refiner.component.html',
	styleUrls: ['./collapsable-refiner.component.scss']
})
export class CollapsableRefinerComponent implements OnInit {
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
	@Input() disable: boolean = true; /*Sets the disable flag to disable refiners in required apps*/

	//#endregion
	isCollapse: string = 'true';
	parentKeys: string[];

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
	collapseValues: { [optionSlug: string]: boolean } = {};
	private ignoreNext: boolean = false;
	checked: any;
	collapsechecked: string[] = [];
	collapseParentchecked: any = [];

	constructor(private translationService: TranslationService) {
		this.translationService.getTranslations().subscribe(
			TranslationService.translate<CollapsableRefinerComponent>(this, {
				label_ShowMore: 'showMoreLabel',
				label_ShowLess: 'showLessLabel',
				label_SelectAll: 'selectAllLabel',
				label_SelectNone: 'selectNoneLabel'
			})
		);
	}

	ngOnInit() {
		console.log(
			'Options count:+++++++++',
			Object.keys(this.refiner.options.collapse.options).length
		);
		console.log(this.refiner);
		// Pick the `isOpen` value;
		let isOpen = true;

		if (this.refiner && typeof this.refiner.isOpen === 'boolean') {
			isOpen = this.refiner.isOpen;
		}

		if (typeof this._isOpen === 'boolean') {
			isOpen = this._isOpen;
		}

		this.isOpen = !!isOpen;
		const keys = this.getExpandedOptionKeysCollapseParent();
		for (let i = 0; i < keys.length; i++) {
			console.log(this.refiner.options.collapse.options[keys[i]].isOpen);
		}

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

		this.parentKeys = this.getExpandedOptionKeysCollapseParent();
		// Selected options can be modified with the refiner.valueSubject Observable
		// newValue is an array of option slugs to set as true
		this.refiner.valueSubject.subscribe(selectedOptionSlugs => {
			if (this.ignoreNext) {
				this.ignoreNext = false;
			} else {
				// blank the values first
				this.values = Object.keys(this.refiner.options.refiner.options).reduce(
					(result, optionSlug) => {
						result[optionSlug] = false;
						return result;
					},
					{}
				);
				for (let i = 0; i < this.parentKeys.length; i++) {
					// blank the values first
					const childValues = Object.keys(
						this.refiner.options.collapse.options[this.parentKeys[i]].options
					).reduce((result, optionSlug) => {
						result[optionSlug] = false;
						return result;
					}, {});
					this.collapseValues = Object.assign(this.collapseValues, childValues);
				}
				const parentValues = Object.keys(this.refiner.options.collapse.options).reduce(
					(result, optionSlug) => {
						result[optionSlug] = false;
						return result;
					},
					{}
				);
				this.values = Object.assign(this.values, this.collapseValues);
				this.values = Object.assign(this.values, parentValues);
				// then, set any true values
				selectedOptionSlugs.forEach(optionSlug => {
					this.values[optionSlug] = true;
				});
			}
		});

		// Enables the callback API <porcelain-simple-refiner (onRefinerChange)="..."></porcelain-simple-refiner>
		this.refiner.valueSubject.subscribe(newValue =>
			this.onRefinerChange.emit([this.refiner.slug, newValue])
		);
	}

	getCollapseStatus() {
		console.log(Object.keys(this.refiner.options.collapse.options));
		console.log(Object.keys(this.refiner.options.collapse.options).length ? true : false);
		return Object.keys(this.refiner.options.collapse.options).length ? true : false;
	}

	getOthersStatus() {
		return Object.keys(this.refiner.options.refiner.options).length ? true : false;
	}

	getKeysLength(keys) {
		console.log(Object.keys(keys).length);
		return Object.keys(keys).length;
	}

	toggleExpanded(): void {
		this._isExpanded = !this._isExpanded;
	}

	toggleOpen(): void {
		this._isOpen = !this._isOpen;
	}

	countTail(): number {
		return Object.keys(this.refiner.options.refiner.options).length - this._showCount;
	}

	canExpand(): boolean {
		return this.refiner.type === 'collapse'
			? Object.keys(this.refiner.options.refiner.options).length > this._showCount
			: false;
	}

	getExpandedOptionKeys(): string[] {
		return this._isExpanded
			? Object.keys(this.refiner.options.refiner.options)
			: Object.keys(this.refiner.options.refiner.options).slice(0, this._showCount);
	}

	getExpandedOptionKeysCollapse(ref): string[] {
		return Object.keys(this.refiner.options.collapse.options[ref].options);
	}

	getExpandedOptionKeysCollapseParent(): string[] {
		return Object.keys(this.refiner.options.collapse.options);
	}

	getDisabled(): boolean {
		return Object.keys(this.refiner.options).length == 0 ? true : false;
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

	getOptionLabelCollapse(option: string | SimpleOption): string {
		console.log(option);
		if (typeof option === 'string') {
			return option;
		} else {
			return option.label;
		}
	}

	getOptionLabelCollapseNew(option: string) {
		console.log(Object.values(option)[0]);
		console.log(this.getOptionLabelCollapse(Object.values(option)[0]));
		return this.getOptionLabelCollapse(Object.values(option)[0]);
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
		if (this.refiner.options.refiner instanceof SimpleRefinerDefinition) {
			this.checked = newValue
				? Object.keys(this.refiner.options.refiner.options) // all selected
				: []; // none selected

			this.ignoreNext = false;
		}
		if (this.refiner.options.collapse instanceof SimpleRefinerDefinition) {
			if (newValue) {
				for (let i = 0; i < this.parentKeys.length; i++) {
					const childChecked = Object.keys(
						this.refiner.options.collapse.options[this.parentKeys[i]].options
					); // all selected
					this.collapsechecked.push(...childChecked);
				}
				const parentChecked = Object.keys(this.refiner.options.collapse.options); // all selected
				this.collapsechecked.push(...parentChecked);
			} else {
				this.collapsechecked = [];
			}
		}
		this.checked.push(...this.collapsechecked);
		this.refiner.valueSubject.next(this.checked);
	}

	/**
	 * Called in Angular template to initiate the propagation of the new values.
	 */
	onSelectionChange() {
		this.ignoreNext = true;
		this.refiner.valueSubject.next(this.getValue());
	}

	onSelectionChangeCollapse(refiner, ref, index) {
		const childKeys = Object.keys(refiner.options);
		let checked = Object.keys(this.values).filter(key => this.values[key]);
		console.log(this.values);
		var result = checked.filter(e => childKeys.indexOf(e) !== -1).length === childKeys.length;
		if (result) {
			checked.push(this.parentKeys[index]);
		} else {
			checked = checked.filter(item => item !== this.parentKeys[index]);
		}
		this.refiner.valueSubject.next(checked);
		console.log(this.values);
	}

	onParentSelectionChange(value, index) {
		this.collapseParentchecked = [];
		const selectedValues = Object.keys(this.values).filter(key => this.values[key]);
		this.collapseParentchecked.push(...selectedValues);
		const ele = document.getElementById(value) as HTMLInputElement;
		let colchecked = Object.keys(
			this.refiner.options.collapse.options[this.parentKeys[index]].options
		);
		colchecked.push(this.parentKeys[index]);
		if (ele.checked) {
			this.collapseParentchecked.push(...colchecked); // all selected
			console.log(this.values);
		} else {
			this.collapseParentchecked = this.collapseParentchecked.filter(x => !colchecked.includes(x));
		}
		this.collapseParentchecked = [...new Set(this.collapseParentchecked)];
		this.refiner.valueSubject.next(this.collapseParentchecked);
	}

	getChildCount(ref) {
		return Object.keys(ref).length;
	}

	getTooltipText(option: string | SimpleRefinerDefinition): string {
		if (typeof option === 'string') {
			return option;
		} else {
			return option && option.tooltipText ? option.tooltipText : '';
		}
	}

	addItem($event, value) {
		this.refiner.options.collapse.options[value].isOpen = $event;
	}
}
