import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostListener,
	ViewChild,
	ElementRef,
	OnInit
} from '@angular/core';
import {
	faChevronLeft,
	faChevronRight,
	faChevronUp,
	faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { sprintf } from 'sprintf-js';

import { clamp } from '../../shared/utilities/arrays/clamp';
import { moveItem } from '../../shared/utilities/arrays/moveItem';
import { Loggable } from '../../Loggable';

interface CSSStyleDeclarationWithGrid extends CSSStyleDeclaration {
	grid: string;
}

@Component({
	selector: 'porcelain-rack, p-rack',
	templateUrl: './rack.component.html',
	styleUrls: ['./rack.component.scss']
})
export class RackComponent<TItemType extends any = any> extends Loggable implements OnInit {
	/**
	 * Component name; used for logging.
	 */
	name: string = 'RackComponent';

	/**
	 * activeItems backing field
	 */
	private _activeItems: TItemType[] = [];
	/**
	 * inactiveItems backing field
	 */
	private _inactiveItems: TItemType[] = [];

	readonly activateIcon: any = faChevronRight;
	readonly deactivateIcon: any = faChevronLeft;
	readonly moveDownIcon: any = faChevronDown;
	readonly moveUpIcon: any = faChevronUp;

	/**
	 * The property on your inactiveItems/activeItems array items that should be shown as label.
	 * For example, if you use item.name for the display, set this to 'name'
	 */
	@Input() labelProp: string = 'label';
	/**
	 * The property on the inactiveItems/activeItems array items that should be used to determine
	 * locked item state.  For example if you use item.locked, this value should be 'locked'
	 */
	@Input() lockedProp: string = 'locked';

	/**
	 * The number of rows to show in the column <select> elements.
	 */
	@Input() size: number = 6;

	/**
	 * The property on your inactiveItems/activeItems array items that should be used as the value.
	 * For example, if you use item.id as the value, set this value to 'id'
	 */
	@Input() valueProp: string = 'value';

	/**
	 * activeItems change emitter; emits changes to the activeItems property to parent scopes
	 */
	@Output() activeItemsChange = new EventEmitter<TItemType[]>();

	/**
	 * inactiveItems EventEmitter; emits changes to the inactiveItems property to parent scopes
	 */
	@Output() inactiveItemsChange = new EventEmitter<TItemType[]>();

	@ViewChild('activePicker')
	activeSelectElement: ElementRef;

	@ViewChild('inactivePicker')
	inactiveSelectElement: ElementRef;

	/**
	 * Label for the list header of the "active" items.
	 */
	@Input() labelActiveList: string = 'Active';

	/**
	 * Label for the button that moves an item from "inactive" to "active"
	 */
	@Input() labelActivate: string = 'Add';

	/**
	 * Label for the button that moves selected item from "active" to "inactive"
	 */
	@Input() labelDeactivate: string = 'Remove';

	/**
	 * Label for the list header of the "inactive" items.
	 */
	@Input() labelInactiveList: string = 'Inactive';

	/**
	 * Label for the notice shown when hovering over a locked "active" item.
	 */
	@Input() labelLocked: string = 'This item cannot be removed from the active items';

	/**
	 * Label for the button used to move selected item down the "active" list.
	 */
	@Input() labelMoveDown: string = 'Move Down';

	/**
	 * Label for the button used to move the selected item up the "active" list.
	 */
	@Input() labelMoveUp: string = 'Move Up';

	/**
	 * Label for the button where a shift+click/shift+alt+up moves the selected item to the top of the "active" list.
	 */
	@Input() labelMoveToTop: string = 'Move to Top';

	/**
	 * Label for the button where a shift+click/shift+alt+down moves the selected item to the bottom of the "active" list.
	 */
	@Input() labelMoveToBottom: string = 'Move to Bottom';

	/**
	 * Label/string for the inflected form for referring to more than one item.
	 * Used with i18n/inflection. Example: {{ '%u %s' | sprintf : count : labelPluralItems }}
	 * @example
	 * 	5 Columns
	 * 	5 Apples
	 * 	5 Deer
	 */
	@Input() labelPluralItems: string = 'Items';

	/**
	 * Label/string for the inflectef form for referring to exactly one item.
	 * Used with i18n/inflection. Example: {{ '%u %s' | sprintf : count : labelSingleItems }}
	 * @example
	 * 	1 Column
	 * 	1 Apple
	 * 	1 Deer
	 */
	@Input() labelSingleItem: string = 'Item';

	/**
	 * Label/string for the inflected form for referring to zero/no items.
	 * Used with i18n/inflection. Example: {{ '%u %s' | sprintf : count : labelZeroItems }}
	 * @example
	 *  0 Columns
	 *  0 Fruits
	 *  0 Deer
	 */
	@Input() labelZeroItems: string = 'Items';

	/**
	 * Renders an accessible string that is helpful for screen readers to report how many items are in each list.
	 * @param list A list of items to be counted
	 */
	i18nListCount(list: TItemType[]): string {
		const length = list.length;
		return sprintf(
			'%s %s',
			length.toLocaleString(),
			// prettier-ignore
			length === 0 ? this.labelZeroItems
			: length === 1 ? this.labelSingleItem
			: this.labelPluralItems
		);
	}

	supportsGrid(): boolean {
		return (
			typeof (document.createElement('div').style as CSSStyleDeclarationWithGrid).grid === 'string'
		);
	}

	/**
	 * Tracks whether or not the "activeItems" list currently has focus.
	 */
	isActiveFocused: boolean = true;

	/**
	 * Tracks whether or not the "inactiveItems" list currently has focus
	 */
	isInactiveFocused: boolean = false;

	/**
	 * The object defining the currently selected Active item.
	 */
	selectedActiveItem: TItemType = null;

	/**
	 * The object defining the currently selected Inactive item.
	 */
	selectedInactiveItem: TItemType = null;

	/**
	 * activeItems getter; returns the value of _activeItems
	 */
	@Input()
	get activeItems(): TItemType[] {
		return this._activeItems;
	}

	/**
	 * inactiveItems getter; returns value of _inactiveItems backing field
	 */
	@Input()
	get inactiveItems(): TItemType[] {
		return this._inactiveItems;
	}

	/**
	 * activeItems setter; sets the value of _activeItems and emits the changes
	 */
	set activeItems(activeItems: TItemType[]) {
		this._activeItems = activeItems;
		this.activeItemsChange.emit(this._activeItems);
	}

	/**
	 * Tests if the conditions are acceptable to activate the currently selected inactive item.
	 */
	get canActivateItem(): boolean {
		return (
			this.inactiveItems.length > 0 && // there are items in the inactive items
			this.selectedInactiveItem !== null && // something is highlighted in the inactive list
			true
		);
	}

	/**
	 * Tests if the conditions are acceptable to deactivate the currenty selected active item.
	 */
	get canDeactivateItem(): boolean {
		return (
			this.activeItems.length > 0 && // there are items to move
			this.selectedActiveItem !== null && // something is highlighted in the active list
			!this.isItemLocked(this.selectedActiveItem) && // it isn't required to be there
			true
		);
	}

	/**
	 * Tests if the selectedActiveItem is in a position where it can move down the activeItems array.
	 */
	get canMoveDown(): boolean {
		return (
			this.currentActiveIdx > -1 && // an item is selected
			this.activeItems.length > 1 && // there is more than one item to move
			this.currentActiveIdx < this.lastActiveIdx // the selected item is not at the bottom
		);
	}

	/**
	 * Tests if the selectedActiveItem is in a position where it can move UP the activeItems array.
	 */
	get canMoveUp(): boolean {
		return (
			this.currentActiveIdx > -1 && // an item is selected
			this.activeItems.length > 1 && // there is more than one item to move
			this.currentActiveIdx > 0 // the selected item is not at the top
		);
	}

	/**
	 * Calculates the index of the currently-selected active item.  Returns -1 when nothing is selected.
	 */
	get currentActiveIdx(): number {
		return this.activeItems.findIndex(item => this.selectedActiveItem === item);
	}

	/**
	 * Calculates the index of the currently-selected inactive item.  Returns -1 when nothing is selected.
	 */
	get currentInactiveIdx(): number {
		return this.inactiveItems.findIndex(item => this.selectedInactiveItem === item);
	}

	/**
	 * inactiveItems setter; sets value of _inactiveItems backing field and emits the new value.
	 */
	set inactiveItems(inactiveItems: TItemType[]) {
		this._inactiveItems = inactiveItems;
		this.inactiveItemsChange.emit(this._inactiveItems);
	}

	/**
	 * Tests whether the inactive or active list currently have focus.
	 */
	get isRackFocused(): boolean {
		return this.isInactiveFocused || this.isActiveFocused;
	}

	/**
	 * Calculates the index of the last item in the active items array.
	 */
	get lastActiveIdx(): number {
		return this.activeItems.length - 1;
	}

	/**
	 * Calculates the index of the last item in the indactive items array.
	 */
	get lastInactiveIdx(): number {
		return this.inactiveItems.length - 1;
	}

	/**
	 * Binds keyboard navigation to the document keydown event.
	 */
	@HostListener('document:keydown', ['$event'])
	onDocumentKeyDown(event: KeyboardEvent): void {
		if (this.isRackFocused) {
			if (event.altKey) {
				if (event.key === 'ArrowDown' && this.canMoveDown) {
					this.moveSelectedItemDown(event.shiftKey);
				} else if (event.key === 'ArrowUp' && this.canMoveUp) {
					this.moveSelectedItemUp(event.shiftKey);
				} else if (event.key === 'ArrowLeft' && this.canDeactivateItem) {
					this.deactivateItem();
				} else if (event.key === 'ArrowRight' && this.canActivateItem) {
					this.activateItem();
				}
				if (event.key.indexOf('Arrow') === 0) {
					event.preventDefault();
				}
			} else if (event.key == 'ArrowRight' && this.isInactiveFocused) {
				this.ensureActiveFocus(this.currentInactiveIdx);
				event.preventDefault();
			} else if (event.key == 'ArrowLeft' && this.isActiveFocused) {
				this.ensureInactiveFocus(this.currentActiveIdx);
				event.preventDefault();
			}
		}
	}

	/**
	 * Moves the currently-selected inactive item to the active items array.
	 */
	activateItem() {
		if (this.canActivateItem) {
			const inactiveItemIdx = this.currentInactiveIdx;
			const item = this.inactiveItems.splice(inactiveItemIdx, 1)[0];
			this.activeItems.push(item);
			this.setInactiveItem(inactiveItemIdx);
			if (this.inactiveItems.length === 0) {
				this.ensureActiveFocus(this.activeItems.length);
			}
		}
	}

	/**
	 * Moves the currently-selected active item to the inactive items array.
	 */
	deactivateItem() {
		if (this.canDeactivateItem) {
			const activeItemIdx = this.currentActiveIdx;
			const item = this.activeItems.splice(activeItemIdx, 1)[0];
			this.inactiveItems.push(item);
			this.setActiveItem(activeItemIdx);
			if (this.activeItems.length === 0) {
				this.ensureInactiveFocus(this.inactiveItems.length);
			}
		}
	}

	ensureActiveFocus(targetIdx: number = 0): this {
		this.activeSelectElement.nativeElement.focus();
		const newActiveIdx = clamp(0, targetIdx, this.lastActiveIdx);
		this.setActiveItem(newActiveIdx).setInactiveItem(-1);
		return this;
	}

	ensureInactiveFocus(targetIdx: number = 0): this {
		this.inactiveSelectElement.nativeElement.focus();
		const newInactiveIdx = clamp(0, targetIdx, this.lastInactiveIdx);
		this.setInactiveItem(newInactiveIdx).setActiveItem(-1);
		return this;
	}

	isItemLocked(item: TItemType): boolean {
		if (Object.hasOwnProperty.call(item, this.lockedProp)) {
			return !!item[this.lockedProp]; // uses double negate (!!) to ensure boolean;
		}
		return false;
	}

	moveActiveItem(destIdxFn: (number) => number) {
		if (this.selectedActiveItem !== null) {
			const srcIdx = this.currentActiveIdx;
			const destIdx = clamp(0, destIdxFn(srcIdx), this.lastActiveIdx);
			moveItem(this.activeItems, srcIdx, destIdx);
		}
	}

	moveSelectedItemDown(toBottom: boolean = false) {
		this.moveActiveItem(srcIdx => (toBottom ? this.lastActiveIdx : srcIdx + 1));
	}

	moveSelectedItemUp(toTop: boolean = false) {
		this.moveActiveItem(srcIdx => (toTop ? 0 : srcIdx - 1));
	}

	ngOnInit() {
		// ensure all locked items are in the active column
		for (let inactiveIdx in this.inactiveItems) {
			let inactiveItem = this.inactiveItems[inactiveIdx];
			if (
				Object.hasOwnProperty.call(inactiveItem, this.lockedProp) &&
				!!inactiveItem[this.lockedProp]
			) {
				this.warn(
					'Locked item found in inactive array.',
					`${inactiveItem[this.valueProp]} => ${inactiveItem[this.labelProp]}`
				);
				this.selectedInactiveItem = inactiveItem;
				this.activateItem();
			}
		}
	}

	/**
	 * Set the isActiveFocused state; If the activeItems array contains no items, focus will
	 * be given to the inactive list.
	 */
	setActiveFocus(isActiveFocused: boolean) {
		if (isActiveFocused) {
			this.selectedInactiveItem = null;
		}
		if (this.activeItems.length > 0) {
			this.isActiveFocused = isActiveFocused;
		} else {
			this.ensureInactiveFocus(this.inactiveItems.length);
		}
	}

	setActiveItem(targetIdx: number): this {
		if (targetIdx === -1) {
			this.selectedActiveItem = null;
		} else if (targetIdx > -1 && this.activeItems.length > 0) {
			const newActiveIdx = clamp(0, targetIdx, this.lastActiveIdx);
			this.selectedActiveItem = this.activeItems[newActiveIdx];
		}
		return this;
	}

	/**
	 * Sets the isInactiveFocused state; If the inactiveItems array contains no items, focus will
	 * be given to the active list.
	 */
	setInactiveFocus(isInactiveFocused: boolean) {
		if (isInactiveFocused) {
			this.selectedActiveItem = null;
		}
		if (this.inactiveItems.length > 0) {
			this.isInactiveFocused = isInactiveFocused;
		} else {
			this.ensureActiveFocus(this.activeItems.length);
		}
	}

	setInactiveItem(targetIdx): this {
		if (targetIdx === -1) {
			this.selectedInactiveItem = null;
		} else if (targetIdx > -1 && this.inactiveItems.length > 0) {
			// Clamp the selected item to the bounds of the array
			const newInactiveIdx = clamp(0, targetIdx, this.lastInactiveIdx);
			this.selectedInactiveItem = this.inactiveItems[newInactiveIdx];
		}
		return this;
	}
}
