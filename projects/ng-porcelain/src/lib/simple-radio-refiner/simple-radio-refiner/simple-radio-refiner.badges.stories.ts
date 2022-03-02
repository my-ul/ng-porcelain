// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

// Utilities
import * as _ from 'underscore';
import * as lipsum from 'fast-lorem-ipsum';

// Porcelain
import { SimpleOption } from '../../shared/types/Options/SimpleOption';
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';

// Subject of tests
import { SimpleRadioRefinerComponent } from './simple-radio-refiner.component';
import { SIMPLE_RADIO_REFINER_IMPORTS } from '../simple-radio-refiner.module';

export default {
	title: 'Refiner System/Simple Refiner/Badges',
	decorators: [withNotes]
};

export const OptionsWithLongLabelValuesAndNumericBadges = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		isOpen: true,
		onRefinerChange: action('Refiner onRefinerChange fired'),
		refiner: new SimpleRefinerDefinition({
			slug: 'optionsWithBadges',
			title: 'Options with Badges',
			options: {
				option1: new SimpleOption({
					label: `Option 1. ${lipsum('50w')}`,
					slug: 'option1',
					badge: 1234
				}),
				option2: new SimpleOption({
					label: `Option 2. ${lipsum('50w')}`,
					slug: 'option2',
					badge: 2341
				}),
				option3: new SimpleOption({
					label: `Option 3. ${lipsum('50w')}`,
					slug: 'option3',
					badge: 3412
				}),
				option4: new SimpleOption({
					label: `Option 4. ${lipsum('50w')}`,
					slug: 'option4',
					badge: 4123
				})
			}
		})
	}
});

OptionsWithLongLabelValuesAndNumericBadges.story = {
	name: 'Options with long `label` values and numeric badges',

	parameters: {
		info: {
			markdown: `Options can have very long labels.  They will be truncated when the line is too long.`
		}
	}
};

export const TextBadges = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		isOpen: true,
		onRefinerChange: action('Refiner onRefinerChange fired'),
		refiner: new SimpleRefinerDefinition({
			slug: 'optionsWithBadges',
			title: 'Options with Badges',
			options: {
				option1: new SimpleOption({
					label: `Velma D. Talbot`,
					slug: 'option1',
					badge: 'UL'
				}),
				option2: new SimpleOption({
					label: `Anthony Halls`,
					slug: 'option2',
					badge: 'IKEA'
				}),
				option3: new SimpleOption({
					label: `Pam Hastings`,
					slug: 'option3',
					badge: 'IBM'
				}),
				option4: new SimpleOption({
					label: `Latoya Sanders`,
					slug: 'option4',
					badge: 'AT&T'
				})
			}
		})
	}
});
