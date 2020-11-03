import {
	Component,
	OnInit,
	HostBinding,
	Input,
	HostListener,
	ElementRef,
	Output,
	EventEmitter,
	ViewChild,
	ViewChildren,
	QueryList
} from '@angular/core';

//import clamp  function from ultilites
import { clamp } from '../../shared/utilities/arrays/clamp';

//fortawesome icons

import { faTimesCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'porcelain-select',
	templateUrl: './select-dropdown.component.html',
	styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent1 implements OnInit {
	searchtext: string = '';
	previousEmittedValue: any;

	/**
	 *  *Input array
	 *   @param items*
	 *
	 *
	 */
	@Input() items: Array<any> = ['Apple', 'Banana', 'Cherry', 'Durian'];

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
	 * For clear icon color
	 * @param clearIconColor
	 *
	 */
	@Input() public clearIconColor: any = '#9dacba';
	@Input() public clearIcon: any = faTimesCircle;
	@Input() public dropdownIcon: any = faChevronDown;

	/**
	 * SelectedValue EventEmitter
	 * @param element
	 */
	@Output()
	SelectedValue: EventEmitter<any> = new EventEmitter();

	constructor(private element: ElementRef) {}

	ngOnInit(): void {}
	// enables focus on our host element
	@HostBinding('tabindex')
	@Input('tabindex')
	tabindex: number = 0;

	//setting focus
	setFocus(focus: boolean) {
		this.hasFocus = focus;
	}
	//Host bindings for
	@HostListener('focus', ['$event']) onFocus(event) {
		this.setFocus(true);
	}

	@HostListener('blur', ['$event']) onBlur(event) {
		this.setFocus(false);
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
		return this;
	}

	//onSelections show update searchtext via keyboard
	onSelectionSearchText() {
		this.searchtext = this.items[this.selectedIndex];
	}

	//keyboard selection
	onSelectedList = (selectedlist: Array<ElementRef>) => {
		let selectedItem: ElementRef = selectedlist.find(x => {
			if (x.nativeElement) {
				let classNameSubstring: string = `${x.nativeElement['className']}`;
				if (classNameSubstring.indexOf('item--highlighted') !== -1) {
					return x;
				}
			}
		});
		let selectedValue =
			selectedItem && selectedItem.nativeElement ? selectedItem.nativeElement['innerText'] : '';

		if (selectedValue) {
			this.searchtext = selectedValue;
			this.isArrayobj
				? this.SetSearchTextEmitValue(selectedValue)
				: this.emitSelectedValue(selectedValue);
		}
	};

	//if isArrayObj and keyboard selected value then search and send the object
	SetSearchTextEmitValue(domSelectedValue: any) {
		if (this.isArrayobj) {
			let selectedArrayObj = this.items.find(x => x[this.fieldName] == domSelectedValue);
			this.emitSelectedValue(selectedArrayObj);
		}
	}
	//emit value
	emitSelectedValue(itemSelected: any) {
		if (this.previousEmittedValue != itemSelected) {
			//emit value
			this.SelectedValue.emit(itemSelected);
			//update previous value to avoid debounce
			this.previousEmittedValue = itemSelected;
		}
	}

	//onSelection show update searchtext when clicked
	onOptionClicked(itemIdx: any, Selecteditem: any) {
		this.setSelectedIndex(itemIdx).setOpen(false);
		this.searchtext = this.isArrayobj ? Selecteditem[this.fieldName] : Selecteditem;
		//send values
		this.emitSelectedValue(Selecteditem);
	}

	//dropdown closing functionality to detect click outside host
	@HostListener('document:click', ['$event'])
	onClick(event): void {
		if (!this.element.nativeElement.contains(event.target)) {
			this.setOpen(false);
		}
	}

	//adding view child to track the highlighted index and get value from DOM
	@ViewChildren('dropdownValues', { read: ElementRef }) domOptionList: QueryList<ElementRef>;

	//Handling keyboard events

	keyDown(event: KeyboardEvent) {
		//Check focus exists

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

				//send the wholelist
				this.onSelectedList(this.domOptionList.toArray());
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

		//stopping event propagation for tab
		//if ('Tab' !== key) {
		//	event.stopPropagation();
		//	return false;
		//}
	}
}
