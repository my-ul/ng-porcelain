import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'porcelain-savedsearch-modal, p-savedsearch-modal',
	templateUrl: './savedsearch-modalpopup.component.html',
	styleUrls: ['./savedsearch-modalpopup.component.scss']
})
export class SavedsearchModalpopupComponent implements OnInit {
	constructor() {}
	@Output() onCheckBoxClick = new EventEmitter<string>();
	@Output() onModalClose = new EventEmitter<string>();
	@Input() quickTipHeader: string = 'Quick Tip';
	@Input() quickTipContent: string =
		'Save your searches for quick access with the Save Search button in certain applications. You can access your saved searches anywhere in the portal by clicking on this Saved Searches link.';
	@Input() checkBoxContent: string = "Don't show this again";
	ngOnInit(): void {}

	onCheckboxClick() {
		this.onCheckBoxClick.emit('true');
	}

	closeModel() {
		this.onModalClose.emit('true');
	}
}
