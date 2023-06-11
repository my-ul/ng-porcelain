import {
	Component,
	OnInit,
	ElementRef,
	HostBinding,
	Input,
	Output,
	EventEmitter,
	HostListener
} from '@angular/core';
import { Loggable } from '../../Loggable';

@Component({
	selector: 'porcelain-toolbar-option, p-toolbar-option',
	templateUrl: './toolbar-option.component.html',
	styleUrls: ['./toolbar-option.component.scss']
})
export class ToolbarOptionComponent extends Loggable implements OnInit {
	readonly name = 'ToolbarOptionComponent';

	@Input() value: any;

	// tslint:disable-next-line: no-output-on-prefix
	@Output() onValue: EventEmitter<any> = new EventEmitter();

	// tslint:disable-next-line: no-output-on-prefix
	@Output() onHover: EventEmitter<boolean> = new EventEmitter();

	@HostBinding('class.porcelain-toolbar-option--is-highlighted')
	isHighlighted: boolean = false;

	constructor(public elementRef: ElementRef) {
		super();
		this.log('new ToolbarOptionComponent()', { component: this });
	}

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
