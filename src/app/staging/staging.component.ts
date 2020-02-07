import { Component, OnInit } from '@angular/core';

import {
	i18nDateOptions,
	DateRefinerDefinition,
	SimpleRefinerDefinition
} from '../../../projects/ng-porcelain/src/public_api';

import * as _moment from 'moment';
const moment = _moment;

import { isEqual } from 'lodash-es';

type AnyRefinerDefinition = DateRefinerDefinition | SimpleRefinerDefinition;
@Component({
	selector: 'app-staging',
	templateUrl: './staging.component.html',
	styleUrls: ['./staging.component.scss']
})
export class StagingComponent implements OnInit {
	staged = {
		query: ''
	};

	applied = {};

	initial = {};

	refiners: AnyRefinerDefinition[];

	constructor() {}

	canApply(): boolean {
		return !isEqual(this.staged, this.applied);
	}

	canReset(): boolean {
		return !isEqual(this.staged, this.initial);
	}

	applyIdx: number = -1;

	apply() {
		this.applyIdx++;
		// if( this.applyIdx == 0 ) {
		//   this.initial = Object.assign({}, this.staged);
		// }
		this.applied = Object.assign({}, this.staged);
	}

	ngOnInit() {
		this.refiners = [
			new DateRefinerDefinition({
				slug: 'dateRefiner',
				title: 'Date Refiner',
				value: {
					to: moment(new Date())
						.utc()
						.endOf('year')
						.toDate(),
					optionSlug: 'custom',
					from: moment(new Date())
						.utc()
						.startOf('year')
						.toDate()
				},
				options: i18nDateOptions()
			}),
			new SimpleRefinerDefinition({
				slug: 'simpleRefiner',
				title: 'Simple Refiner (all selected)',
				selected: ['al', 'ak', 'az'],
				options: {
					al: 'Alabama',
					ak: 'Alaska',
					az: 'Arizona'
				}
			})
		];
	}
}
