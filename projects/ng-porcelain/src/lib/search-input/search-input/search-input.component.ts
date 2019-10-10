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
	@Input() submitIconColor: any = '#9dacba';
	@Input() clearIconColor: any = '#9dacba';
	@Input() userValue: string = '';

	// Outputs
	@Output() submitHandler: EventEmitter<string> = new EventEmitter();

	// Booleans
	isSearchFocused = false;
	emptyValueEmit = false; //to handle empty value
	emptyrefresh = true; //to prevent sending emtpy string as emit when previous emitted string was already ''

	// Strings
	value = '';

	constructor() {}

	ngOnInit(): void {
		/* assigning uservalues */
		this.value = this.userValue;
		/*to check if there is previous value*/
		this.emptyValueEmit = this.userValue == '' ? false : true;
		this.emptyrefresh = this.userValue == '' ? true : false;
	}

	/**
	 * Clears the value of the search field and resets focus.
	 */
	clear(): void {
		//alert(this.emptyrefresh+"  value");
		this.value = '';
		if (this.emptyrefresh == true) {
			//alert("only box has to be cleared")
		} else {
			this.emptyrefresh = true; //empty refresh check
		}

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
			this.emptyValueEmit = true; //to enable empty value sending for submit
			this.emptyrefresh = false; //to disable emptyrefresh
		} else {
			if (this.emptyValueEmit == true) {
				this.emptyValueEmit = false;
				this.submitHandler.emit(this.value); //empty value is emitted by submit
			}
			this.setFocus();
			this.emptyrefresh = true; //to enable empty refresh after emptyvalue is emitted by submit
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
