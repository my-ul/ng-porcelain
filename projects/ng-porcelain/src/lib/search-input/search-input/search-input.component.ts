import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

// Font Awesome 5
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'porcelain-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
	// Elements
	@ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

	// Inputs
	@Input() placeholderLabel: string = 'Type to search...';
	@Input() submitIcon: any = faSearch;
	@Input() clearIcon: any = faTimesCircle;
	@Input() borders: boolean = true;

	// Outputs
	@Output() submitHandler: EventEmitter<string> = new EventEmitter();

	// Booleans
	isSearchFocused = false;

	// Strings
	value = '';

	constructor() {}

	ngOnInit(): void {}

	/**
	 * Clears the value of the search field and resets focus.
	 */
	clear(): void {
		this.value = '';
		this.submitHandler.emit(this.value);
		this.setFocus();
	}

	/**
	 * Sets focus on the search input.
	 */
	setFocus(): void {
		this.searchInput.nativeElement.focus();
	}

	/**
	 * Submits the current value of the search input to outside listener.
	 */
	submit(): void {
		if (!this.isEmpty()) {
			this.submitHandler.emit(this.value);
		} else {
			this.setFocus();
		}
	}

	/**
	 * Tests the search box for a value.
	 */
	isEmpty(): boolean {
		return this.value === '';
	}

	/**
	 * Returns the value of isSearchFocused.
	 */
	searchHasFocus(): boolean {
		return this.isSearchFocused;
	}

	/**
	 * Sets the isSearchFocused value to false.
	 */
	handleBlur(): void {
		this.isSearchFocused = false;
	}

	/**
	 * Sets the isSearchFocused value to true.
	 */
	handleFocusIn(): void {
		this.isSearchFocused = true;
	}
}
