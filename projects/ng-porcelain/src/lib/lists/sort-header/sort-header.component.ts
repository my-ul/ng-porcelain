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

export type SortDirection = 'asc' | 'desc' | null;

export type SortTuple = [string, SortDirection];

@Component({
	selector: 'porcelain-sort-header',
	templateUrl: './sort-header.component.html',
	styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit {
	readonly faSortUp = faSortUp;
	readonly faSortDown = faSortDown;
	readonly faSort = faSort;

	@HostBinding('class')
	classes = 'sort-header';

	@HostBinding('class.sort-header--active')
	get active() {
		if (this.activeSortKey === this.sortKey) {
			console.log('active()', {
				parent: [this.activeSortKey, this.activeSortDirection],
				inner: [this.sortKey, this.sortDirection]
			});
		}
		return this.sortKey === this.activeSortKey && this.sortDirection !== null;
	}

	@Input()
	label: string = '';

	@Input()
	sortKey: string = null;

	@Input()
	activeSortKey: string = '';

	@Input()
	activeSortDirection: SortDirection = null;

	private _sortDirection: SortDirection = null;

	@Input()
	get sortDirection() {
		return this._sortDirection;
	}
	set sortDirection(sortDirection: SortDirection) {
		console.log('setDirection(sortDirection)', { sortDirection });
		this._sortDirection = sortDirection;
		this.sortDirectionChange.emit([this.sortKey, this._sortDirection]);
	}

	@Output()
	sortDirectionChange: EventEmitter<SortTuple> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	@HostListener('click', ['$event'])
	toggleSort($event) {
		console.log('toggleSort', [this.sortKey, this.sortDirection]);
		if (this.sortDirection === null) {
			this.sortDirection = 'asc';
		} else if (this.sortDirection === 'asc') {
			this.sortDirection = 'desc';
		} else {
			this.sortDirection = null;
		}
	}
}
