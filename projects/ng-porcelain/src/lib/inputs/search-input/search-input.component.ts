import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

// Font Awesome 5
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslationService } from '../../services/translation/translation.service';
import { Loggable } from '../../Loggable';

@Component({
	selector: 'p-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	host: {
		'[class.search-input]': 'true',
		'[class.search-input--no-borders]': '!borders',
		'[class.search-input--has-focus]': 'isSearchFocused'
	}
})
export class SearchInputComponent extends Loggable {
	private _value: string;

	@Input()
	readonly canEmitEmpty: boolean = false;

	readonly name = 'SearchInputComponent';

	@Input() public borders: boolean = true;

	@Input() public clearIcon: any = faTimesCircle;
	@Input() public clearIconColor: any = '#9dacba';

	@Input() public placeholderLabel: string = 'Type to search...';

	@Input() public submitIcon: any = faSearch;
	@Input() public submitIconColor: any = '#9dacba';

	@Output() public clear: EventEmitter<string> = new EventEmitter();
	@Output() public submit: EventEmitter<string> = new EventEmitter();

	@Output()
	public valueChange: EventEmitter<string> = new EventEmitter();

	@ViewChild('searchInput', { static: true }) public searchInput: ElementRef<HTMLInputElement>;

	public isSearchFocused = false;

	constructor(private translationService: TranslationService) {
		super();
		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this, {
				label_TypeToSearch: 'placeholderLabel'
			})
		);
	}

	@Input()
	get value(): string {
		return this._value;
	}

	set value(value: string) {
		this._value = value;
		this.valueChange.emit(this._value);
	}

	/**
	 * Tests if the control is in a condition that allows a submit.
	 */
	public canSubmit(): boolean {
		return (this.isEmpty() && this.canEmitEmpty) || !this.isEmpty();
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
	 * Returns the value of isSearchFocused.
	 */
	public searchHasFocus(): boolean {
		return this.isSearchFocused;
	}

	/**
	 * Sets focus on the search input.
	 */
	public ensureFocus(): void {
		this.searchInput.nativeElement.focus();
	}

	/**
	 * Clears the value of the search field and resets focus.
	 */
	public tryClear(): void {
		this.value = '';

		//empty value to be emitted to emptyHandler
		this.clear.emit('');

		this.ensureFocus();
	}

	/**
	 * Submits the current value of the search input to outside listener.
	 */
	public trySubmit(): void {
		this.log('trySubmit()', { value: this.value });
		if ((this.isEmpty() && this.canEmitEmpty) || !this.isEmpty()) {
			this.submit.emit(this.value);
		}
	}

	public setFocus(isFocused: boolean): this {
		this.log('setFocus(isFocused)', { isFocused });
		this.isSearchFocused = isFocused;
		return this;
	}
}
