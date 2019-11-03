import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
	selector: 'porcelain-toolbar-option',
	templateUrl: './toolbar-option.component.html',
	styleUrls: ['./toolbar-option.component.scss']
})
export class ToolbarOptionComponent implements OnInit {
	@Input() value: any;

	// tslint:disable-next-line: no-output-on-prefix
	@Output() onValue: EventEmitter<any> = new EventEmitter();

	// tslint:disable-next-line: no-output-on-prefix
	@Output() onHover: EventEmitter<boolean> = new EventEmitter();

	@HostBinding('class.porcelain-toolbar-option--is-highlighted')
	isHighlighted: boolean = false;

	constructor(public elementRef: ElementRef) {
		console.log('new ToolbarOptionComponent()', this);
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
