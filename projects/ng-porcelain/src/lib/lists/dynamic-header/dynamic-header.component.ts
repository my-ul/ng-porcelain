import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

import { SortDirection, SortTuple } from '../sort-header/sort-header.component';
import { Loggable } from '../../Loggable';
import { SearchTuple } from '../search-header/search-header.component';

export type DynamicColumnType = 'search' | 'sort' | 'text';

export interface DynamicColumn {
	label: string;
	key: string;
	locked: boolean;
	type: DynamicColumnType;
	width: number;
}

export interface DynamicSearchQuery {
	[key: string]: string;
}

@Component({
	selector: 'porcelain-dynamic-header',
	templateUrl: './dynamic-header.component.html',
	styleUrls: ['./dynamic-header.component.scss'],
	host: {
		'porcelain-dynamic-header': 'true'
	}
})
export class DynamicHeaderComponent<TColumnType extends any = any> extends Loggable implements OnInit {
	readonly name = 'DynamicHeaderComponent';
	readonly gripIcon: any = faGripLinesVertical;

	@Input() labelProp: string = 'label';

	@Input() widthProp: string = 'width';

	//#region `[(column)]` Binding

	private _columns: DynamicColumn[];

	public columnsChange: EventEmitter<DynamicColumn[]> = new EventEmitter();

	@Input()
	get columns(): DynamicColumn[] {
		return this._columns;
	}

	set columns(columns: DynamicColumn[]) {
		this._columns = columns;
		this.columnsChange.emit(this._columns);
	}

	//#endregion

	//#region `[(activeSortKey)]` Binding

	private _activeSortKey: string;

	@Output()
	public activeSortKeyChange: EventEmitter<string> = new EventEmitter();

	@Input()
	get activeSortKey(): string {
		return this._activeSortKey;
	}

	set activeSortKey(activeSortKey: string) {
		this._activeSortKey = activeSortKey;
		this.activeSortKeyChange.emit(this._activeSortKey);
	}

	//#endregion

	//#region `[(activeSortDirection)]` Binding

	private _activeSortDirection: SortDirection;

	@Output()
	public activeSortDirectionChange: EventEmitter<SortDirection> = new EventEmitter();

	@Input()
	get activeSortDirection(): SortDirection {
		return this._activeSortDirection;
	}

	set activeSortDirection(activeSortDirection: SortDirection) {
		this._activeSortDirection = activeSortDirection;
		this.activeSortDirectionChange.emit(this._activeSortDirection);
	}

	//#endregion

	//#region `(sortChange)` Binding

	@Output()
	public sortChange: EventEmitter<SortTuple> = new EventEmitter();

	sortChanged(sort: SortTuple) {
		this.sortChange.emit(sort);
	}

	//#endregion

	//#region `[(query)]` Binding

	private _query: DynamicSearchQuery = {};

	@Input()
	get query(): DynamicSearchQuery {
		return this._query;
	}

	set query(query: DynamicSearchQuery) {
		this._query = query;
		this.queryChange.emit(this._query);
	}

	@Output()
	public queryChange: EventEmitter<DynamicSearchQuery> = new EventEmitter();

	searchChanged([searchKey, searchValue]: SearchTuple): void {
		if (searchValue === null) {
			this.query = Object.keys(this.query)
				.filter(key => key !== searchKey)
				.reduce((query, key) => {
					query[key] = this.query[key];
					return query;
				}, {});
		} else {
			this.query = {
				[searchKey]: searchValue,
				...this.query
			};
		}
		this.log(
			'searchChanged([searchKey, searchValue]) query updated',
			{ searchKey, searchValue },
			this.query
		);
	}

	getQueryValue(key: string): string {
		this.info('getQueryValue(key)', { key }, { query: this.query }, this.query[key]);
		if (this.query[key]) {
			return this.query[key];
		} else {
			return '';
		}
	}

	//#endregion

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
	}

	getLabel(column: any) {
		return column[this.labelProp] || '';
	}

	getWidth(column: any, assume: '%' | '#' | 'px' | 'em' | 'rem' | 'none' = '%') {
		const value = column[this.widthProp];
		if (assume === 'none') {
			return value;
		}
		if (typeof value === 'number') {
			switch (assume) {
				case '%':
					return `${value * 100}%`;

				case '#':
					return `${value}%`;

				case 'px':
				case 'em':
				case 'rem':
					return `${value}${assume}`;

				default:
					return null;
			}
		}
		return null;
	}

	constructor() {
		super();
	}

	ngOnInit() {
		let totalWidth = this.columns.reduce((sum, currentColumn) => {
			return sum + currentColumn.width;
		}, 0);
		if (totalWidth !== 1) {
			this.forceLog().warn(
				`Column widths do not equal 100%: (${totalWidth} !== 1) column layout may fail.`
			);
		}

		this.info('ngOnInit()', { query: this.query });
	}
}
