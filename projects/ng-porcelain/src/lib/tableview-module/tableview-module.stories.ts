// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color, radios, select } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

import { DynamicColumn } from './../lists/dynamic-header/dynamic-header.component';
import { RACK_DIRECTIVES, RACK_IMPORTS } from './../rack/rack.module';
import { SEARCH_INPUT_DIRECTIVES, SEARCH_INPUT_IMPORTS } from './../search-input/search-input.module';
import { INPUTS_COMPONENTS, INPUTS_IMPORTS } from './../inputs/inputs.module';
import {
	DROPDOWNSYSTEM_DIRECTIVES,
	DROPDOWNSYSTEM_IMPORTS
} from '../dropdown-system/dropdown-system.module';

import * as faker from 'faker';

// Porcelain
import { TABLEVIEW_DIRECTIVES, TABLEVIEW_IMPORTS } from './tableview-module.module';

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

//data

var inactiveColumns: DynamicColumn[] = [];
var activeColumns: DynamicColumn[] = [
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

var generateDummyData = (rate = 50): Person[] => {
	var allPeople: Person[] = [];
	var currentPeople: Person[] = [];
	for (let i = 0; i < 50; i++) {
		allPeople[i] = {
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
	currentPeople = allPeople.slice();
	return currentPeople;
};

export default {
	title: 'TABLE VIEW SYSTEM/Table view Presentations',
	decorators: [
		withKnobs,
		moduleMetadata({
			declarations: [
				...TABLEVIEW_DIRECTIVES,
				...RACK_DIRECTIVES,
				...SEARCH_INPUT_DIRECTIVES,
				...INPUTS_COMPONENTS,
				...DROPDOWNSYSTEM_DIRECTIVES
			],
			imports: [
				...TABLEVIEW_IMPORTS,
				...RACK_IMPORTS,
				...SEARCH_INPUT_IMPORTS,
				...INPUTS_IMPORTS,
				...DROPDOWNSYSTEM_IMPORTS
			]
		})
	]
};

export const tableViewDefaultPresentation = () => {
	return {
		template: `
		<div>
			<p-tableview-header>						 
							<p-tableview-header-item [width]="column.width"
												   *ngFor="let column of getColumnValues()">
								<ng-container>
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
								</ng-container>								
							</p-tableview-header-item>					
			</p-tableview-header>
            <p-tableview-list>
				<p-tableview-list-body>
					<ng-container *ngFor="let person of getListItems();let i = index">
						<p-tableview-list-item [ElementIndex]="i">
							<p-tableview-list-item-cell
														[width]="column.width"
														[padAll]="true"
														*ngFor="let column of getColumnValues()">								
								<ng-container *ngIf="column.key === 'last_name'">
									<strong>{{person.first_name}} {{person.last_name}}</strong>
								</ng-container>
								<ng-container *ngIf="column.key !== 'last_name'">
									<span>{{person[column.key]}}</span>	
								</ng-container>

							</p-tableview-list-item-cell>
						</p-tableview-list-item>
					</ng-container>
				</p-tableview-list-body>
			</p-tableview-list>
		</div>
				`,
		props: {
			getColumnValues() {
				return activeColumns;
			},
			getListItems() {
				var listItems = generateDummyData();
				return listItems;
			}
		}
	};
};

tableViewDefaultPresentation.story = {
	name: 'Default Presentation'
};

//with rack component for dynamic columsn

export const tableViewDynamicColumn = () => {
	var dynamicInactiveColumns: DynamicColumn[] = [];
	var dynamicActiveColumns: DynamicColumn[] = [
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

	return {
		template: `
		<div>
			<p-tableview-header>						 
							<p-tableview-header-item [width]="column.width"
												   *ngFor="let column of getColumnValues()">
								<ng-container>
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
								</ng-container>								
							</p-tableview-header-item>					
			</p-tableview-header>
            <p-tableview-list>
				<p-tableview-list-body>
					<ng-container *ngFor="let person of getListItems();let i = index">
						<p-tableview-list-item [ElementIndex]="i">
							<p-tableview-list-item-cell
														[width]="column.width"
														[padAll]="true"
														*ngFor="let column of getColumnValues()">								
								<ng-container *ngIf="column.key === 'last_name'">
									<strong>{{person.first_name}} {{person.last_name}}</strong>
								</ng-container>
								<ng-container *ngIf="column.key !== 'last_name'">
									<span>{{person[column.key]}}</span>	
								</ng-container>

							</p-tableview-list-item-cell>
						</p-tableview-list-item>
					</ng-container>
				</p-tableview-list-body>
			</p-tableview-list>
		</div>
		<div>
		<porcelain-rack
			[activeItems]="getActiveColumnValues()"
			[inactiveItems]="getInactiveColumnValues()"
			(activeItemsChange)="updateActiveColumnState($event)"
			(inactiveItemsChange)="updateInactiveColumnState($event)"
			[size]="6"
		></porcelain-rack>

		</div>
				`,
		props: {
			getColumnValues() {
				return dynamicActiveColumns;
			},
			getListItems() {
				var listItems = generateDummyData();
				return listItems;
			},
			getActiveColumnValues() {
				return dynamicActiveColumns;
			},
			getInactiveColumnValues() {
				return dynamicInactiveColumns;
			},
			updateActiveColumnState(col: DynamicColumn[]) {
				dynamicActiveColumns = col;
			},
			updateInactiveColumnState(col: DynamicColumn[]) {
				dynamicInactiveColumns = col;
			}
		}
	};
};

const onQueryChange = 'sortHeader Has been clicked';

export const tableViewColumnHeaders = () => {
	var dynamicActiveColumnsHeaders: DynamicColumn[] = [
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
			type: 'searchSort',
			width: 1 / 7
		},
		{
			label: 'Zip',
			key: 'zip',
			locked: false,
			type: 'text',
			width: 1 / 7
		}
	];

	const ColumnKnoboptions = {
		name: 'last_name',
		address: 'address_1',
		city: 'city',
		state: 'state',
		zip: 'zip'
	};
	var activeSortKey = 'last_name';
	var activeSortDirection = 'desc';
	const groupId = 'Preselect Options';

	const SortDirectionKnoboptions = {
		Ascending: 'asc',
		Descending: 'desc'
	};
	const groupId2 = 'preselect Direction';

	return {
		template: `
					<p-tableview-header>						 
							<p-tableview-header-item [width]="column.width"
												   *ngFor="let column of getColumnValues()">
								<ng-container *ngIf="column.type == 'search'">
									<p-tableview-sort-header [label]="column.label"
														   [title]="column.label"
														   [sortKey]="column.key"
														   [activeSortKey]="activeSortKey"
														   [activeSortDirection]="activeSortDirection"
														   (onSortChange)="onSortHeader($event)">
									</p-tableview-sort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'searchSort'">
									<p-tableview-searchSort-header>
										<p-tableview-sort-header [label]="column.label"
															   [title]="column.label"
															   [sortKey]="column.key"
															   [activeSortKey]="activeSortKey"
															   [activeSortDirection]="activeSortDirection"
															   (onSortChange)="onSortHeader($event)">
										</p-tableview-sort-header>
										<porcelain-search-input>
										</porcelain-search-input>
									</p-tableview-searchSort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'text'">
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
								</ng-container>
							</p-tableview-header-item>					
					</p-tableview-header>
				`,
		props: {
			getColumnValues() {
				return dynamicActiveColumnsHeaders;
			},
			onSortHeader: action(onQueryChange),
			activeSortKey: radios('activeColumn', ColumnKnoboptions, activeSortKey, groupId),
			activeSortDirection: select(
				'sortDirection',
				SortDirectionKnoboptions,
				activeSortDirection,
				groupId2
			)
		}
	};
};

export const tableViewColumnLegacySearchSortHeaders = () => {
	var dynamicActiveColumnsHeaders: DynamicColumn[] = [
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
			type: 'searchSort',
			width: 1 / 7
		},
		{
			label: 'Zip',
			key: 'zip',
			locked: false,
			type: 'text',
			width: 1 / 7
		}
	];

	const ColumnKnoboptions = {
		name: 'last_name',
		address: 'address_1',
		city: 'city',
		state: 'state',
		zip: 'zip'
	};
	var activeSortKey = 'last_name';
	var activeSortDirection = 'desc';
	const groupId = 'Preselect Options';

	const SortDirectionKnoboptions = {
		Ascending: 'asc',
		Descending: 'desc'
	};
	const groupId2 = 'preselect Direction';

	return {
		template: `
					<p-tableview-header>						 
							<p-tableview-header-item [width]="column.width"
												   *ngFor="let column of getColumnValues()">
								<ng-container *ngIf="column.type == 'search'">
									<p-tableview-sort-header [label]="column.label"
														   [title]="column.label"
														   [sortKey]="column.key"
														   [activeSortKey]="activeSortKey"
														   [activeSortDirection]="activeSortDirection"
														   (onSortChange)="onSortHeader($event)">
									</p-tableview-sort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'searchSort'">
									<p-tableview-searchSort-header>
										<p-tableview-sort-header [label]="column.label"
															   [title]="column.label"
															   [sortKey]="column.key"
															   [activeSortKey]="activeSortKey"
															   [activeSortDirection]="activeSortDirection"
															   (onSortChange)="onSortHeader($event)">
										</p-tableview-sort-header>
										<porcelain-search-input>
										</porcelain-search-input>
									</p-tableview-searchSort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'text'">
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
								</ng-container>
							</p-tableview-header-item>					
					</p-tableview-header>
				`,
		props: {
			getColumnValues() {
				return dynamicActiveColumnsHeaders;
			},
			onSortHeader: action(onQueryChange),
			activeSortKey: radios('activeColumn', ColumnKnoboptions, activeSortKey, groupId),
			activeSortDirection: select(
				'sortDirection',
				SortDirectionKnoboptions,
				activeSortDirection,
				groupId2
			)
		}
	};
};

export const tableViewColumnSearchSortHeaders = () => {
	var dynamicActiveColumnsHeaders: DynamicColumn[] = [
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
			type: 'searchSort',
			width: 1 / 7
		},
		{
			label: 'Zip',
			key: 'zip',
			locked: false,
			type: 'text',
			width: 1 / 7
		}
	];

	const ColumnKnoboptions = {
		name: 'last_name',
		address: 'address_1',
		city: 'city',
		state: 'state',
		zip: 'zip'
	};
	var activeSortKey = 'last_name';
	var activeSortDirection = 'desc';
	const groupId = 'Preselect Options';

	const SortDirectionKnoboptions = {
		Ascending: 'asc',
		Descending: 'desc'
	};
	const groupId2 = 'preselect Direction';

	return {
		template: `
					<p-tableview-header>						 
							<p-tableview-header-item [width]="column.width"
												   *ngFor="let column of getColumnValues()">
								<ng-container *ngIf="column.type == 'search'">
									<p-tableview-sort-header [label]="column.label"
														   [title]="column.label"
														   [sortKey]="column.key"
														   [activeSortKey]="getActiveSortKey()"
														   [activeSortDirection]="getSortDirection()"
														   (onSortChange)="onSortHeader($event)">
									</p-tableview-sort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'searchSort'">
									<p-tableview-searchSort-header>
										<p-tableview-sort-header [label]="column.label"
															   [title]="column.label"
															   [sortKey]="column.key"
															   [activeSortKey]="getActiveSortKey()"
															   [activeSortDirection]="getSortDirection()"
															   (onSortChange)="onSortHeader($event)">
										</p-tableview-sort-header>
										<p-search-input>
										</p-search-input>
									</p-tableview-searchSort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'text'">
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
								</ng-container>
							</p-tableview-header-item>					
					</p-tableview-header>
				`,
		props: {
			getColumnValues() {
				return dynamicActiveColumnsHeaders;
			},
			getActiveSortKey() {
				return activeSortKey;
			},
			getSortDirection() {
				return activeSortDirection;
			},
			onSortHeader(data) {
				const [sortKey, sortDirection] = data;
				if (null === sortDirection) {
					activeSortKey = '';
					activeSortDirection = 'desc';
				} else {
					activeSortKey = sortKey;
					activeSortDirection = sortDirection;
				}
				action(onQueryChange);
			}
		}
	};
};

export const tableViewColumnDropdDownSearchSortHeaders = () => {
	var dynamicActiveColumnsHeaders: DynamicColumn[] = [
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
			type: 'searchSort',
			width: 1 / 7
		},
		{
			label: 'Zip',
			key: 'zip',
			locked: false,
			type: 'text',
			width: 1 / 7
		}
	];

	const ColumnKnoboptions = {
		name: 'last_name',
		address: 'address_1',
		city: 'city',
		state: 'state',
		zip: 'zip'
	};
	var activeSortKey = 'last_name';
	var activeSortDirection = 'desc';
	const groupId = 'Preselect Options';

	const SortDirectionKnoboptions = {
		Ascending: 'asc',
		Descending: 'desc'
	};
	const groupId2 = 'preselect Direction';

	var options: {
		'keith.carmody': {
			value: 'keith.carmody';
			name: 'Keith Carmody';
			group: 'Northbrook, IL';
		};
		'brad.kovach': { value: 'brad.kovach'; name: 'Brad Kovach'; group: 'Laramie, WY' };
		'arjun.rapaka': { value: 'arjun.rapaka'; name: 'Arjun Rapaka'; group: 'Canada' };
		'matt.gardner': {
			value: 'matt.gardner';
			name: 'Matt Gardner';
			group: 'Laramie, WY';
		};
		'richard.heinig': {
			value: 'richard.heinig';
			name: 'Richard Heinig';
			group: 'Laramie, WY';
		};
	};

	var searchText = '';

	return {
		template: `
					<p-tableview-header>						 
							<p-tableview-header-item [width]="column.width"
												   *ngFor="let column of getColumnValues()">
								<ng-container *ngIf="column.type == 'search'">
									<p-tableview-sort-header [label]="column.label"
														   [title]="column.label"
														   [sortKey]="column.key"
														   [activeSortKey]="getActiveSortKey()"
														   [activeSortDirection]="getSortDirection()"
														   (onSortChange)="onSortHeader($event)">
									</p-tableview-sort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'searchSort'">
									<p-tableview-searchSort-header>
										<p-tableview-sort-header [label]="column.label"
															   [title]="column.label"
															   [sortKey]="column.key"
															   [activeSortKey]="getActiveSortKey()"
															   [activeSortDirection]="getSortDirection()"
															   (onSortChange)="onSortHeader($event)">
										</p-tableview-sort-header>
										<porcelain-dropdown-select [(value)]="value">
											<porcelain-dropdown-selectedtemplate>
												<porcelain-dropdown-inputbox (queryChange)="filterOptions($event)"></porcelain-dropdown-inputbox>
											</porcelain-dropdown-selectedtemplate>                            
											<porcelain-dropdown-selectoption [value]="option.value" *ngFor="let option of getValues(options)">
												<strong>{{option.name}}</strong>&nbsp;&nbsp;<span style="font-size: 90%; color: #888">{{option.group}}</span><br>
															{{option.value}}@ul.com
											</porcelain-dropdown-selectoption>
										</porcelain-dropdown-select>
									</p-tableview-searchSort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'text'">
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
								</ng-container>
							</p-tableview-header-item>					
					</p-tableview-header>
				`,
		props: {
			getColumnValues() {
				return dynamicActiveColumnsHeaders;
			},
			getActiveSortKey() {
				return activeSortKey;
			},
			getSortDirection() {
				return activeSortDirection;
			},
			onSortHeader(data) {
				const [sortKey, sortDirection] = data;
				if (null === sortDirection) {
					activeSortKey = '';
					activeSortDirection = 'desc';
				} else {
					activeSortKey = sortKey;
					activeSortDirection = sortDirection;
				}
				action(onQueryChange);
			},
			getValues(dict) {
				return options;
			},
			searchText: '',
			filterOptions: action('user entered value')
		}
	};
};

export const tableViewColumnDropdDownLegacySearchHeaders = () => {
	var dynamicActiveColumnsHeaders: DynamicColumn[] = [
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
			type: 'searchSort',
			width: 1 / 7
		},
		{
			label: 'Zip',
			key: 'zip',
			locked: false,
			type: 'text',
			width: 1 / 7
		}
	];

	const ColumnKnoboptions = {
		name: 'last_name',
		address: 'address_1',
		city: 'city',
		state: 'state',
		zip: 'zip'
	};
	var activeSortKey = 'last_name';
	var activeSortDirection = 'desc';
	const groupId = 'Preselect Options';

	const SortDirectionKnoboptions = {
		Ascending: 'asc',
		Descending: 'desc'
	};
	const groupId2 = 'preselect Direction';

	var searchText = '';
	var listItems = [];

	return {
		template: `
					<p-tableview-header>						 
							<p-tableview-header-item [width]="column.width"
												   *ngFor="let column of getColumnValues()">
								<ng-container *ngIf="column.type == 'search'">
									<p-tableview-sort-header [label]="column.label"
														   [title]="column.label"
														   [sortKey]="column.key"
														   [activeSortKey]="getActiveSortKey()"
														   [activeSortDirection]="getSortDirection()"
														   (onSortChange)="onSortHeader($event)">
									</p-tableview-sort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'searchSort'">
									<p-tableview-searchSort-header>
										<p-tableview-sort-header [label]="column.label"
															   [title]="column.label"
															   [sortKey]="column.key"
															   [activeSortKey]="getActiveSortKey()"
															   [activeSortDirection]="getSortDirection()"
															   (onSortChange)="onSortHeader($event)">
										</p-tableview-sort-header>
										<porcelain-dropdown-select [(value)]="value">
											<porcelain-dropdown-selectedtemplate>
												<porcelain-search-input>
												</porcelain-search-input>
											</porcelain-dropdown-selectedtemplate>                            
											<porcelain-dropdown-selectoption [value]="option.first_name" *ngFor="let option of getValues()">
												<strong>{{option.first_name}}</strong>&nbsp;&nbsp;<span style="font-size: 90%; color: #888">{{option.last_name}}</span><br>
															{{option.email}}
											</porcelain-dropdown-selectoption>
										</porcelain-dropdown-select>
									</p-tableview-searchSort-header>
								</ng-container>
								<ng-container *ngIf="column.type == 'text'">
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
								</ng-container>
							</p-tableview-header-item>					
					</p-tableview-header>
				`,
		props: {
			getColumnValues() {
				return dynamicActiveColumnsHeaders;
			},
			getActiveSortKey() {
				return activeSortKey;
			},
			getSortDirection() {
				return activeSortDirection;
			},
			onSortHeader(data) {
				const [sortKey, sortDirection] = data;
				if (null === sortDirection) {
					activeSortKey = '';
					activeSortDirection = 'desc';
				} else {
					activeSortKey = sortKey;
					activeSortDirection = sortDirection;
				}
				action(onQueryChange);
			},
			getValues() {
				var data = generateDummyData(5);
				return data;
			},
			searchText: '',
			filterOptions: action('user entered value')
		}
	};
};
