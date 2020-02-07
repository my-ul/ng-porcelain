import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
	selector: 'porcelain-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	@HostBinding('class')
	classes = ['list'].join(' ');

	constructor() {}

	ngOnInit() {}
}
