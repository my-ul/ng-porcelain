import { Component, OnInit, HostBinding, Input, ViewChild } from '@angular/core';
import { BackgroundColorDirective } from '../color-directive/background-color.directive';

@Component({
	selector: 'porcelain-list-item, p-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
	@Input() ElementIndex: number = 0;

	@ViewChild(BackgroundColorDirective, { static: false })
	public bgColorforListitem: BackgroundColorDirective;

	@HostBinding('class')
	classes = ['list-item'].join(' ');

	@HostBinding('class.list-item--success')
	@Input()
	success: boolean = false;

	@HostBinding('class.list-item--error')
	@Input()
	error: boolean = false;

	@HostBinding('class.list-item--warning')
	@Input()
	warning: boolean = false;

	@HostBinding('class.list-item--primary')
	@Input()
	primary: boolean = false;

	@HostBinding('class.list-item--secondary')
	@Input()
	secondary: boolean = false;

	constructor() {}

	ngOnInit() {}
}
