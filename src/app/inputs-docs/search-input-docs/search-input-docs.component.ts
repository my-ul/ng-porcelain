import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-search-input-docs',
	templateUrl: './search-input-docs.component.html',
	styleUrls: ['./search-input-docs.component.scss']
})
export class SearchInputDocsComponent implements OnInit {
	GlobalSearch: string = '';

	responselangJson = {
		label_Search: 'Search within...'
	};

	constructor() {}

	ngOnInit(): void {}

	onGlobalSearchChange(value: string) {
		console.log('Global search change:', value);
		if (this.GlobalSearch != value) {
			this.GlobalSearch = value;
		}
	}
}
