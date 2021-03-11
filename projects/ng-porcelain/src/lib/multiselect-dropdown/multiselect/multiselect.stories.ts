import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

import { MultiSelectComponent } from './multiselect.component';
import { MULTISELECT_DIRECTIVES, MULTISELECT_IMPORTS } from '../multiselect.module';

export default {
	title: 'MULTI SELECT/Simple Multiselect Dropdown',

	decorators: [
		withKnobs, // Create Synthetic Module
		moduleMetadata({
			declarations: MULTISELECT_DIRECTIVES,
			imports: MULTISELECT_IMPORTS
		})
	]
};

export const Default = () => {
	return {
		component: MultiSelectComponent,
		props: {
			label: 'To:',
			value: null,
			getValues(dict) {
				return Object.values(dict);
			},
			options: {
				'keith.carmody': {
					value: 'keith.carmody',
					name: 'Keith Carmody',
					group: 'Northbrook, IL'
				},
				'brad.kovach': { value: 'brad.kovach', name: 'Brad Kovach', group: 'Laramie, WY' },
				'arjun.rapaka': { value: 'arjun.rapaka', name: 'Arjun Rapaka', group: 'Canada' },
				'matt.gardner': {
					value: 'matt.gardner',
					name: 'Matt Gardner',
					group: 'Laramie, WY'
				},
				'richard.heinig': {
					value: 'richard.heinig',
					name: 'Richard Heinig',
					group: 'Laramie, WY'
				}
			},
			onSelectedValueChange: action('new option selected')
		}
	};
};

Default.story = { name: 'Simple Multiselect Dropdown' };
