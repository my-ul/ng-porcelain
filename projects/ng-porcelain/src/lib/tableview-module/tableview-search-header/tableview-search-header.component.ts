import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { faSort, faSortDown, faSortUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TableviewSortHeaderComponent } from './../tableview-sort-header/tableview-sort-header.component';
@Component({
	selector: 'p-tableview-searchSort-header',
	templateUrl: './tableview-search-header.component.html',
	styleUrls: ['./tableview-search-header.component.scss']
})
export class TableviewSearchHeaderComponent implements OnInit {
	/**
	 * default state search box is show, set it to false to show sort box first
	 * */
	@Input() public isSearchEnabled: boolean = true;
	/**
	 * fontAwesome search toggle Icon
	 * */
	@Input() public searchIcon: any = faSearch;
	/**
	 * This controls the search Icon toggle color
	 * */
	@Input() public searchToggleIconColor: any = '#9dacba';
	/**
	 * Incase projected sort component is already sorted ascending, this icon will show up.
	 * */
	@Input() public faSortUpIcon: any = faSortUp;
	/**
	 * fontAwesome sortUpIcon. This is a toggle sort icon. By default shows up
	 * */
	@Input() public faSortDownIcon: any = faSortDown;
	/**
	 * External color control for sort toggle Icon.
	 * */
	@Input() public sortToggleIconColor: any = 'inherit';

	/**
	 * sort component Ref. Note Use only if necessary
	 * */
	@ContentChild(TableviewSortHeaderComponent, { static: false })
	public sortComponentRef: TableviewSortHeaderComponent = null;

	constructor() {}

	public ngOnInit(): void {}

	/**
	 * determines if projected sort component is ascending or desecding*/
	public isSortAsc(): boolean {
		return this.sortComponentRef && this.sortComponentRef.activeSortDirection === 'asc'
			? true
			: false;
	}

	/**
	 * render sort Icon based on sort component
	 * */

	public getSortIcon(): any {
		return this.isSortAsc() ? this.faSortUpIcon : this.faSortDownIcon;
	}

	/**
	 *Utility functions to align
	 * */
	public sortAscStyle(): any {
		return this.isSortAsc() ? '5.5px' : '0';
	}
	public sortDescStyle(): any {
		return this.isSortAsc() ? '0' : '5.5px';
	}
}
