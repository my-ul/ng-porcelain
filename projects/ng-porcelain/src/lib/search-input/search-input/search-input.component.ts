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
import { TranslationService } from '../../services';

@Component({
	selector: 'porcelain-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	providers: [TranslationService]
})
export class SearchInputComponent implements OnInit {
	@Input() public userValue: string = '';
	@ViewChild('searchInput') public searchInput: ElementRef<HTMLInputElement>;

	//#region Appearance

	@Input() public borders: boolean = true;
	@Input() public clearIconColor: any = '#9dacba';
	@Input() public submitIconColor: any = '#9dacba';

	//#endregion

	//#region Handlers

	@Output() public emptyHandler: EventEmitter<string> = new EventEmitter();
	@Output() public submitHandler: EventEmitter<string> = new EventEmitter();

	//#endregion

	//#region Icons

	@Input() public clearIcon: any = faTimesCircle;
	@Input() public submitIcon: any = faSearch;

	//#endregion

	//#region Labels

	@Input() public placeholderLabel: string = 'Type to search...';

	//#endregion

	public isSearchFocused = false;
	public currentValue = '';

	constructor(private translationService: TranslationService) {
		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this, {
				label_TypeToSearch: 'placeholderLabel'
			})
		);
	}

	/**
	 * Tests if the control is in a condition that allows a submit.
	 */
	public canSubmit(): boolean {
		return (this.isEmpty() && this.canEmitEmpty) || !this.isEmpty();
	}

	/**
	 * Clears the value of the search field and resets focus.
	 */
	public clear(): void {
		this.currentValue = '';

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
		this.canEmitEmpty = this.userValue == '' ? false : true;
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

	canEmitEmpty: boolean = false;

	/**
	 * Submits the current value of the search input to outside listener.
	 */
	public submit(): void {
		if (!this.isEmpty()) {
			this.submitHandler.emit(this.currentValue);
			this.canEmitEmpty = true; //to enable empty value sending for submit
		} else {
			// is empty
			if (this.canEmitEmpty == true) {
				this.canEmitEmpty = false;
				this.submitHandler.emit(this.currentValue); //empty value is emitted by submit
			}
			this.setFocus();
		}
	}
}
