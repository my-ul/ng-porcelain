import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'porcelain-list-header, p-list-header',
	templateUrl: './list-header.component.html',
	styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
	@HostBinding('class.list--as-table')
	@Input()
	isTableView: boolean = false;
	constructor() {}

	ngOnInit() {}
}
