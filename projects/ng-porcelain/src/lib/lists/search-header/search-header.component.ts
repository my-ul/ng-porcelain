import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Loggable } from '../../Loggable';
import { SortDirection, SortTuple } from '../sort-header/sort-header.component';

import { faSort, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchInputComponent } from '../../search-input/search-input/search-input.component';

export type SearchTuple = [string, string];

@Component({
	selector: 'porcelain-search-header',
	templateUrl: './search-header.component.html',
	styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent extends Loggable implements OnInit {
	readonly name = 'SearchHeaderComponent';
	readonly sortIcon: any = faSort;
	readonly searchIcon: any = faSearch;

	mode: 'search' | 'sort' = 'sort';

	constructor() {
		super();
		this.info(`new SearchHeaderComponent()`, { arguments });
	}

	@Input() label: string = '';

	@Input() sortKey: string = '';

	//#region `[(query)]` Binding

	private _query: string;

	@Output()
	public queryChange: EventEmitter<string> = new EventEmitter();

	@Input()
	get query(): string {
		return this._query;
	}

	set query(query: string) {
		this._query = query;
		this.queryChange.emit(this._query);
	}

	setQuery(query: string) {
		if (this.query !== query) {
			this.query = query;
		}
	}

	//#endregion

	//#region `[(activeSortKey)]` Binding

	private _activeSortKey: string;

	@Input()
	get activeSortKey(): string {
		return this._activeSortKey;
	}

	set activeSortKey(activeSortKey: string) {
		this._activeSortKey = activeSortKey;
		this.activeSortKeyChange.emit(this._activeSortKey);
	}

	@Output()
	public activeSortKeyChange: EventEmitter<string> = new EventEmitter();

	//#endregion

	//#region `[(activeSortDirection)]` Binding

	private _activeSortDirection: SortDirection;

	@Input()
	get activeSortDirection(): SortDirection {
		return this._activeSortDirection;
	}

	set activeSortDirection(activeSortDirection: SortDirection) {
		this._activeSortDirection = activeSortDirection;
		this.activeSortDirectionChange.emit(this._activeSortDirection);
	}

	@Output()
	public activeSortDirectionChange: EventEmitter<SortDirection> = new EventEmitter();

	//#endregion

	//#region `@Output()` Bindings

	@Output()
	public sortChange: EventEmitter<SortTuple> = new EventEmitter();

	//#endregion

	sortChanged([activeSortKey, activeSortDirection]: SortTuple) {
		// These assignments will fire their own events; do not fire.
		if (this.activeSortKey !== activeSortKey) {
			this.activeSortKey = activeSortKey;
		}

		if (this.activeSortDirection !== activeSortDirection) {
			this.activeSortDirection = activeSortDirection;
		}

		this.sortChange.emit([this.activeSortKey, this.activeSortDirection]);
	}

	@Output()
	public searchChange: EventEmitter<SearchTuple> = new EventEmitter();

	searchChanged(query: string): void {
		this.info('searchChanged(query)', { query }, { sortKey: this.sortKey, query });
		if (this.query !== query) {
			this.query = query;
		}
		this.searchChange.emit([this.sortKey, query]);
	}

	@ViewChild(SearchInputComponent) searchInputComponent: SearchInputComponent;

	switchModes() {
		this.mode = this.mode === 'sort' ? 'search' : 'sort';

		setTimeout(() => {
			if (this.mode === 'search') {
				this.searchInputComponent.setFocus();
			}
		}, 0);
	}

	ngOnInit() {
		this.info('ngOnInit()', this.query);
	}
}
