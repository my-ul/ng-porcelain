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

	//send the user selected value

	@Output() public userEnteredInputBoxValue: EventEmitter<string> = new EventEmitter<string>();
	@Input() selectedLabel: string;
	@Input() multiselectItems: any[];

	/*{ id: 1, name: 'apple', isSelected: false },
		{ id: 2, name: 'banana', isSelected: false }  Data format for multiselect
		*/

	@Input() listItems: any[] = [];

	activeItems: any[] = [];
	inActiveItems: any[] = [];
	focusToggle: boolean = false;
	constructor(public eRef: ElementRef) {}

	getValues(obj) {
		return Object.values(obj);
	}

	onItemsSelection(inputItem: any) {
		let key = inputItem.isSelected
			? this.activeItems.findIndex(obj => obj.id == inputItem.id)
			: this.listItems.findIndex(obj => obj.id == inputItem.id);
		if (inputItem.isSelected) {
			this.activeItems[key].isSelected = !this.activeItems[key].isSelected;
		} else {
			this.listItems[key].isSelected = !this.listItems[key].isSelected;
		}
		if (inputItem.isSelected) {
			this.activeItems.push(this.listItems[key]);
			this.listItems.splice(key, 1);
		} else {
			this.listItems.push(inputItem);
			this.activeItems.splice(key, 1);
		}
		this.selectedLabel = this.getSelectedItems();
		this.selectedLabel == '' ? (this.selectedLabel = 'Select') : '';
	}

	getSelectedItems(): string {
		var items = this.activeItems.map(item => item.name);
		let selectedValues = items.length > 1 ? items.join(', ') : items.toString();
		this.userEnteredInputBoxValue.emit(selectedValues);
		return selectedValues;
	}

	toggleOpen() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	private open(): this {
		this.isOpen = true;
		return this;
	}

	/**
	 * Closes the dropdown
	 */
	private close(): this {
		this.isOpen = false;
		return this;
	}

	ngOnInit(): void {}
}
