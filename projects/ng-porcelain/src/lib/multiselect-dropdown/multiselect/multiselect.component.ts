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
	text: string =
		'yyfdffffffffffgdfcvgfvcgsdvcgscdvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvcbdcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

	items: any[] = [
		{ id: 1, name: 'apple', isSelected: false },
		{ id: 2, name: 'banana', isSelected: false },
		{ id: 3, name: 'pineapple', isSelected: false },
		{ id: 4, name: 'orange', isSelected: false },
		{ id: 5, name: 'mango', isSelected: false },
		{ id: 6, name: 'melon', isSelected: false }
	];

	@Input() keyProp: string = 'id';

	@Input() labelProp: string = 'label';

	@Input() multiple: boolean = false;

	activeKeys: any[] = [];
	inactiveKeys: any[] = [];
	selectedLabel: string = 'Select';

	constructor() {}

	getValues(obj) {
		return Object.values(obj);
	}

	selectItem(item: any) {}

	deselectItem(item: any) {}

	onItemsSelection(inputItem: any) {
		let idx = inputItem.isSelected
			? this.activeKeys.findIndex(obj => obj.id == inputItem.id)
			: this.items.findIndex(obj => obj.id == inputItem.id);
		if (inputItem.isSelected) {
			this.activeKeys[idx].isSelected = !this.activeKeys[idx].isSelected;
		} else {
			this.items[idx].isSelected = !this.items[idx].isSelected;
		}
		if (inputItem.isSelected) {
			this.activeKeys.push(this.items[idx]);
			this.items.splice(idx, 1);
		} else {
			this.items.push(inputItem);
			this.activeKeys.splice(idx, 1);
		}
		this.selectedLabel = this.getSelectedItems();
	}

	getSelectedItems(): string {
		var items = this.activeKeys.map(item => item.name);
		return items.length > 1 ? items.join(', ') : items.toString();
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
