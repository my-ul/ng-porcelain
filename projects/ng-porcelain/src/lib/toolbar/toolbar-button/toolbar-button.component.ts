import {
	Component,
	OnInit,
	HostBinding,
	HostListener,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	AfterViewInit
} from '@angular/core';
import { Input } from '@angular/core';

@Component({
	selector: 'porcelain-toolbar-button',
	templateUrl: './toolbar-button.component.html',
	styleUrls: ['./toolbar-button.component.scss']
})
export class ToolbarButtonComponent implements AfterViewInit {
	/**
	 * Initializes the button by adding the default porcelain classes.
	 */
	@HostBinding('class')
	readonly componentClasses: string = 'porcelain-toolbar-button';

	/**
	 * Reference to the #label in the template.
	 */
	@ViewChild('label', { read: ElementRef, static: true })
	labelRef: ElementRef;

	/**
	 * Title to be added to the host element as a descriptive title.
	 */
	@HostBinding('title')
	title: string;

	/**
	 * Boolean to track whether the component has focus or not.
	 */
	private _hasFocus = false;

	get hasFocus() {
		return this._hasFocus;
	}

	set hasFocus(hasFocus: boolean) {
		this._hasFocus = hasFocus;
	}

	@HostBinding('class.porcelain-toolbar-button--disabled')
	@Input()
	disabled: boolean = false;

	/**
	 * A Font Awesome 5 Icon to display on the icon.
	 */
	@Input() icon = null;

	/**
	 * Allows the icon to be placed before or after the label, defaults to "before"
	 */
	@Input() iconPosition: 'before' | 'after' = 'before';

	/**
	 * Allows the label to be hidden, except for screen readers.
	 */
	@Input() isLabelSrOnly: boolean = false;

	/**
	 * Event emitter for the click and enter/space keypresses
	 */
	@Output() onClick = new EventEmitter<void>();

	/**
	 * Allows the button to fill its container.
	 */
	@HostBinding('class.porcelain-toolbar-button--is-block')
	@Input()
	isBlock: boolean = false;

	/**
	 * Sets the tabindex for the button, allowing it to be focusable with tab/keyboard.
	 */
	@HostBinding('tabindex')
	tabIndex = 0;

	/**
	 * Sets hasFocus to true when the button gains focus.
	 */
	@HostListener('focus')
	onFocus() {
		this.hasFocus = true;
	}

	/**
	 * Sets hasFocus to false when the button loses focus.
	 */
	@HostListener('blur')
	onBlur() {
		this.hasFocus = false;
	}

	/**
	 * Listens to document key presses, and "clicks" the button when enter
	 * or space are pressed.
	 * @param event A keyboard event.
	 */
	@HostListener('document:keydown', ['$event'])
	onDocumentKeyDown(event: KeyboardEvent) {
		// Using the event.key api is recommended
		// see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
		const keys = [
			'Enter',
			' ', // Space
			'Spacebar' // IE 11
		];

		if (!this.disabled && this.hasFocus && ~keys.indexOf(event.key)) {
			this.onClick.emit();
		}
	}

	/**
	 * Emits a click when the button is clicked.
	 */
	@HostListener('click')
	onHostClick() {
		if (!this.disabled) {
			this.onClick.emit();
		}
	}

	/**
	 * Sets the title to be equal to the label's innerText.
	 */
	ngAfterViewInit() {
		/*
			Take the text from the #label and make it the title for the button.
		*/
		this.title = this.labelRef.nativeElement.innerText.trim();
	}
}
