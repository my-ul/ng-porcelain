import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-savedsearch-modalpopup',
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
