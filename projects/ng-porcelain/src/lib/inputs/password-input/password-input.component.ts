import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';

//import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { TranslationService } from '../../services';

@Component({
	selector: 'porcelain-password-input',
	templateUrl: './password-input.component.html',
	styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
	// Icons
	showIcon = faEye;
	hideIcon = faEyeSlash;

	// Labels
	labels = {
		showPassword: 'Show Password',
		hidePassword: 'Hide Password'
	};

	isRevealed = false;

	@Input('border')
	@HostBinding('class.password-input--has-border')
	hasBorder = true;

	private _value: string;

	@Input()
	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;
		this.valueChange.emit(this._value);
	}

	@Output()
	valueChange = new EventEmitter<string>();

	getInputType(): string {
		return this.isRevealed ? 'text' : 'password';
	}

	toggle() {
		this.isRevealed = !this.isRevealed;
	}

	@HostBinding('class.password-input--has-focus')
	focus: boolean = false;

	/**
	 * Sets the focus state of the control when the input gains focus;
	 * Currentl bound to (focus) and (blur)
	 */
	setFocus(focus: boolean) {
		this.focus = focus;
	}

	constructor(public translationService: TranslationService) {
		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this.labels, {
				label_ShowPassword: 'showPassword',
				label_HidePassword: 'hidePassword'
			})
		);
	}

	ngOnInit() {}
}
