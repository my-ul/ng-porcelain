import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'porcelain-savedsearch-modal, p-savedsearch-modal',
	templateUrl: './savedsearch-modalpopup.component.html',
	styleUrls: ['./savedsearch-modalpopup.component.scss']
})
export class SavedsearchModalpopupComponent implements OnInit {
	constructor() {}
	@Output() onCheckBoxClick = new EventEmitter<string>();
	@Output() onModalClose = new EventEmitter<string>();

	ngOnInit(): void {}

	onCheckboxClick() {
		this.onCheckBoxClick.emit('true');
	}

	closeModel() {
		this.onModalClose.emit('true');
	}
}
