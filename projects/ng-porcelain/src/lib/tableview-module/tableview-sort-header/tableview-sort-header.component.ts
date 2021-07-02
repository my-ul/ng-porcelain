import {
	Component,
	OnInit,
	Input,
	HostBinding,
	Output,
	EventEmitter,
	HostListener
} from '@angular/core';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

export type SortDirection = 'asc' | 'desc' | null;

export type SortTuple = [string, SortDirection];

@Component({
	selector: 'p-tableview-sort-header',
	templateUrl: './tableview-sort-header.component.html',
	styleUrls: ['./tableview-sort-header.component.scss']
})
export class TableviewSortHeaderComponent implements OnInit {
	readonly name = 'SortHeaderComponent';

	readonly faSortUp = faSortUp;
	readonly faSortDown = faSortDown;
	readonly faSort = faSort;

	@HostBinding('class')
	classes = 'sort-header';

	isNullOrUndefined(subject: any): subject is null | undefined {
		return subject === null || subject === undefined;
	}

	@HostBinding('class.sort-header--active')
	get active() {
		return this.sortKey === this.activeSortKey && !this.isNullOrUndefined(this.activeSortDirection);
	}

	@Input()
	label: string = '';

	@Input()
	sortKey: string = null;

	/**
	 * Backing field for activeSortKey getter/setter
	 */
	private _activeSortKey: string;

	@Input()
	get activeSortKey(): string {
		return this._activeSortKey;
	}

	set activeSortKey(activeSortKey: string) {
		this._activeSortKey = activeSortKey;
		this.activeSortKeyChange.emit(this.activeSortKey);
	}

	@Output()
	activeSortKeyChange: EventEmitter<string> = new EventEmitter();

	/**
	 * Backing field for the current sort direction of the application.
	 */
	private _activeSortDirection: SortDirection;

	@Input()
	get activeSortDirection(): SortDirection {
		return this._activeSortDirection;
	}

	set activeSortDirection(activeSortDirection: SortDirection) {
		this._activeSortDirection = activeSortDirection;
		this.activeSortDirectionChange.emit(this.activeSortDirection);
	}

	@Output()
	activeSortDirectionChange: EventEmitter<string> = new EventEmitter();

	/**
	 * @deprecated Change bindings like `(onSortChange)="..."` to `(sortChange)="..."`
	 */
	@Output()
	onSortChange: EventEmitter<SortTuple> = new EventEmitter();

	@Output()
	sortChange: EventEmitter<SortTuple> = new EventEmitter();

	constructor() {
		this.sortChange.subscribe(sort => this.onSortChange.emit(sort));
	}

	ngOnInit() {}

	@HostListener('click')
	toggleSort() {
		if (this.activeSortKey === this.sortKey) {
			if (this.isNullOrUndefined(this.activeSortDirection)) {
				this.activeSortDirection = 'asc';
			} else if (this.activeSortDirection === 'asc') {
				this.activeSortDirection = 'desc';
			} else {
				this.activeSortDirection = null;
			}
		} else {
			this.activeSortDirection = 'asc';
			this.activeSortKey = this.sortKey;
		}
		this.sortChange.emit([this.sortKey, this.activeSortDirection]);
	}
}
