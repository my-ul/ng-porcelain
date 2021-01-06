import { Component, OnInit } from '@angular/core';
import { Loggable } from '../../../lib/Loggable';

@Component({
	selector: 'porcelain-breadcrumb-item, p-breadcrumb-item',
	templateUrl: './breadcrumb-item.component.html',
	styleUrls: ['./breadcrumb-item.component.scss']
})
export class BreadcrumbItemComponent extends Loggable implements OnInit {
	name = 'BreadcrumbItemComponent';
	constructor() {
		super();
		this.info('new BreadcrumbItemComponent()');
	}

	ngOnInit(): void {}
}
