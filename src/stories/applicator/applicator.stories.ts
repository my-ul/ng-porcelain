// Storybook
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';

// Moment
import * as _moment from 'moment';
const moment = _moment;

// Porcelain
import {
	i18nDateOptions,
	SimpleRefinerDefinition,
	DateRefinerDefinition
} from './../../../projects/ng-porcelain/src/lib/shared/';
import { APPLICATOR_IMPORTS } from './../../../projects/ng-porcelain/src/lib/applicator/applicator.module';
import { ApplicatorComponent } from './../../../projects/ng-porcelain/src/lib/applicator/applicator/applicator.component';

storiesOf('Applicator Component', module).add('Default (no props)', () => {
	const simpleRefiner = new SimpleRefinerDefinition({
		slug: 'simpleRefiner',
		title: 'Simple Refiner (all selected)',
		selected: ['al', 'ak', 'az'],
		options: {
			al: 'Alabama',
			ak: 'Alaska',
			az: 'Arizona'
		}
	});

	const anotherSimpleRefiner = new SimpleRefinerDefinition({
		slug: 'anotherSimpleRefiner',
		title: 'Another Simple Refiner',
		selected: ['al', 'az'],
		options: {
			al: 'Alabama',
			ak: 'Alaska',
			az: 'Arizona'
		}
	});
	const dateRefiner = new DateRefinerDefinition({
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
