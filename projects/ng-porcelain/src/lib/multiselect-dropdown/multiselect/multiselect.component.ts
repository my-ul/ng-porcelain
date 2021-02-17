import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolbarSelectComponent } from '../../toolbar/toolbar-select/toolbar-select.component';

import { faAngleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'porcelain-multiselect',
	templateUrl: './multiselect.component.html',
	styleUrls: ['./multiselect.component.scss']
})
export class MultiSelectComponent implements OnInit {
	readonly faAngleDown: IconDefinition = faAngleDown;
	isOpen: boolean = false;

	listItems: any[] = [
		{ id: 1, name: 'apple', isSelected: false },
		{ id: 2, name: 'banana', isSelected: false },
		{ id: 3, name: 'pineapple', isSelected: false },
		{ id: 4, name: 'orange', isSelected: false },
		{ id: 5, name: 'mango', isSelected: false },
		{ id: 6, name: 'melon', isSelected: false }
	];

	activeItems: any[] = [];
	inActiveItems: any[] = [];
	selectedLabel: string = 'Select';
	constructor() {}

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
	}

	getSelectedItems(): string {
		return this.activeItems.map(item => item.name).toString();
	}

	toggleOpen() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Opens the dropdown.
	 */
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
