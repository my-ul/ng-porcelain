import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	ElementRef,
	HostListener
} from '@angular/core';

@Component({
	selector: 'porcelain-dropdown-selectoption, p-dropdown-selectoption',
	templateUrl: './dropdown-select-option.component.html',
	styleUrls: ['./dropdown-select-option.component.scss']
})
export class DropdownSelectOptionComponent implements OnInit {
	readonly name = 'ToolbarOptionComponent';

	@Input() value: any;

	// tslint:disable-next-line: no-output-on-prefix
	@Output() onValue: EventEmitter<any> = new EventEmitter();

	// tslint:disable-next-line: no-output-on-prefix
	@Output() onHover: EventEmitter<boolean> = new EventEmitter();

	@HostBinding('class.porcelain-dropdown-selectoption--is-highlighted')
	isHighlighted: boolean = false;

	constructor(public elementRef: ElementRef) {}

	ngOnInit() {}

	@HostListener('click')
	select() {
		this.onValue.emit(this.value);
	}

	@HostListener('mouseover')
	hoverIn() {
		this.onHover.emit(true);
	}

	@HostListener('mouseout')
	hoverOut() {
		this.onHover.emit(false);
	}
}
