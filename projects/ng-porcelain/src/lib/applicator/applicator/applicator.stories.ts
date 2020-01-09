import { APPLICATOR_DIRECTIVES } from '../applicator.module';
// Storybook
import { action } from '@storybook/addon-actions';
import { storiesOf, moduleMetadata } from '@storybook/angular';

// Moment
import * as _moment from 'moment';
const moment = _moment;

// Porcelain
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';
import { i18nDateOptions } from '../../shared/utilities/i18n/i18nDateOptions/i18nDateOptions';

import { APPLICATOR_IMPORTS } from '../applicator.module';
import { ApplicatorComponent } from './applicator.component';

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

storiesOf('Refiners/Applicator Component', module)
	.addDecorator(
		moduleMetadata({
			declarations: APPLICATOR_DIRECTIVES,
			imports: APPLICATOR_IMPORTS
		})
	)
	.add('Default (no props)', () => {
		return {
			component: ApplicatorComponent,
			props: {
				allowIncompleteEmit: false,
				onApply: action('Applicators update'),
				refiners: [dateRefiner, simpleRefiner, anotherSimpleRefiner]
			}
		};
	})
	.add('Provide default value behavior', () => {
		return {
			component: ApplicatorComponent,
			props: {
				onApply: action('Applicators update'),
				refiners: [simpleRefiner, anotherSimpleRefiner, dateRefiner],
				defaultValues: {
					simpleRefiner: ['al', 'az'],
					anotherSimpleRefiner: ['ak'],
					dateRefiner: {
						optionSlug: 'custom',
						from: '1989-02-14',
						to: '1989-11-06'
					}
				}
			}
		};
	})
	.add('Throws errors with invalid refiners (see console)', () => {
		return {
			component: ApplicatorComponent,
			props: {
				onApply: action('Applicators update'),
				refiners: [{}, new Date(), new RegExp('invalid refiner')]
			}
		};
	})
	.add('Set applyOnInit to false', () => {
		return {
			component: ApplicatorComponent,
			props: {
				onApply: action('Applicators update'),
				refiners: [simpleRefiner, dateRefiner, anotherSimpleRefiner],
				applyOnInit: false
			}
		};
	});
