import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';

import * as _moment from 'moment';
const moment = _moment;

// Subjects of the stories.
import {
	DateRefiner,
	i18nDateOptions,
	SimpleRefiner
} from './../../../projects/ng-porcelain/src/lib/shared/';
import { APPLICATOR_IMPORTS } from './../../../projects/ng-porcelain/src/lib/applicator/applicator.module';
import { ApplicatorComponent } from './../../../projects/ng-porcelain/src/lib/applicator/applicator/applicator.component';

storiesOf('Applicator Component', module).add('Default (no props)', () => {
	const simpleRefiner = new SimpleRefiner({
		slug: 'simpleRefiner',
		title: 'Simple Refiner (all selected)',
		selected: ['al', 'ak', 'az'],
		options: {
			al: 'Alabama',
			ak: 'Alaska',
			az: 'Arizona'
		}
	});

	const anotherSimpleRefiner = new SimpleRefiner({
		slug: 'anotherSimpleRefiner',
		title: 'Another Simple Refiner',
		selected: ['al', 'az'],
		options: {
			al: 'Alabama',
			ak: 'Alaska',
			az: 'Arizona'
		}
	});
	const dateRefiner = new DateRefiner({
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
	});

	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [simpleRefiner, anotherSimpleRefiner, dateRefiner]
		},
		moduleMetadata: {
			imports: APPLICATOR_IMPORTS
		}
	};
});
