import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'porcelain-list, p-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	// Question to ask since the Css is being applied to an inner element applying style to host will it
	//overide. or can we use something like an ngClass to the toggle the classes

	@HostBinding('class.list--as-table')
	@Input()
	isTableView: boolean = false;

	@Input() renderHeader: boolean = true;

	constructor() {}

	ngOnInit() {}
}
