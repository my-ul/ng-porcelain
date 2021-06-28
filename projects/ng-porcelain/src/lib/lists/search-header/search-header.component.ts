import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { faSearch, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { Loggable } from '../../Loggable';
import { SearchInputComponent } from '../../inputs/search-input/search-input.component';
import { SortDirection, SortTuple } from '../sort-header/sort-header.component';
import { TranslationService } from '../../services/translation/translation.service';
export type SearchTuple = [string, string];

@Component({
	selector: 'porcelain-search-header, p-search-header',
	templateUrl: './search-header.component.html',
	styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent extends Loggable implements OnInit {
	readonly name = 'SearchHeaderComponent';
	readonly sortIcon: any = faSortDown;
	readonly searchIcon: any = faSearch;

	constructor(private translationService: TranslationService) {
		super();
		this.info(`new SearchHeaderComponent()`, { arguments });
		this.sortChange.subscribe(sort => this.onSortChange.emit(sort));
		this.searchChange.subscribe(search => this.onSearchChange.emit(search));
		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this, {
				label_TypeToSearch: 'placeholderLabel'
			})
		);
	}

	@Input() label: string = '';

	@Input() sortKey: string = '';

	@Input() sortSearch: string = '';

	mode: string = '';
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

	@Input() public placeHolderLabel: string = '';
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
	onSortChange: EventEmitter<SortTuple> = new EventEmitter();

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
	onSearchChange: EventEmitter<SearchTuple> = new EventEmitter();

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
				this.searchInputComponent.ensureFocus();
			}
		}, 0);
	}

	ngOnInit() {
		this.info('ngOnInit()', this.query);
		this.mode = this.sortSearch;
	}
}
