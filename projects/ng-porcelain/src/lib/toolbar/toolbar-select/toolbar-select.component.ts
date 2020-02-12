// Angular
import {
	AfterContentInit,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnDestroy,
	Output,
	QueryList,
	isDevMode
} from '@angular/core';
import { Subscription } from 'rxjs';

// Third-Party
import { faAngleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Porcelain
import { ToolbarOptionComponent } from '../toolbar-option/toolbar-option.component';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
	selector: 'porcelain-toolbar-select',
	templateUrl: './toolbar-select.component.html',
	styleUrls: ['./toolbar-select.component.scss'],
	animations: [
		trigger('slideInOut', [
			state(
				'open',
				style({
					opacity: 1,
					transform: 'none',
					display: 'block'
				})
			),
			state(
				'closed',
				style({
					opacity: 0,
					transform: 'translateY(-10px)',
					display: 'none'
				})
			),
			transition('open=>closed', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
			transition('closed=>open', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
		])
	]
})
export class ToolbarSelectComponent implements OnDestroy, AfterContentInit {
	/**
	 * Font Awesome 5 icon to use for the dropdown arrow.
	 */
	readonly faAngleDown: IconDefinition = faAngleDown;

	/**
	 * A QueryList of the ToolbarOptionComponents that populate the options.
	 */
	@ContentChildren(ToolbarOptionComponent)
	readonly options: QueryList<ToolbarOptionComponent>;

	/**
	 * Used to apply classes to the host element
	 */
	@HostBinding('class.porcelain-toolbar-select')
	readonly isInitialized = true;

	/**
	 * Tab Index to enable keyboard navigation
	 */
	@HostBinding('tabindex')
	readonly tabIndex = 0;

	/**
	 * Boolean state of the dropdown menu. open = true; closed = false
	 */
	@HostBinding('class.porcelain-toolbar-select--is-open')
	isOpen: boolean = false;

	/**
	 * Controls the presentation of the dropdown. When fullWidth is true,
	 * the dropdown is left aligned and the width of the dropdown label.
	 */
	@Input()
	@HostBinding('class.porcelain-toolbar-select--full-width')
	fullWidth: boolean = false;

	/**
	 * Boolean. True when the component has focus, otherwise false.
	 */
	private _hasFocus = false;

	get hasFocus() {
		this.log('get hasFocus()');
		return this._hasFocus;
	}

	set hasFocus(hasFocus: boolean) {
		this.log('set hasFocus(hasFocus)', { hasFocus });
		this._hasFocus = hasFocus;
	}

	/**
	 * Allows the control to be disabled.
	 */
	@Input()
	@HostBinding('class.porcelain-toolbar-select--disabled')
	disabled: boolean = false;

	/**
	 * The index of the currently-highlighted option
	 */
	private _highlightedIndex: number = -1;

	get highlightedIndex() {
		this.log('get highlightedIndex()');
		return this._highlightedIndex;
	}

	set highlightedIndex(highlightedIndex: number) {
		this.log('set highlightedIndex(highlightedIndex)', { highlightedIndex });
		this._highlightedIndex = highlightedIndex;
	}

	/**
	 * Label for the input, shown to the left of the current value.
	 */
	private _label: string;

	@Input()
	get label() {
		this.log('get label()');
		return this._label;
	}

	set label(label: string) {
		this.log('set label(label)', { label });
		this._label = label;
	}

	/**
	 * The index of the currently-selected option.
	 */
	private _selectedIndex: number = -1;

	get selectedIndex() {
		this.log('get selectedIndex()');
		return this._selectedIndex;
	}

	set selectedIndex(selectedIndex: number) {
		this.log('set selectedIndex(selectedIndex)', { selectedIndex });
		this._selectedIndex = selectedIndex;
	}

	/**
	 * Array of subscriptions created during the life of the component.
	 */
	private _subscriptions: Subscription[] = [];

	/**
	 * The current value of the component.
	 */
	private _value: any;

	@Input()
	get value() {
		this.log('get value()');
		return this._value;
	}

	set value(value) {
		this.log('set value(value)', { value });
		this._value = value;
		this.selectedIndex = this.getIndexByValue(value);
		this.valueChange.emit(this._value);
	}

	@Output()
	valueChange = new EventEmitter<any>();

	/**
	 * Constructs a new ToolbarSelectComponent.
	 * @param elementRef Reference to the component's host element.
	 */
	constructor(private elementRef: ElementRef) {
		this.log('new ToolbarSelectComponent(elementRef)', { elementRef });
	}

	/**
	 * Manages rxjs subscriptions so that the component doesn't leak memory.
	 * @param subscription Subscription to add to tracking array.
	 */
	addSubscription(subscription: Subscription): this {
		this.log('addSubscription(subscription)', { subscription });
		this._subscriptions.push(subscription);
		return this;
	}

	/**
	 * Initializes the subscriptions for hover and clicks from ToolbarOptionComponent children.
	 */
	ngAfterContentInit(): void {
		this.log('ngAfterContentInit()');
		this.options.toArray().forEach((child, idx) => {
			this.addSubscription(
				child.onValue.subscribe(newValue => {
					this.value = newValue;
					this.close();
				})
			).addSubscription(
				child.onHover.subscribe(isHover => {
					if (isHover) {
						this.highlightOptionByIndex(idx, false);
					}
				})
			);
		});
	}

	/**
	 * Safely closes subscriptions when the component is destroyed.
	 */
	ngOnDestroy(): void {
		this.log('ngOnDestroy()');
		this._subscriptions.forEach(sub => {
			if (!sub.closed) {
				sub.unsubscribe();
			}
		});
	}

	/**
	 * Finds the index of a value within the options ToolbarOptionComponent array.
	 * @param value Value to find in the options.
	 */
	getIndexByValue(value: any) {
		this.log('getIndexByValue(value)', { value });
		return this.options ? this.options.map(option => option.value).indexOf(value) : -1;
	}

	/**
	 * Highlights an option by its position in the `option` array.
	 * @param highlightIndex The index of the option to highlight on screen.
	 * @param scrollToHighlightedOption Boolean, if the option should be scrolled to on highlight.
	 */
	highlightOptionByIndex(highlightIndex: number, scrollToHighlightedOption: boolean = true) {
		this.log('highlightOptionByIndex(highlightIndex, scrollToHighlightedOption)', {
			highlightIndex,
			scrollToOption: scrollToHighlightedOption
		});

		this.options.toArray().forEach((child, idx, all) => {
			child.isHighlighted = idx === highlightIndex;

			/*
				Mouseover highlighting should not initiate a scroll-to-option,
				as this seems glitchy and unfamiliar.
			*/
			if (child.isHighlighted && scrollToHighlightedOption) {
				const childElement = child.elementRef.nativeElement,
					parentElement = childElement.parentElement;

				/*
					Element dimensions and scroll offsets might not be available immediately,
					so this uses setTimeout to trigger the scroll-into-view behaviors
					when the element is painted and has dimensions and positions.
				*/
				setTimeout(() => {
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
				});
			}
		});

		this.highlightedIndex = highlightIndex;
	}

	/**
	 * Toggles the dropdown being open or closed.
	 */
	toggleOpen() {
		this.log('toggleOpen()');
		if (!this.disabled) {
			if (this.isOpen) {
				this.close();
			} else {
				this.open().highlightOptionByIndex(this.selectedIndex > -1 ? this.selectedIndex : 0);
			}
		}
	}

	/**
	 * Logs information to the console while in development mode.
	 */
	private log(...args) {
		if (isDevMode()) {
			console.log.apply(null, ['ToolbarSelectComponent', ...args]);
		}
	}

	/**
	 * Opens the dropdown.
	 */
	private open(): this {
		this.log('open()');
		this.isOpen = true;
		return this;
	}

	/**
	 * Closes the dropdown
	 */
	private close(): this {
		this.log('close()');
		this.isOpen = false;
		return this;
	}

	/**
	 * Called when the component gets focus.  Used to make keyboard navigation make sense.
	 */
	@HostListener('focus')
	onFocusIn(): void {
		this.hasFocus = true;
	}

	/**
	 * Called when the component loses focus.
	 */
	@HostListener('blur')
	onFocusOut(): void {
		this.hasFocus = false;
	}

	/**
	 * Closes dropdown on stray click
	 * @param event Click event containing the target.
	 */
	@HostListener('document:click', ['$event'])
	onClick(event): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.close();
		}
	}

	/**
	 * Processes keyboard presses to enable keyboard navigation.
	 * @param event An event containing details about the key press.
	 */
	@HostListener('document:keydown', ['$event'])
	onDocumentKeyDown(event: KeyboardEvent): void {
		if (this.hasFocus && !this.disabled) {
			if (this.isOpen) {
				if (event.key === 'ArrowDown') {
					this.highlightedIndex = Math.min(this.options.length - 1, this.highlightedIndex + 1);
				} else if (event.key === 'ArrowUp') {
					this.highlightedIndex = Math.max(0, this.highlightedIndex - 1);
				} else if (event.key === 'Home') {
					this.highlightedIndex = 0;
				} else if (event.key === 'End') {
					this.highlightedIndex = this.options.length - 1;
				} else if (event.key === 'Enter' || event.key === 'Tab') {
					this.options.toArray()[this.highlightedIndex].select();
					this.close();
				} else if (event.key === 'Escape') {
					this.close();
				}

				if (this.highlightedIndex > -1) {
					this.highlightOptionByIndex(this.highlightedIndex);
				}
			} else {
				// Not open, but it is focused
				const openKeys = ['Enter', ' ', 'Spacebar'];
				if (~openKeys.indexOf(event.key)) {
					this.toggleOpen();
				} else if (event.key === 'ArrowUp') {
					const previousIndex = Math.max(0, this.getIndexByValue(this.value) - 1);
					this.options.toArray()[previousIndex].select();
				} else if (event.key === 'ArrowDown') {
					const nextIndex = Math.min(
						this.options.length - 1,
						this.getIndexByValue(this.value) + 1
					);
					this.options.toArray()[nextIndex].select();
				}
			}
		}
	}
}
