import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'porcelain-list, p-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	@HostBinding('class.list--as-table')
	@Input()
	isTableView: boolean = false;

	@Input() renderHeader: boolean = true;

	constructor() {}

	ngOnInit() {}
}
