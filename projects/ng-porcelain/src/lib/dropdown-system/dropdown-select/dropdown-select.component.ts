import {
	Component,
	OnInit,
	HostBinding,
	Input,
	ContentChildren,
	QueryList,
	EventEmitter,
	Output,
	ElementRef,
	AfterContentInit,
	OnDestroy,
	HostListener,
	SimpleChanges,
	OnChanges,
	AfterContentChecked
} from '@angular/core';
import { DropdownSelectOptionComponent } from '../dropdown-select-option/dropdown-select-option.component';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
	selector: 'porcelain-dropdown-select',
	templateUrl: './dropdown-select.component.html',
	styleUrls: ['./dropdown-select.component.scss']
})
export class DropdownSelectComponent
	implements OnInit, OnDestroy, AfterContentInit, OnChanges, AfterContentChecked {
	/**
	 * Controls the display of the border.  Set to false to eliminate borders.
	 */
	@HostBinding('class.combobox--has-border')
	@Input()
	public border: boolean = true;

	/**
	 * A QueryList of the DropdownSelectOptionComponent that populate the options.
	 */
	@ContentChildren(DropdownSelectOptionComponent)
	public readonly options: QueryList<DropdownSelectOptionComponent>;

	/**
	 * Tab Index to enable keyboard navigation
	 */
	@HostBinding('tabindex')
	readonly tabIndex = 0;

	/**
	 * Boolean state of the dropdown menu. open = true; closed = false
	 */
	@HostBinding('class.porcelain-dropdown-select--is-open')
	isOpen: boolean = false;

	/**
	 * Boolean. True when the component has focus, otherwise false.
	 */
	public hasFocus = false;

	/**
	 * The index of the currently-highlighted option
	 */
	public highlightedIndex: number = -1;

	/**
	 * The index of the currently-selected option.
	 */
	public selectedIndex: number = -1;

	/**
	 * Array of subscriptions created during the life of the component.
	 */
	public _subscriptions: Subscription[] = [];

	/**
	 * Detect focus and blur events from projected components
	 * */
	@Input() contentFocusState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

	/**
	 * Input options state, this is any as we need to now only if option state has changed or not
	 * */

	@Input() public optionsListstate: any;

	/**
	 * display or hide options
	 * */
	@Input() public showOptions: boolean = true;

	/**
	 * The current value of the component.
	 */
	public _value: any;

	@Input()
	get value() {
		return this._value;
	}

	set value(value) {
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
	constructor(private elementRef: ElementRef) {}

	/**
	 * Manages rxjs subscriptions so that the component doesn't leak memory.
	 * @param subscription Subscription to add to tracking array.
	 */
	addSubscription(subscription: Subscription): this {
		this._subscriptions.push(subscription);
		return this;
	}

	/**
	 * Initializes the subscriptions for hover and clicks from ToolbarOptionComponent children.
	 */
	ngAfterContentInit(): void {
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

		this.contentFocusState.subscribe(focus => {
			this.hasFocus = focus;
		});
	}

	/**
	 *Responds everytime new content is rendered
	 * */
	ngAfterContentChecked(): void {
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

		this.contentFocusState.subscribe(focus => {
			this.hasFocus = focus;
		});
	}

	ngOnChanges(changes: SimpleChanges): void {}

	/**
	 * Safely closes subscriptions when the component is destroyed.
	 */
	ngOnDestroy(): void {
		this._subscriptions.forEach(sub => {
			if (!sub.closed) {
				sub.unsubscribe();
			}
		});

		this.contentFocusState.unsubscribe();
	}

	/**
	 * destroys all exising subscriptions
	 * */
	public destoryExistingSubscriptionsListOptions() {
		this._subscriptions.forEach(sub => {
			if (!sub.closed) {
				sub.unsubscribe();
			}
		});

		this._subscriptions = [];
	}

	/**
	 * creates new subscriptions
	 * */

	public createNewSubscriptionsListOptions() {
		setTimeout(() => {
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
		});
	}

	/**
	 * Highlights an option by its position in the `option` array.
	 * @param highlightIndex The index of the option to highlight on screen.
	 * @param scrollToHighlightedOption Boolean, if the option should be scrolled to on highlight.
	 */
	public highlightOptionByIndex(highlightIndex: number, scrollToHighlightedOption: boolean = true) {
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
	public toggleOpen() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
			setTimeout(
				() => this.highlightOptionByIndex(this.selectedIndex > -1 ? this.selectedIndex : 0),
				0
			);
		}
	}

	/**
	 * Opens the dropdown.
	 */
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
	@HostListener('keydown', ['$event'])
	onDocumentKeyDown(event: KeyboardEvent): void {
		if (this.hasFocus) {
			// The tab key should always allow navigation
			if (event.key !== 'Tab') {
				event.preventDefault();
			}
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

	public ngOnInit(): void {}

	/**
	 * Finds the index of a value within the options ToolbarOptionComponent array.
	 * @param value Value to find in the options.
	 */
	public getIndexByValue(value: any) {
		return this.options ? this.options.map(option => option.value).indexOf(value) : -1;
	}
}
