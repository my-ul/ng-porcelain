import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicColumn, DynamicSearchQuery } from '@my-ul/ng-porcelain';

import * as faker from 'faker';

import { SortTuple } from '@my-ul/ng-porcelain';

interface Person {
	first_name: string;
	last_name: string;
	email: string;
	address_1: string;
	city: string;
	state: string;
	zip: string;
	displayChild: boolean;
}

@Component({
	selector: 'app-dynamic-columns-docs',
	templateUrl: './dynamic-columns-docs.component.html',
	styleUrls: ['./dynamic-columns-docs.component.scss']
})
export class DynamicColumnsDocsComponent implements OnInit {
	private _activeSortDirection: 'asc' | 'desc' = null;

	get activeSortDirection() {
		return this._activeSortDirection;
	}

	set activeSortDirection(activeSortDirection) {
		console.log('set activeSortDirection(activeSortDirection)', { activeSortDirection });
		if (this._activeSortDirection !== activeSortDirection) {
			this._activeSortDirection = activeSortDirection;
		}
	}

	private _activeSortKey: string = null;

	get activeSortKey() {
		return this._activeSortKey;
	}

	set activeSortKey(activeSortKey) {
		console.log('set activeSortKey(activeSortKey)', { activeSortKey });
		if (this._activeSortKey !== activeSortKey) {
			this._activeSortKey = activeSortKey;
		}
	}

	sortChanged(sort: SortTuple) {
		console.log('sortChanged(sort)', { sort });
		// unpack tuple
		let [activeSortKey, activeSortDirection] = sort;

		// set new values
		this.activeSortKey = activeSortKey;
		this.activeSortDirection = activeSortDirection;

		// update the sort
		this.applySort(this.activeSortKey, this.activeSortDirection);
	}

	query: DynamicSearchQuery = {};

	get queryString(): string {
		return (
			'?' +
			Object.keys(this.query)
				.map(currentKey => {
					return `${encodeURIComponent(currentKey)}=${encodeURIComponent(
						this.query[currentKey]
					)}`;
				})
				.join('&')
		);
	}

	queryChanged(query: DynamicSearchQuery) {
		console.log('queryChanged(query)', { query });
		this.query = query;
		this.applySort(this.activeSortKey, this.activeSortDirection);
	}
	headerlabels: any = {
		add: 'Add',
		activeList: 'Active',
		activate: 'Add',
		deactivate: 'Remove',
		inactiveList: 'Inactive',
		locked: 'This item cannot be removed from the active items',
		moveDown: 'Move Down',
		moveUp: 'Move Up',
		moveToTop: 'Move to Top',
		moveToBottom: 'Move to Bottom',
		pluralItems: 'Items',
		singleItems: 'Item',
		zeroItems: 'Items'
	};

	inactiveColumns: DynamicColumn[] = [];
	activeColumns: DynamicColumn[] = [
		{
			label: 'Name',
			key: 'last_name',
			locked: true,
			type: 'search',
			width: 2 / 7
		},

		{
			label: 'Address',
			key: 'address_1',
			locked: false,
			type: 'search',
			width: 2 / 7
		},
		{
			label: 'City',
			key: 'city',
			locked: false,
			type: 'search',
			width: 1 / 7
		},
		{
			label: 'State',
			key: 'state',
			locked: false,
			type: 'search',
			width: 1 / 7
		},
		{
			label: 'Zip',
			key: 'zip',
			locked: false,
			type: 'search',
			width: 1 / 7
		}
	];

	allPeople: Person[] = [];
	currentPeople: Person[] = [];

	constructor() {
		for (let i = 0; i < 50; i++) {
			this.allPeople[i] = {
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.internet.email(),
				address_1: faker.address.streetAddress(),
				city: faker.address.city(),
				state: faker.address.state(),
				zip: faker.address.zipCode(),
				displayChild: false
			};
		}
		this.currentPeople = this.allPeople.slice();
	}

	ngOnInit() {}

	applySort(activeSortKey: string, activeSortDirection: 'asc' | 'desc'): void {
		console.log('applySort(activeSortKey, activeSortDirection)', {
			activeSortKey,
			activeSortDirection,
			query: this.query
		});
		this.currentPeople = this.allPeople
			.filter(person => {
				console.log({ person });
				return Object.keys(this.query).every(queryKey => {
					let queryString = this.query[queryKey].toLowerCase();
					console.log('filtering allPeople', person[queryKey], queryString);
					return person[queryKey] && person[queryKey].toLowerCase().indexOf(queryString) > -1;
				});
			})
			.sort((left, right) => {
				let diff = 0;
				if (left[activeSortKey] < right[activeSortKey]) {
					diff = -1;
				} else if (left[activeSortKey] === right[activeSortKey]) {
					diff = 0;
				} else if (left[activeSortKey] > right[activeSortKey]) {
					diff = 1;
				}

				if (
					this.isNullOrUndefined(activeSortDirection) ||
					this.isNullOrUndefined(activeSortKey)
				) {
					return 0; // do not sort
				}

				if (activeSortDirection === 'asc') return diff;
				else return diff * -1;
			});
	}

	isNullOrUndefined(subject: any): subject is null | undefined {
		return subject === null || subject === undefined;
	}
}
