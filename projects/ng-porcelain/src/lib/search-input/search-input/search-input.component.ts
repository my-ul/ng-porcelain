import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// Font Awesome 5
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslationService } from '../../services';

@Component({
	selector: 'porcelain-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SearchInputComponent),
			multi: true
		}
	]
})
export class SearchInputComponent implements OnInit, ControlValueAccessor {
	private _query: string = '';

	get query(): string {
		return this._query;
	}

	set query(query: string) {
		this._query = query;
		this.onChange(this._query);
	}

	writeValue(query: string): void {
		this.query = query; // will trigger onChange
	}

	onChange = (query: string) => {};

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	onTouched = () => {};

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	@Input()
	disabled: boolean = false;

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	@ViewChild('searchInput') public searchInput: ElementRef<HTMLInputElement>;

	// Appearance
	@Input() public borders: boolean = true;

	@Input() public clearIcon: any = faTimesCircle;
	@Input() public clearIconColor: any = '#9dacba';

	@Input() public submitIcon: any = faSearch;
	@Input() public submitIconColor: any = '#9dacba';

	@Input() public placeholderLabel: string = 'Type to search...';
	@Input() public canApply: boolean = true;

	@Output() public onApply: EventEmitter<string> = new EventEmitter<string>();

	public isSearchFocused = false;

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
	// public canApply(): boolean {
	// 	return !this.isEmpty();
	// }

	/**
	 * Clears the value of the search field and resets focus.
	 */
	public clear(): void {
		this.query = '';
		this.setFocus();
	}

	/**
	 * Sets the isSearchFocused value to false.
	 */
	public handleBlur(): void {
		this.onTouched();
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
		return this.query === '';
	}

	/**
	 * Tasks to execute after angular has processed Input and Output values
	 */
	public ngOnInit(): void {}

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
		this.onApply.emit(this.query);
	}
}
