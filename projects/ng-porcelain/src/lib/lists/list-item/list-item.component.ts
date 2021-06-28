import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BackgroundColorDirective } from '../color-directive/background-color.directive';

@Component({
	selector: 'porcelain-list-item, p-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
	@Input() elementIndex: number = 0;

	@ViewChild(BackgroundColorDirective, { static: false })
	public bgColorforListitem: BackgroundColorDirective;

	constructor() {}

	ngOnInit() {}
}
