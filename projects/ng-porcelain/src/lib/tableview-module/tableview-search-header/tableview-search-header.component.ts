import { Component, OnInit, Input } from '@angular/core';
import { faSort, faSortDown, faSortUp, faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
	selector: 'p-tableview-searchSort-header',
	templateUrl: './tableview-search-header.component.html',
	styleUrls: ['./tableview-search-header.component.scss']
})
export class TableviewSearchHeaderComponent implements OnInit {
	@Input() isSearchEnabled: boolean = true;
	@Input() public searchIcon: any = faSearch;
	@Input() public searchIconColor: any = '#9dacba';
	@Input() public faSortUpIcon: any = faSortUp;
	@Input() public faSortDownIcon: any = faSortDown;
	@Input() public sortIconColor: any = '#9dacba';
	constructor() {}

	ngOnInit(): void {}
}
