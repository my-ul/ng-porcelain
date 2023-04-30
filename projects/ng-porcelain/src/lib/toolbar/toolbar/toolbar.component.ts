import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'porcelain-toolbar, p-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
	host: {
		'[class.porcelain-toolbar]': 'true'
	}
})
export class ToolbarComponent implements OnInit {
	@HostBinding('class.porcelain-toolbar--right')
	@Input()
	alignRight: boolean = false;

	constructor() {}

	ngOnInit() {}
}
