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
import { usStatesHash, usStatesFull } from './simple-radio-refiner.stories';

export default {
	title: 'Refiner System/Simple Refiner/Defaults',
	decorators: [withNotes, withKnobs, withNotes]
};

export const SetDefaultShownOptionsByShowCountComponentProperty = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		refiner: new SimpleRefinerDefinition({
			slug: 'customShowCount',
			title: 'United States (showing 15 on load)',
			options: usStatesHash
		}),
		showCount: 15,
		onRefinerChange: action('Option Refiner change')
	}
});

SetDefaultShownOptionsByShowCountComponentProperty.story = {
	name: 'Set default shown options by `showCount` component property.',
	parameters: {}
};

export const SetDefaultShownOptionsByShowCountRefinerProperty = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		refiner: new SimpleRefinerDefinition({
			slug: 'customShowCount',
			title: 'United States (showing 15 on load)',
			options: usStatesHash,
			showCount: 15
		}),
		onRefinerChange: action('Option Refiner change')
	}
});

SetDefaultShownOptionsByShowCountRefinerProperty.story = {
	name: 'Set default shown options by `showCount` refiner property.',
	parameters: {}
};

export const SetValueWithRefinerSelected = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		onRefinerChange: action('Refiner changed'),
		refiner: new SimpleRefinerDefinition({
			slug: 'visitedStates',
			title: "States I've Visited (default selections by refiner definition)",
			selected: ['AL', 'AK', 'AZ', 'UT', 'WA', 'MT', 'ID', 'WY', 'IL'],
			options: usStatesFull
		})
	}
});

SetValueWithRefinerSelected.story = {
	name: 'Set value with `Refiner.selected`'
};

export const SetValueWithOptionIsSelected = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		onRefinerChange: action('Refiner changed'),
		refiner: new SimpleRefinerDefinition({
			slug: 'visitedStates',
			title: "States I've Visited (default selections by option.isSelected properties)",
			options: _.mapObject(usStatesFull, state => {
				state.isSelected = _.contains(
					['AL', 'AK', 'AZ', 'UT', 'WA', 'MT', 'ID', 'WY', 'IL'],
					state.slug
				);
				return state;
			})
		})
	}
});

SetValueWithOptionIsSelected.story = {
	name: 'Set value with `option.isSelected`'
};

export const CollapsedWithComponentIsOpenProperty = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		isOpen: false,
		onRefinerChange: action('Refiner changed'),
		refiner: new SimpleRefinerDefinition({
			slug: 'closedByDefault',
			title: 'Closed by component.isOpen property (click to open)',
			options: usStatesFull
		})
	}
});

CollapsedWithComponentIsOpenProperty.story = {
	name: 'Collapsed with `component.isOpen` property'
};

export const CollapsedWithOptionRefinerIsOpenProperty = () => ({
	component: SimpleRadioRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_RADIO_REFINER_IMPORTS
	},
	props: {
		onRefinerChange: action('Refiner changed'),
		refiner: new SimpleRefinerDefinition({
			slug: 'closedByDefault',
			title: 'Closed by refiner.isOpen property (click to open)',
			options: usStatesFull,
			isOpen: false
		})
	}
});

CollapsedWithOptionRefinerIsOpenProperty.story = {
	name: 'Collapsed with `OptionRefiner.isOpen` property'
};
