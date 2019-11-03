import { Component, OnInit, HostBinding } from '@angular/core';
import { Input } from '@angular/core';

@Component({
	selector: 'porcelain-toolbar-button',
	templateUrl: './toolbar-button.component.html',
	styleUrls: ['./toolbar-button.component.scss'],
	host: {
		'[class.porcelain-toolbar-button]': 'true'
	}
})
export class ToolbarButtonComponent implements OnInit {
	@Input() icon = null;
	@Input() label: String = null;
	@Input() isLabelSrOnly: boolean = false;

	@HostBinding('class.porcelain-toolbar-button--is-block')
	@Input()
	isBlock: boolean = false;

	@HostBinding('tabindex')
	tabIndex = 0;

	constructor() {}

	ngOnInit() {}
}
