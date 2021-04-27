import {
	Component,
	OnInit,
	HostBinding,
	Input,
	HostListener,
	ElementRef,
	Output,
	EventEmitter,
	SimpleChanges,
	ViewChildren,
	ViewChild,
	OnChanges,
	OnDestroy
} from '@angular/core';
import { faChevronDown, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { clamp } from '../../shared/utilities/arrays/clamp';
import { Loggable } from '../../Loggable';
import { TranslationService } from '../../services/translation/translation.service';
import { BehaviorSubject } from 'rxjs';
import { throttleTime, debounceTime } from 'rxjs/operators';

@Component({
	selector: 'porcelain-auto-complete',
	templateUrl: './auto-complete.component.html',
	styleUrls: ['./auto-complete.component.scss'],
	host: {
		'[class.autocomplete--has-focus]': 'hasFocus'
	}
})
export class AutoCompleteComponent extends Loggable implements OnInit, OnChanges, OnDestroy {
	/**
	 * Icon for the clear button
	 */
	@Input() public clearIcon = faTimesCircle;

	/**
	 * Color for the clear icon.  By default, #9dacba
	 */
	@Input() public clearIconColor: string = '#9dacba';

	/**
	 * Name of the component, used when the Loggable behaviors are used.
	 */
	readonly name = 'AutoCompleteComponent';

	/**
	 * The current user input box value
	 */
	@Input() public inputBoxValue: string = '';

	/**
	 * debounce Time controls time Eventmitter fire
	 * @param debounceTime
	 */
	@Input() public debounceTime: number = 1000;

	/**
	 * Input Box Value Change behaviour subject will emit user value change based on ngmodelchange
	 */
	public inputBoxBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

	/**
	 * Array of items that hold AutoComplete Items. Strictly uses strings only
	 */
	@Input() public AutoCompleteitems: Array<string> = new Array<string>();

	/**
	 * If autocomplete items are fetched, then spinner is shown
	 * @param:AutoCompleteLoadingSpinner
	 */
	@Input() public AutoCompleteLoadingSpinner: boolean = false;

	/**
	 * Property is used to enable internal filter. To disable set to false. For example,
	 * if Filter is disabled
	 * @param isFilterEnabled
	 */
	@Input() public isFilterEnabled: boolean = true;

	/**
	 * Placeholder value shown in the input when query
	 * is the empty string.
	 */
	@Input() public placeholder: string = '';

	/**
	 * The throttled or debounced user selected value emit
	 */
	@Output() public userEnteredInputBoxValue: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Event emitter that emits whenever a item in the autocomplete List is selected. OPTIONAL
	 */
	@Output()
	public autoCompleteSelectedItem: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * The current filtered set of items.  Force repopulation with applyFilter().
	 */
	filteredItems: any[] = [];

	/**
	 * Controls the display of the border.  Set to false to eliminate borders.
	 */
	@HostBinding('class.autocomplete--has-border')
	@Input()
	border: boolean = true;

	/**
	 * Boolean that tracks if the query input has focus.
	 */
	public hasFocus: boolean = false;

	/**
	 * The index of the currently highlighted item in filteredItems
	 */
	highlightedIndex: number = -1;

	/**
	 * When true, the dropdown will be displayed; if false, the dropdown will not be displayed.
	 */
	public isOpen: boolean = false;

	/**
	 * Accessibility label for the clear button.
	 */
	@Input() public labelClear: string = 'Clear';

	/**
	 * Shown when the user has filtered too much, and no valid items remain in filteredItems.
	 */
	@Input() public labelNoItemsFound: string = 'No items found.';

	/**
	 * Placeholder for text input when search field is empty
	 */
	@Input() public labelPlaceholder: string = 'type to search...';

	/**
	 * Accessibility label for dropdown icon.
	 */
	@Input() public labelSelect: string = 'Select';

	/**
	 * Index of the selected item with respect to the `items` array.
	 */
	public selectedIndex: number = -1;

	constructor(
		private element: ElementRef<HTMLElement>,
		private translationService: TranslationService
	) {
		super();
		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this, {
				label_TypeToSearch: 'labelPlaceholder',
				label_Select: 'labelSelect',
				label_NoItemsFound: 'labelNoItemsFound',
				label_Clear: 'labelClear'
			})
		);
	}

	/**
	 * Resets the component state to blank query and resets the filteredItems array.
	 */
	public clear() {
		this.inputBoxValue = '';
		this.debounceEmit('');
		this.applyFilter();
	}

	/**
	 * Returns the currently selected item. Returns null when no item is selected.
	 */
	get value(): string {
		return this.selectedIndex > -1 ? this.AutoCompleteitems[this.selectedIndex] : null;
	}

	/**
	 * Sets the selectedIndex by reference to selected item.
	 */
	@Input()
	set value(value: string) {
		this.selectedIndex = this.AutoCompleteitems.indexOf(value);
		if (this.selectedIndex > -1) {
			this.inputBoxValue = this.value;
			this.autoCompleteSelectedItem.emit(this.value);
			this.debounceEmit(this.value);
		}
	}

	/**
	 * Closes the dropdown when document receives a stray click.
	 * @param event Event emitted when the document is clicked.
	 */
	@HostListener('document:click', ['$event'])
	onStrayClick(event): void {
		if (!this.element.nativeElement.contains(event.target)) {
			this.setOpen(false);
		}
	}

	/**
	 * Searches the `items` array for items that match the query.
	 * Result is placed at this.filteredItems
	 */
	applyFilter(): this {
		this.filteredItems = this.AutoCompleteitems.filter(item => {
			return (item as string).toLowerCase().indexOf(this.inputBoxValue.trim().toLowerCase()) > -1;
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
					if (this.inputBoxValue === '') {
						this.setOpen(false);
					} else {
						this.inputBoxValue = '';
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
					if (this.inputBoxValue !== '') {
						this.inputBoxValue = '';
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
		this.filteredItems = this.AutoCompleteitems.slice();

		//initialize and listen for input box value changes
		this.inputBoxBehaviorSubject.pipe(debounceTime(this.debounceTime)).subscribe(uservalue => {
			this.userEnteredInputBoxValue.emit(uservalue);
		});
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['AutoCompleteitems']) {
			this.filteredItems = this.AutoCompleteitems.slice();
			this.applyFilter();
		}
	}

	public debounceEmit = (selectevalue: string): void => {
		this.inputBoxBehaviorSubject.next(selectevalue);
	};

	/**
	 * Calculates and scrolls the item dropdown to the current highlightedIndex.
	 */
	public scrollToHighlighted(): this {
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
	public setFocus(focus: boolean): this {
		this.hasFocus = focus;
		return this;
	}

	/**
	 * Sets the highlighted item within the filteredItems array.
	 * @param idx Index of the highlighted item (within filteredItems array).
	 */
	public setHighlightedIndex(idx: number) {
		this.highlightedIndex = idx;
		return this;
	}

	/**
	 * Opens or closes the suggestion dropdown.
	 * @param isOpen Boolean value for the desired state of the control.
	 */
	public setOpen(isOpen: boolean): this {
		this.isOpen = isOpen;
		if (this.isOpen) {
			this.applyFilter();
		}
		return this;
	}

	/**
	 * Tracks the index of the selected item. Sets the value,
	 * which locates the filtered item in the items array.
	 * @param selectedFilteredIndex The index of the selected item in the filteredItems array
	 */
	public setSelectedIndex(selectedFilteredIndex: number) {
		this.info('setSelectedIndex(selectedFilteredIndex)', { selectedFilteredIndex });
		// the this.value setter will find the item in the items array
		this.value = this.filteredItems[selectedFilteredIndex];
		return this;
	}

	/**
	 * Toggles the isOpen property by negation.
	 */
	public toggleOpen() {
		this.setOpen(!this.isOpen);
	}
	ngOnDestroy(): void {
		//unsubscribe Rxjs behaviour subject to prevent memory leaks
		this.inputBoxBehaviorSubject.unsubscribe();
	}
}
