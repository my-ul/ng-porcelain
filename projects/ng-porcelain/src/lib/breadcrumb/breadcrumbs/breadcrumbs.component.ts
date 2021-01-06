import { Component, OnInit } from '@angular/core';
import { Loggable } from '../../../lib/Loggable';

@Component({
	selector: 'porcelain-breadcrumbs, p-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent extends Loggable implements OnInit {
	name = 'BreadcrumbsComponent';

	constructor() {
		super();
		this.info('new BreadcrumbsComponent()');
	}

	ngOnInit(): void {}
}
