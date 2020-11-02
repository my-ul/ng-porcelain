import {
	Component,
	OnInit,
	HostBinding,
	Input,
	HostListener,
	ElementRef,
	Output,
	EventEmitter
} from '@angular/core';

import { clamp } from '../../shared/utilities/arrays/clamp';

@Component({
	selector: 'porcelain-combobox',
	templateUrl: './combobox.component.html',
	styleUrls: ['./combobox.component.scss']
})
export class ComboboxComponent implements OnInit {
	searchtext: string = '';

	/**
	 *  *Input array
	 *   @param items*
	 *
	 *
	 */
	@Input() items: Array<any> = [];

	/**
	 * *PlaceHolder Value
	 * @param Placeholder
	 */

	@Input() Placeholder: string = 'searchText';

	/**
	 * isArrayobj checks whether its plain value array or array of objects
	 * @param isArrayobj
	 */
	@Input() isArrayobj: boolean = false;

	/**
	 * fieldName for displaying and incase isArrayobj
	 * @param fieldName
	 */
	@Input() fieldName: string = '';

	/**
	 * SelectedValue EventEmitter
	 * @param element
	 */
	@Output()
	SelectedValue: EventEmitter<any> = new EventEmitter();

	constructor(private element: ElementRef) {}

	ngOnInit(): void {}

	//setting focus
	setFocus(focus: boolean) {
		this.hasFocus = focus;
	}

	//status flag
	hasFocus: boolean = false;

	// dropdown control
	isOpen: boolean = false;

	setOpen(isOpen: boolean) {
		this.isOpen = isOpen;
	}

	//toggler
	toggleOpen() {
		this.setOpen(!this.isOpen);
	}

	//track array index items
	highlightedIndex: number = -1;

	setHighlightedIndex(idx: number) {
		this.highlightedIndex = idx;
		return this;
	}

	selectedIndex: number = -1;

	setSelectedIndex(idx) {
		this.selectedIndex = idx;
		this.onSelectionSearchText();
		return this;
	}

	//onSelections show update searchtext via keyboard
	onSelectionSearchText() {
		this.searchtext = this.isArrayobj
			? this.items[this.selectedIndex][this.fieldName]
			: this.items[this.selectedIndex];
	}

	//onSelection show update searchtext when clicked
	onOptionClicked(itemIdx: any, Selecteditem: any) {
		this.setSelectedIndex(itemIdx).setOpen(false);
		//this.searchtext = this.isArrayobj ? Selecteditem[this.fieldName] : Selecteditem;
		this.SelectedValue.emit(Selecteditem);
	}

	//dropdown closing functionality to detect click outside host
	@HostListener('document:click', ['$event'])
	onClick(event): void {
		if (!this.element.nativeElement.contains(event.target)) {
			this.setOpen(false);
		}
	}

	//Handling keyboard events
	keyDown(event: KeyboardEvent) {
		//Check focus exists
		if (this.hasFocus) {
			let key = event.key,
				lastIndex = this.items.length - 1;

			//check if open
			if (this.isOpen) {
				if ('ArrowUp' == key) {
					this.setHighlightedIndex(Math.max(0, this.highlightedIndex - 1));
				} else if ('ArrowDown' == key) {
					this.setHighlightedIndex(Math.min(lastIndex, this.highlightedIndex + 1));
				} else if (~['Enter', 'Space', ' '].indexOf(key)) {
					//item selected handling
					this.setSelectedIndex(this.highlightedIndex).setOpen(false);
					this.onSelectionSearchText();
				} else if ('Home' == key) {
					this.setHighlightedIndex(0);
				} else if ('End' == key) {
					this.setHighlightedIndex(lastIndex);
				} else if ('Escape' == key) {
					this.setOpen(false);
				}
			}

			//if closed
			else {
				//opens only if enter is clicked
				if (~['Enter', 'Space', ' '].indexOf(key)) {
					this.setHighlightedIndex(clamp(0, this.selectedIndex, lastIndex)).setOpen(true);
				} else if ('ArrowUp' == key) {
					this.setSelectedIndex(Math.max(0, this.selectedIndex - 1));
				} else if ('ArrowDown' == key) {
					this.setSelectedIndex(Math.min(lastIndex, this.selectedIndex + 1));
				} else if ('Home' == key) {
					this.setSelectedIndex(0);
				} else if ('End' == key) {
					this.setSelectedIndex(lastIndex);
				}
			}

			// These keys should have their default actions stopped.
			// Calling stopPropagation() and returning false will ensure a stopped event.
			const swallowKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Space', 'Home', 'End', 'Escape', ' '];
			if (~swallowKeys.indexOf(key)) {
				event.stopPropagation();
				return false;
			}
		}
	}
}
