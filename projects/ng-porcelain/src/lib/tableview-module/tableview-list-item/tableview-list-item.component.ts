import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BackgroundColorDirective } from '../color-directive/background-color.directive';

@Component({
	selector: 'p-tableview-list-item',
	templateUrl: './tableview-list-item.component.html',
	styleUrls: ['./tableview-list-item.component.scss']
})
export class TableviewListItemComponent implements OnInit {
	@Input() ElementIndex: number = 0;

	@ViewChild(BackgroundColorDirective, { static: false })
	public bgColorforListitem: BackgroundColorDirective;

	constructor() {}

	ngOnInit(): void {}
}
