import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import {
	AfterContentInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Loggable } from '../../Loggable';
import { TranslationService } from '../../services/translation/translation.service';
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { clamp } from '../../shared/utilities/arrays/clamp';
import { subtract as arraySubtract } from '../../shared/utilities/arrays/subtract';

@Component({
	selector: 'porcelain-search-refiner, p-search-refiner',
	templateUrl: './search-refiner.component.html',
	styleUrls: ['./search-refiner.component.scss'],
	host: {
		'[class.porcelain__search-refiner]': 'true'
	},
	animations: [
		trigger('highlight', [
			transition(':enter', [
				animate(
					300,
					keyframes([
						style({ backgroundColor: 'transparent' }),
						style({ backgroundColor: '#fff883' }),
						style({ backgroundColor: 'transparent' })
					])
				)
			])
		]),
		trigger('blockEnterAnimations', [transition(':enter', [])])
	]
})
export class SearchRefinerComponent extends Loggable implements OnInit, AfterContentInit {
	/**
	 * Name of the component, required by Loggable.
	 */
	readonly name = 'SearchRefinerComponent';

	//#region Key Arrays

	/**
	 * List of all keys available to be refined by this refiner.  This is generated automatically from
	 * the keys in `this.refiner.options`.
	 */
	allKeys: string[];

	private _activeKeys: string[];

	get activeKeys(): string[] {
		return this._activeKeys;
	}

	/**
	 * Sets the activeKeys value. Triggers activeKeysChange emit.
	 */
	@Input()
	set activeKeys(activeKeys: string[]) {
		this.setActiveKeys(activeKeys, true);
	}

	setActiveKeys(activeKeys: string[], updateValueSubject: boolean = true) {
		this._activeKeys = activeKeys;

		if (updateValueSubject) {
			if (this.refiner && this.refiner.valueSubject)
				this.refiner.valueSubject.next(this._activeKeys);
		}
	}

	@Output() activeKeysChange: EventEmitter<string[]> = new EventEmitter();

	/**
	 * Array of currently inactive keys/slugs, to be shown below the
	 */
	inactiveKeys: string[];

	/**
	 * List of keys where the option.label matches this.query
	 */
	filteredInactiveKeys: string[] = [];

	//#endregion

	//#region Inputs

	/**
	 * A Font Awesome icon to use for the clear button.
	 */
	@Input() clearIcon: any = faTimesCircle;

	/**
	 *
	 * Message to show No value incase no search values are shown
	 * */
	@Input() public SearchInputPlaceHolderValue: string = 'Search';

	/**
	 * Search string used to filter the inactiveItems into filteredInactiveItems
	 */
	@Input() query: string = '';

	/**
	 * SimpleRefiner definition, including options, used to define the whole thing.
	 */
	@Input() refiner: SimpleRefinerDefinition;

	/**
	 * [showLines] input to control how many lines are shown prior to initiating scroll behavior
	 */
	@Input() showLines: number = 6;

	//#endregion

	//#region Outputs

	/**
	 * Legacy implementation, allows for same-API binding as SimpleRefiner
	 * @deprecated Use (activeKeysChange) or [(activeKeys)]
	 */
	@Output() onRefinerChange: EventEmitter<[string, string[]]> = new EventEmitter();

	//#endregion

	//#region ViewChild/ViewChildren

	/**
	 * Selects the #searchInput element, which can be used to set focus in the text input.
	 */
	@ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

	//#endregion

	//#region Component State

	/**
	 * Tracks whether or not there is focus inside the #searchInput element.
	 * Used for a11y outlines to make it obvious which control is active.
	 */
	searchHasFocus: boolean = false;

	/**
	 * Translateable labels.  Provide labels to the TranslationService to update these strings.
	 * @see README.md
	 * @example
	 * 	class MyComponent {
	 * 		constructor(
	 *			private translationService: TranslationService
	 * 		) {
	 * 			this.translationService.setTranslations({
	 * 				'label_SelectAll': "Select All",
	 * 				// ... etc ...//
	 * 			})
	 * 		}
	 * }
	 */
	labels = {
		selectAll: 'Select All',
		selectFiltered: 'Select Filtered',
		selectNone: 'Select None',
		clear: 'Clear',
		nHiddenByFilter: '%s hidden by filter',
		placeholder: 'Search'
	};

	/**
	 * Input labels
	 * */
	@Input() public selectAllFilterLabel: string = 'Select All';
	@Input() public selectFilteredLabel: string = 'Select Filtered';
	@Input() public selectNoneFilterLabel: string = 'Select None';
	@Input() public clearLabel: string = 'Clear';

	//#endregion

	/**
	 * Sets up basic functionalities.
	 * @see ngOnInit
	 * @param translationService Porcelain TranslationService instance, from dependency injection.
	 */
	constructor(public translationService: TranslationService) {
		super();

		/**
		 * Hook the translation service to set the labels
		 */
		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this.labels, {
				label_SelectAll: 'selectAll',
				label_SelectNone: 'selectNone',
				label_Clear: 'clear',
				label_nHiddenByFilter: 'nHiddenByFilter',
				label_Search: 'placeholder'
			})
		);
	}

	/**
	 * Removes a key from the inactive array, and appends (pseudo-push) to the active array.
	 * @param key Key to activate
	 */
	activateKey(key: string) {
		// find the index of the key to activate
		const keyIdx = this.inactiveKeys.indexOf(key);

		if (keyIdx > -1) {
			// remove the key from inactiveItems
			this.inactiveKeys.splice(keyIdx, 1);

			/*
				add the key to activeItems
				uses array destructuring to trigger an update to activeKeysChange
				DO NOT change this to use this.activeKeys.push(key)
				as this would cause the EventEmitter to stop working
				when activeKeys is changed.
			*/
			this.setActiveKeys([...this.activeKeys, key]);

			this.updateFilteredInactiveItems().scrollActiveToBottom();
		}
	}

	scrollActiveToBottom(): this {
		setTimeout(() => {
			this.activeList.nativeElement.scrollTop = this.activeList.nativeElement.scrollHeight;
		});
		return this;
	}

	/**
	 * Clears the current search query, and triggers a refresh of the filteredInactiveItems array.
	 */
	clear(): this {
		this.query = '';
		return this.updateFilteredInactiveItems();
	}

	/**
	 * Deactivates a key/slug
	 * @param key Option key/slug to deactivate
	 * @param event? MouseEvent/KeyboardEvent used to call the method.
	 */
	deactivateKey(key: string) {
		// find the index of the key to deactivate
		const keyIdx = this.activeKeys.indexOf(key);

		if (keyIdx > -1) {
			// remove the key from active items
			this.activeKeys.splice(keyIdx, 1);

			// slice to trigger event emitters
			// setActiveKeys will trigger valueSubject, which handles
			// updates to the inactiveKeys array.
			this.setActiveKeys([...this.activeKeys.slice()]);

			this
				// make sure the inactive list is in the same order as allKeys
				.sortInactive()
				// sort the inactiveItems
				.updateFilteredInactiveItems();
		}
	}

	/**
	 * Sets the typing cursor in #searchInput
	 */
	ensureInputFocus(): this {
		this.searchInput.nativeElement.focus();
		return this;
	}

	/**
	 * Performs initialization tasks that require Angular Input/Output binding
	 */
	ngOnInit(): void {
		this.debug({ refiner: this.refiner });

		// DX: if developers use refiner.isOpen, offer a warning
		// Does not warn if isDevMode() is false.
		if (this.refiner.isOpen === true || this.refiner.isOpen === false) {
			this.warn('DEPRECATED: Search Refiner does not support the refiner.isOpen property.');
		}

		this.allKeys = Object.keys(this.refiner.options);

		this.debug('[ngOnInit]', { allKeys: this.allKeys });

		// support the use of refiner.selected
		if (this.refiner.selected && this.refiner.selected.length > 0) {
			this.setActiveKeys(this.refiner.selected.slice());
			// DX: if developers use the refiner.selected binding, warn that activeKeys should be used
			// Does not warn if isDevMode() is false;
			this.warn(
				'Selected options are bound using [selected] and should be updated to use [activeKeys].'
			);
		}

		// if inactiveKeys is not set, set it;
		if (this.activeKeys === null || this.activeKeys === undefined) {
			this.debug('[ngOnInit]', 'No keys are selected.');
			this.setActiveKeys([]);
		}

		// this.inactiveKeys = this.allKeys - this.activeKeys
		this.inactiveKeys = arraySubtract(this.allKeys, this.activeKeys);

		// apply filter if necessary.
		this.updateFilteredInactiveItems();

		this.refiner.valueSubject.subscribe(activeKeys => {
			this.debug('valueSubject.subscribe(activeKeys)', {
				activeKeys,
				allKeys: this.allKeys,
				inactiveKeys: this.inactiveKeys
			});
			this.onRefinerChange.emit([this.refiner.slug, activeKeys]);
			this.activeKeysChange.emit(activeKeys);

			this.setActiveKeys([...activeKeys], false);
			// Providing a shortcut reduces the expensive array.filter action
			// prettier-ignore
			this.inactiveKeys =
				// if nothing is active, everything is inactive
				activeKeys.length === 0 ? this.allKeys.slice()
				// if everything is active, nothing is inactive
				: activeKeys.length === this.allKeys.length ? []
				// or we're somewhere in between.
				: arraySubtract(this.allKeys.slice(), this.activeKeys);

			this.sortInactive().updateFilteredInactiveItems();
		});
	}

	@ViewChild('inactiveList') inactiveList!: ElementRef<HTMLUListElement>;
	@ViewChild('activeList') activeList!: ElementRef<HTMLUListElement>;

	itemHeight: number = 25;

	ngAfterContentInit(): void {
		setTimeout(() => {
			let useList: HTMLUListElement;
			if (this.inactiveList) {
				useList = this.inactiveList.nativeElement;
			} else if (this.activeList) {
				useList = this.activeList.nativeElement;
			}
			if (useList) {
				const el = useList.querySelector('li');
				this.itemHeight = el.scrollHeight;
				this.debug('itemHeight updated', { itemHeight: this.itemHeight });
			}
		});
	}

	getListHeight(list: any[]): number {
		let useLines = clamp(0, list.length, this.showLines);
		return this.itemHeight * useLines;
	}

	/**
	 * Selects all elements in the refiner by copying this.allKeys to activeKeys and clearing inactiveKeys
	 * Since this.activeKeys is defined with a setter, this will trigger the activeKeysChange EventEmitter.
	 */
	selectAll(): this {
		this.setActiveKeys(this.allKeys.slice());
		return this.clear().scrollActiveToBottom();
	}

	/**
	 * Gathers current filtered items and moves them to the activeKeys array. This will update the
	 * inactiveKeys array to be the difference of this.allKeys and this.activeKeys (inactiveKeys=allKeys-activeKeys)
	 * Since this.activeKeys is defined with a setter, this will trigger the activeKeysChange EventEmitter.
	 */
	selectFiltered(): this {
		// Set addition: this.activeKeys = this.activeKeys + this.filteredInactiveKeys
		this.setActiveKeys([...this.activeKeys.slice(), ...this.filteredInactiveKeys.slice()]);

		// Set subtraction: this.inactiveKeys = this.allKeys - this.activeKeys
		//this.inactiveKeys = arraySubtract(this.allKeys.slice(), this.activeKeys);

		return (
			this
				// set the query to empty string
				.clear()
				// Recalculate the filteredInactiveItems()
				.updateFilteredInactiveItems()
				// set the cursor focus to #searchInput element
				.ensureInputFocus()
		);
	}

	/**
	 * Sets the current activeKeys to an empty array, and resets the inactiveKeys to [].
	 * Since this.activeKeys is defined with a setter, this will trigger the activeKeysChange EventEmitter.
	 */
	selectNone(): this {
		this.setActiveKeys([]);
		//this.inactiveKeys = this.allKeys.slice();
		return this.updateFilteredInactiveItems();
	}

	/**
	 * Updates internal state, used to style the component's outline.
	 * @param searchHasFocus Boolean, true if the #searchInput currently has focus, otherwise false.
	 */
	trackSearchFocus(searchHasFocus: boolean): this {
		this.searchHasFocus = searchHasFocus;
		return this;
	}

	/**
	 * Sorts the inactive array to each key's position in the this.allKeys array
	 */
	sortInactive(): this {
		this.inactiveKeys = this.inactiveKeys
			.slice()
			.sort((aKey, bKey) => this.allKeys.indexOf(aKey) - this.allKeys.indexOf(bKey));
		return this;
	}

	/**
	 * Updates the filteredInactiveItems array by string matching on option.label
	 * @param event A keyboard event, if the method is called by a keyup event.
	 */
	updateFilteredInactiveItems(event?: KeyboardEvent): this {
		if (this.query == '') {
			this.filteredInactiveKeys = this.inactiveKeys.slice();
		} else if (this.query.length > 0) {
			this.filteredInactiveKeys = this.inactiveKeys.slice().filter((key, idx) => {
				return (
					(this.refiner.options[key].label as string)
						.toLowerCase()
						.indexOf(this.query.trim().toLowerCase()) > -1
				);
			});
		}
		return this;
	}
}
