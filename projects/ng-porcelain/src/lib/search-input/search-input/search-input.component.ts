import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';

// Font Awesome 5
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'porcelain-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
	@Input() public borders: boolean = true;
	@Input() public clearIcon: any = faTimesCircle;
	@Input() public clearIconColor: any = '#9dacba';
	@Input() public placeholderLabel: string = 'Type to search...';
	@Input() public submitIcon: any = faSearch;
	@Input() public submitIconColor: any = '#9dacba';
	@Input() public userValue: string = '';
	@Output() public emptyHandler: EventEmitter<string> = new EventEmitter();
	@Output() public submitHandler: EventEmitter<string> = new EventEmitter();
	@ViewChild('searchInput') public searchInput: ElementRef<HTMLInputElement>;

	public emptyrefresh = false;
	public isSearchFocused = false;
	private lastValue = null;
	public currentValue = '';

	constructor() {}

	/**
	 * Tests if the control is in a condition that allows a submit.
	 */
	public canSubmit(): boolean {
		return (this.isEmpty() && this.emptyrefresh) || !this.isEmpty();
	}

	/**
	 * Clears the value of the search field and resets focus.
	 */
	public clear(): void {
		this.currentValue = '';

		if (this.emptyrefresh == true) {
		} else {
			this.emptyrefresh = true;
		}

		//empty value to be emitted to emptyHandler
		this.empty();

		this.setFocus();
	}

	/**
	 * Empty value emit once search cancel button is clicked
	 */
	public empty(): void {
		this.emptyHandler.emit('');
	}

	/**
	 * Sets the isSearchFocused value to false.
	 */
	public handleBlur(): void {
		this.isSearchFocused = false;
	}

	/**
	 * Sets the isSearchFocused value to true.
	 */
	public handleFocusIn(): void {
		this.isSearchFocused = true;
	}

	/**
	 * Tests the search box for a value.
	 */
	public isEmpty(): boolean {
		return this.currentValue === '';
	}

	/**
	 *
	 */
	public ngOnInit(): void {
		/* assigning uservalues */
		this.currentValue = this.userValue;
		/*to check if there is previous value*/
		this.emptyrefresh = this.userValue == '' ? false : true;
		this.emptyValueEmit = !this.emptyrefresh;
	}

	/**
	 * Returns the value of isSearchFocused.
	 */
	public searchHasFocus(): boolean {
		return this.isSearchFocused;
	}

	/**
	 * Sets focus on the search input.
	 */
	public setFocus(): void {
		this.searchInput.nativeElement.focus();
	}

	emptyValueEmit: boolean = false;

	/**
	 * Submits the current value of the search input to outside listener.
	 */
	public submit(): void {
		if (!this.isEmpty()) {
			this.submitHandler.emit(this.currentValue);
			this.emptyValueEmit = true; //to enable empty value sending for submit
			this.emptyrefresh = false; //to disable emptyrefresh
		} else {
			if (this.emptyValueEmit == true) {
				this.emptyValueEmit = false;
				this.submitHandler.emit(this.currentValue); //empty value is emitted by submit
			}
			this.setFocus();
			this.emptyrefresh = true; //to enable empty refresh after emptyvalue is emitted by submit
		}
	}
}
