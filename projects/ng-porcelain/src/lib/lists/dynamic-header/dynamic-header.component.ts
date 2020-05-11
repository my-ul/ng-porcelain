import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

import { SortDirection, SortTuple } from '../sort-header/sort-header.component';
import { Loggable } from '../../Loggable';

export interface DynamicSearchBinding {}
export interface DynamicSortBinding {
	activeSortDirectionChange: (sortDirection: SortDirection) => void;
	activeSortKeyChange: (sortKey: string) => void;
	sortChange: (sortTuple: SortTuple) => void;
}

export type DynamicColumnType = 'search' | 'sort' | 'text';

export interface DynamicColumn {
	label: string;
	key: string;
	locked: boolean;
	type: DynamicColumnType;
	width: number;

	search?: DynamicSearchBinding;
	sort?: DynamicSortBinding;
}

@Component({
	selector: 'porcelain-dynamic-header',
	templateUrl: './dynamic-header.component.html',
	styleUrls: ['./dynamic-header.component.scss'],
	host: {
		'porcelain-dynamic-header': 'true'
	}
})
export class DynamicHeaderComponent<T> extends Loggable implements OnInit {
	name = 'DynamicHeaderComponent';

	gripIcon = faGripLinesVertical;

	@Input() labelProp: string = 'label';

	@Input() widthProp: string = 'width';

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

	private _activeSortKey: string;

	public activeSortKeyChange: EventEmitter<string> = new EventEmitter();

	@Input()
	get activeSortKey(): string {
		return this._activeSortKey;
	}

	set activeSortKey(activeSortKey: string) {
		this._activeSortKey = activeSortKey;
		this.activeSortKeyChange.emit(this._activeSortKey);
	}

	private _activeSortDirection: SortDirection;

	public activeSortDirectionChange: EventEmitter<SortDirection> = new EventEmitter();

	@Input()
	get activeSortDirection(): SortDirection {
		return this._activeSortDirection;
	}

	set activeSortDirection(activeSortDirection: SortDirection) {
		this._activeSortDirection = activeSortDirection;
		this.activeSortDirectionChange.emit(this._activeSortDirection);
	}

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

	ngOnInit() {}
}
