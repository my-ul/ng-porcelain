import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'porcelain-popup, p-popup',
	templateUrl: './tooltip-popup.component.html',
	styleUrls: ['./tooltip-popup.component.scss']
})
export class TooltipPopupComponent implements OnInit {
	constructor() {}

	@Output() onCheckBoxClick = new EventEmitter<string>();
	@Output() onModalClose = new EventEmitter<string>();

	ngOnInit() {}

	onCheckboxClick() {
		this.onCheckBoxClick.emit('true');
	}

	oncloseModelclick() {
		this.onModalClose.emit('true');
	}
}
