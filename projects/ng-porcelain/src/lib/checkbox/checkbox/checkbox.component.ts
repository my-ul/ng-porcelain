import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'porcelain-checkbox, p-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	private _checked: boolean;

	@Input()
	get checked(): boolean {
		return this._checked;
	}

	set checked(checked: boolean) {
		this._checked = checked;
		this.checkedChange.emit(this._checked);
	}

	@Output()
	public checkedChange: EventEmitter<boolean> = new EventEmitter();

	check() {
		this.checked = true;
		return this;
	}

	uncheck() {
		this.checked = false;
		return this;
	}

	toggle() {
		this.checked = !this.checked;
		return this;
	}

	@Input()
	disabled: boolean;

	enable() {
		this.disabled = false;
		return this;
	}

	disable() {
		this.disabled = true;
		return this;
	}
}
