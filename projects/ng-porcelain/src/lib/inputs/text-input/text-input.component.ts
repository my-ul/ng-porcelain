import { Component, OnInit, EventEmitter, Input, Output, HostBinding } from '@angular/core';

@Component({
	selector: 'porcelain-text-input, p-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
	_value: string = '';

	@Input('border')
	@HostBinding('class.text-input--has-border')
	hasBorder = true;

	@Input()
	get value(): string {
		return this._value;
	}

	set value(value: string) {
		this._value = value;
		this.valueChange.emit(this._value);
	}

	@Output()
	valueChange: EventEmitter<string> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	@HostBinding('class.text-input--has-focus')
	isFocused: boolean = false;

	setFocus(isFocused: boolean): this {
		this.isFocused = isFocused;
		return this;
	}
}
