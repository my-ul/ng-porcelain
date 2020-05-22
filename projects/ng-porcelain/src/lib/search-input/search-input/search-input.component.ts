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
import { TranslationService } from '../../services/translation/translation.service';
import { Loggable } from '../../Loggable';

@Component({
	selector: 'porcelain-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	host: {
		'[class.search-input]': 'true',
		'[class.search-input--no-borders]': '!borders',
		'[class.search-input--has-focus]': 'isSearchFocused'
	}
})
export class SearchInputComponent extends Loggable implements OnInit {
	readonly name = 'SearchInputComponent';

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

	//#region `value` Binding

	private _value: string;

	@Input()
	get value(): string {
		return this._value;
	}

	set value(value: string) {
		this._value = value;
		this.valueChange.emit(this._value);
	}

	@Output()
	public valueChange: EventEmitter<string> = new EventEmitter();

	//#endregion

	//#region Labels

	@Input() public placeholderLabel: string = 'Type to search...';

	//#endregion

	public isSearchFocused = false;

	constructor(private translationService: TranslationService) {
		super();
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
		this.value = '';

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

	public updateFocus(isFocused: boolean): this {
		this.isSearchFocused = isFocused;
		return this;
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
		this.value = this.value;
		/*to check if there is previous value*/
		this.canEmitEmpty = this.value === '' ? false : true;
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

	@Input()
	canEmitEmpty: boolean = false;

	/**
	 * Submits the current value of the search input to outside listener.
	 */
	public submit(): void {
		this.log('submit()', { value: this.value });
		if (!this.isEmpty()) {
			this.submitHandler.emit(this.value);
			this.canEmitEmpty = true; //to enable empty value sending for submit
		} else {
			// is empty
			if (this.canEmitEmpty === true) {
				this.canEmitEmpty = false;
				this.submitHandler.emit(this.value); //empty value is emitted by submit
			}
			this.setFocus();
		}
	}
}
