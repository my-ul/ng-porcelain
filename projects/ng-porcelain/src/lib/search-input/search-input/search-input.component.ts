import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation,
	HostBinding
} from '@angular/core';

// Font Awesome 5
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'porcelain-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	// tslint:disable-next-line: use-host-property-decorator
	host: {
		'[class.search-input]': 'true',
		'[class.search-input--no-borders]': '!borders'
	}
})
export class SearchInputComponent implements OnInit {
	@Input()
	borders: boolean = true;

	@Input() public clearIcon: any = faTimesCircle;
	@Input() public clearIconColor: any = '#9dacba';

	@Input() public placeholderLabel: string = 'Search Within...';
	@Input() public clearLabel: string = 'Clear the search query.';
	@Input() public submitLabel: string = 'Submit the search query.';

	@Input() public submitIcon: any = faSearch;
	@Input() public submitIconColor: any = '#9dacba';
	@Input() public userValue: string = '';
	@Output() public emptyHandler: EventEmitter<string> = new EventEmitter();
	@Output() public submitHandler: EventEmitter<string> = new EventEmitter();
	@ViewChild('searchInput') public searchInput: ElementRef<HTMLInputElement>;

	public allowEmptySubmit = false;

	@HostBinding('class.search-input--has-focus')
	public isSearchFocused = false;

	public value = '';

	constructor() {}

	/**
	 * Tests if the control is in a condition that allows a submit.
	 */
	public canSubmit(): boolean {
		return (this.isEmpty() && this.allowEmptySubmit) || !this.isEmpty();
	}

	/**
	 * Clears the value of the search field and resets focus.
	 */
	public clear(): void {
		this.value = '';
		this.allowEmptySubmit = true;

		// empty value to be emitted to emptyHandler
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
		return this.value === '';
	}

	/**
	 *
	 */
	public ngOnInit(): void {
		/* assigning uservalues */
		this.value = this.userValue;
		/* to check if there is previous value */
		this.allowEmptySubmit = this.userValue === '' ? false : true;
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

	/**
	 * Submits the current value of the search input to outside listener.
	 */
	public submit(): void {
		if (this.canSubmit()) {
			this.submitHandler.emit(this.value);
		}

		this.allowEmptySubmit = false;
		this.setFocus();
	}
}
