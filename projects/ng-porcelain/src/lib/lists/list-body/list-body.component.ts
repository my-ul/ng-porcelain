import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'porcelain-list-body, p-list-body',
	templateUrl: './list-body.component.html',
	styleUrls: ['./list-body.component.scss']
})
export class ListBodyComponent implements OnInit {
	@HostBinding('class.list-table-view')
	@Input()
	isTableView: boolean = false;

	constructor() {}

	ngOnInit() {}
}
