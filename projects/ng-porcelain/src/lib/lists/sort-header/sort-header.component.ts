import {
	Component,
	OnInit,
	Input,
	HostBinding,
	Output,
	EventEmitter,
	HostListener
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Loggable } from '../../Loggable';

export type SortDirection = 'asc' | 'desc' | null;

export type SortTuple = [string, SortDirection];

@Component({
	selector: 'porcelain-sort-header',
	templateUrl: './sort-header.component.html',
	styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent extends Loggable implements OnInit {
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

	@Output()
	onSortChange: EventEmitter<SortTuple> = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit() {}

	@HostListener('click', ['$event'])
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
		this.onSortChange.emit([this.sortKey, this.activeSortDirection]);
		this.log('toggleSort()', [this.sortKey, this.activeSortDirection]);
	}
}
