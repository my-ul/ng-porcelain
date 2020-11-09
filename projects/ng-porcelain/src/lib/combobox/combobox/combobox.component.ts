import {
	Component,
	OnInit,
	HostBinding,
	Input,
	HostListener,
	ElementRef,
	Output,
	EventEmitter,
	ViewChildren,
	ViewChild
} from '@angular/core';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { clamp } from '../../shared/utilities/arrays/clamp';
import { Loggable } from '../../Loggable';
import { TranslationService } from '../../services/translation/translation.service';

type ItemType = string | object;

@Component({
	selector: 'porcelain-combobox',
	templateUrl: './combobox.component.html',
	styleUrls: ['./combobox.component.scss']
})
export class ComboboxComponent extends Loggable implements OnInit {
	/**
	 * Icon of chevron pointing down, used for the dropdown toggle.
	 */
	readonly faChevronDown = faChevronDown;

	/**
	 * Name of the component, used when the Loggable behaviors are used.
	 */
	readonly name = 'ComboboxComponent';

	/**
	 * isObjectArray checks whether its plain value array or array of objects
	 * @param isObjectArray
	 */
	@Input() isObjectArray: boolean = false;

	/**
	 * Array of items to filter. Can be strings or objects.
	 */
	@Input() items: ItemType[] = [];

	/**
	 * Property used for comparison when isObjectArray is true. For example,
	 * if item['name'] contains the label, labelProp should be 'name'.
	 * @param labelProp
	 */
	@Input() labelProp: string = '';

	/**
	 * Placeholder value shown in the input when query
	 * is the empty string.
	 */
	@Input() placeholder: string = '';

	/**
	 * Event emitter that emits whenever the selected item changes.
	 */
	@Output()
	public valueChange: EventEmitter<ItemType> = new EventEmitter();

	/**
	 * The current filtered set of items.  Force repopulation with applyFilter().
	 */
	filteredItems: any[] = [];

	/**
	 * Controls the display of the border.  Set to false to eliminate borders.
	 */
	@HostBinding('class.combobox--has-border')
	@Input()
	border: boolean = true;

	/**
	 * Boolean that tracks if the query input has focus.
	 */
	hasFocus: boolean = false;

	/**
	 * The index of the currently highlighted item in filteredItems
	 */
	highlightedIndex: number = -1;

	/**
	 * When true, the dropdown will be displayed; if false, the dropdown will not be displayed.
	 */
	isOpen: boolean = false;

	/**
	 * Shown when the user has filtered too much, and no valid items remain in filteredItems.
	 */
	labelNoItemsFound: string = 'No items found.';

	/**
	 * Placeholder for text input when search field is empty
	 */
	labelPlaceholder: string = 'type to search...';

	/**
	 * Accessibility label for dropdown icon.
	 */
	labelSelect: string = 'Select';

	/**
	 * The current query.
	 */
	query: string = '';

	/**
	 * Index of the selected item with respect to the `items` array.
	 */
	selectedIndex: number = -1;

	constructor(
		private element: ElementRef<HTMLElement>,
		private translationService: TranslationService
	) {
		super();
		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this, {
				label_TypeToSearch: 'labelPlaceholder',
				label_Select: 'labelSelect',
				label_NoItemsFound: 'labelNoItemsFound'
			})
		);
	}

	/**
	 * Returns the currently selected item. Returns null when no item is selected.
	 */
	get value(): ItemType {
		return this.selectedIndex > -1 ? this.items[this.selectedIndex] : null;
	}

	/**
	 * Sets the selectedIndex by reference to selected item.
	 */
	@Input()
	set value(value: ItemType) {
		this.selectedIndex = this.items.indexOf(value);
		if (this.selectedIndex > -1) {
			this.query = this.isObjectArray ? this.value[this.labelProp] : this.value;
			this.valueChange.emit(this.value);
		}
	}

	/**
	 * Closes the dropdown when document receives a stray click.
	 * @param event Event emitted when the document is clicked.
	 */
	@HostListener('document:click', ['$event'])
	onClick(event): void {
		if (!this.element.nativeElement.contains(event.target)) {
			this.setOpen(false);
		}
	}

	/**
	 * Searches the `items` array for items that match the query.
	 * Result is placed at this.filteredItems
	 */
	applyFilter(): this {
		this.filteredItems = this.items.filter(item => {
			if (this.isObjectArray) {
				return (
					(item[this.labelProp] as string)
						.toLowerCase()
						.indexOf(this.query.trim().toLowerCase()) > -1
				);
			} else {
				return (item as string).toLowerCase().indexOf(this.query.trim().toLowerCase()) > -1;
			}
		});

		return this;
	}

	/**
	 * Handles keyup events when the user types in the field. Binds special keys
	 * to create and maintain traditional key behaviors expected of a select control.
	 * @param event Event object emitted by the keyup
	 */
	keyUp(event: KeyboardEvent) {
		//Check focus exists
		if (this.hasFocus) {
			this.applyFilter();

			let key = event.key,
				lastIndex = this.filteredItems.length - 1;

			// If there's only one item in the filteredItems,
			// highlight it so the user can select it with Enter
			if (this.filteredItems.length === 1) {
				this.highlightedIndex = 0;
			}

			//check if open
			if (this.isOpen) {
				if ('ArrowUp' == key) {
					this.setHighlightedIndex(
						Math.max(0, this.highlightedIndex - 1)
					).scrollToHighlighted();
				} else if ('ArrowDown' == key) {
					this.setHighlightedIndex(
						Math.min(lastIndex, this.highlightedIndex + 1)
					).scrollToHighlighted();
				} else if (~['Enter', 'Space', ' '].indexOf(key)) {
					this.setSelectedIndex(this.highlightedIndex).setOpen(false);
				} else if ('Home' == key) {
					this.setHighlightedIndex(0).scrollToHighlighted();
				} else if ('End' == key) {
					this.setHighlightedIndex(lastIndex).scrollToHighlighted();
				} else if ('Escape' == key) {
					if (this.query === '') {
						this.setOpen(false);
					} else {
						this.query = '';
						this.applyFilter();
					}
				}
			}

			//if closed
			else {
				//opens only if enter is clicked
				if (~['Enter', 'Space', ' '].indexOf(key)) {
					this.setHighlightedIndex(clamp(0, this.selectedIndex, lastIndex))
						.setOpen(true)
						.scrollToHighlighted();
				} else if ('ArrowUp' == key) {
					this.setSelectedIndex(Math.max(0, this.selectedIndex - 1));
				} else if ('ArrowDown' == key) {
					this.setSelectedIndex(Math.min(lastIndex, this.selectedIndex + 1));
				} else if ('Home' == key) {
					this.setSelectedIndex(0);
				} else if ('End' == key) {
					this.setSelectedIndex(lastIndex);
				} else if ('Escape' == key) {
					if (this.query !== '') {
						this.query = '';
						this.applyFilter();
					}
				}
			}

			// These keys should have their default actions stopped.
			// Calling stopPropagation() and returning false will ensure a stopped event.
			const swallowKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Space', 'Home', 'End', 'Escape', ' '];
			if (~swallowKeys.indexOf(key)) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			}
		}
	}

	/**
	 * Set up the component after the Inputs are mounted.
	 */
	ngOnInit(): void {
		this.filteredItems = this.items.slice();
	}

	/**
	 * Calculates and scrolls the item dropdown to the current highlightedIndex.
	 */
	scrollToHighlighted(): this {
		let itemElements = this.element.nativeElement.querySelectorAll('.select__item');
		if (itemElements && itemElements[this.highlightedIndex] /** && elementNotInView */) {
			let childElement = itemElements[this.highlightedIndex] as HTMLElement;
			let parentElement = childElement.parentElement;

			const bounds = {
				// distance from top of parent to top of option element
				elementTop: childElement.offsetTop,

				// distance from top of parent to bottom of option element
				elementBottom: childElement.offsetTop + childElement.offsetHeight,

				// top of parent current scroll
				scrollTop: parentElement.scrollTop,

				// bottom of parent current scroll
				scrollBottom: parentElement.scrollTop + parentElement.offsetHeight
			};

			// Because of animations, and other UI painting, set this to execute at the end of the
			// current call stack.  Attempting to change scroll position too soon will result
			// in errors.
			setTimeout(() => {
				// If the parent is taller than the child,
				// it is safe to attempt scroll-into-view behaviors.
				if (parentElement.offsetHeight > childElement.offsetHeight) {
					// if any part of the element is below the scroll window
					if (bounds.elementBottom > bounds.scrollBottom) {
						parentElement.scrollTop += bounds.elementBottom - bounds.scrollBottom;
						// if any part of the element is above the scroll window
					} else if (bounds.elementTop < bounds.scrollTop) {
						parentElement.scrollTop -= bounds.scrollTop - bounds.elementTop;
					}
				}
			}, 0);
		}
		return this;
	}

	/**
	 * Sets the status of focus.
	 * @param focus Boolean. Set to true when the component gains focus.
	 */
	setFocus(focus: boolean) {
		this.hasFocus = focus;
	}

	/**
	 * Sets the highlighted item within the filteredItems array.
	 * @param idx Index of the highlighted item (within filteredItems array).
	 */
	setHighlightedIndex(idx: number) {
		this.highlightedIndex = idx;
		return this;
	}

	/**
	 * Opens or closes the suggestion dropdown.
	 * @param isOpen Boolean value for the desired state of the control.
	 */
	setOpen(isOpen: boolean): this {
		this.isOpen = isOpen;
		if (this.isOpen) {
			this.applyFilter();
		}
		return this;
	}

	/**
	 * Tracks the index of the selected item. Sets the value,
	 * which locates the filtered item in the items array.
	 * @param selectedIndex The index of the selected item in the filteredItems array
	 */
	setSelectedIndex(selectedIndex: number) {
		// the this.value setter will find the item in the items array
		this.value = this.filteredItems[selectedIndex];
		return this;
	}

	/**
	 * Toggles the isOpen property by negation.
	 */
	toggleOpen() {
		this.setOpen(!this.isOpen);
	}
}
