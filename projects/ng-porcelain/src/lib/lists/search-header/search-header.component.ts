import { Component, OnInit, Input } from '@angular/core';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'porcelain-search-header',
	templateUrl: './search-header.component.html',
	styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {
	readonly faSortUp = faSortUp;
	readonly faSortDown = faSortDown;
	readonly faSort = faSort;

	@Input()
	label: string = '';

	constructor() {}

	ngOnInit() {}
}
