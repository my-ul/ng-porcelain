import { Component, OnInit, HostBinding } from '@angular/core';
import { Input } from '@angular/core';

@Component({
	selector: 'porcelain-toolbar-text, p-toolbar-text',
	templateUrl: './toolbar-text.component.html',
	styleUrls: ['./toolbar-text.component.scss'],
	host: {
		'[class.porcelain-toolbar-text]': 'true'
	}
})
export class ToolbarTextComponent implements OnInit {
	@HostBinding('class.porcelain-toolbar-text--text-right')
	@Input()
	textRight: boolean = false;

	@HostBinding('class.porcelain-toolbar-text--text-center')
	@Input()
	textCenter: boolean = false;

	@HostBinding('class.porcelain-toolbar-text--no-wrap')
	@Input()
	noWrap: boolean = false;

	constructor() {}

	ngOnInit() {}
}
