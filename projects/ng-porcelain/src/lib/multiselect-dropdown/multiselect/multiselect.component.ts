import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ToolbarSelectComponent } from '../../toolbar/toolbar-select/toolbar-select.component';

import { faAngleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'porcelain-multiselect',
	templateUrl: './multiselect.component.html',
	styleUrls: ['./multiselect.component.scss']
})
export class MultiSelectComponent implements OnInit {
	readonly faAngleDown: IconDefinition = faAngleDown;
	isOpen: boolean = false;

	/**
	 * sends the selected values in a single string separated by comma
	 * */
	@Output() public userEnteredInputBoxValue: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * sends only  selected Array to user
	 *
	 * */
	@Output() public SelectedArrayItems: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

	/**
	 * Default Label string displayed
	 * */
	@Input() public selectedLabel: string = '';

	/**
	 * Displays placeholder value by default
	 *
	 * */
	@Input() public selectedLabelPlaceholder: string = 'select';

	/*{ id: 1, name: 'apple', isSelected: false },
		{ id: 2, name: 'banana', isSelected: false }  Data format for multiselect
		*/

	/**
	 * The Input List item to be show. NOTE VERY IMPORTANT!!
	 * The input should Array of objects with A MANDATORY @field isSelected
	 * like [{name:something, isSelected:false}]
	 * */
	@Input() public listItems: any[] = [];

	/**
	 * The label Prop to be displayed. By default set to name
	 */
	@Input() public LabelProp: string = 'name';

	public focusToggle: boolean = false;
	constructor(public eRef: ElementRef) {}

	public toggleOpen() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	public open(): this {
		this.isOpen = true;
		return this;
	}

	/**
	 * Closes the dropdown
	 */
	public close(): this {
		this.isOpen = false;
		return this;
	}

	public ngOnInit(): void {}

	/**
	 *
	 * Display no list separation if all are selected or none are selected
	 * @param event
	 * @param index
	 */

	public allOrNoneSelected(): boolean {
		var selectedLength = this.listItems.filter(x => x.isSelected);
		var unselectedLength = this.listItems.filter(x => !x.isSelected);
		if (selectedLength.length != 0 && unselectedLength.length != 0) {
			return true;
		}
		return false;
	}

	/**
	 *
	 * On user selection emit array and form the string
	 * @param event
	 * @param index
	 */
	public onUserselection(event: any, index): void {
		var SelectedItemsArray = this.listItems.map(x => x).filter(x => x.isSelected);
		this.SelectedArrayItems.emit(SelectedItemsArray);
		//emit selected values
		var selectedValueprops = this.listItems.filter(x => x.isSelected).map(x => x[this.LabelProp]);

		let selectedValues =
			selectedValueprops.length > 1
				? selectedValueprops.join(', ')
				: selectedValueprops.toString();
		this.userEnteredInputBoxValue.emit(selectedValues);
		//display values
		this.selectedLabel = selectedValues == '' ? this.selectedLabelPlaceholder : selectedValues;
	}

	/**
	 * reset and uncheck boxes
	 * */
	public resetFunctionality(): void {
		this.listItems.forEach(x => {
			x.isSelected = false;
		});
		this.selectedLabel = this.selectedLabelPlaceholder;
	}
}
