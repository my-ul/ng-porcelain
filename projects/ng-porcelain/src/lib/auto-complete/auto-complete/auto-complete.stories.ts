import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color, number } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

//module imports
import { AUTOCOMPLETE_DIRECTIVES, AUTOCOMPLETE_IMPORTS } from '../auto-complete.module';

//import component
import { AutoCompleteComponent } from './auto-complete.component';

//action messages
const SelectedValueEmitted = 'throttled value is';

const usStatesArrayString = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'District Of Columbia',
	'Florida',
	'Georgia',
	'Guam',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming'
];

//create a default
export default {
	title: 'Controls/Auto complete',
	decorators: [
		withKnobs,
		moduleMetadata({
			declarations: AUTOCOMPLETE_DIRECTIVES,
			imports: AUTOCOMPLETE_IMPORTS
		})
	]
};

export const DefaultPresentation = () => {
	return {
		component: AutoCompleteComponent,
		props: {
			AutoCompleteitems: ['Apple', 'Banana', 'Cherry', 'Durian'],
			userEnteredInputBoxValue: action(SelectedValueEmitted),
			debounceTime: number('debounce timer value', 1000),
			AutoCompleteLoadingSpinner: boolean('Loading Spinner', false)
		}
	};
};

//name the story
DefaultPresentation.story = {
	name: 'Default Presentation'
};

export const WithlabelsInput = () => {
	return {
		component: AutoCompleteComponent,
		props: {
			AutoCompleteitems: usStatesArrayString,
			userEnteredInputBoxValue: action(SelectedValueEmitted),
			debounceTime: number('debounce timer value', 1000),
			AutoCompleteLoadingSpinner: boolean('Loading Spinner', false),
			labelNoItemsFound: text('noitemsfound label', 'No items found'),
			labelPlaceholder: text('Placeholder label', 'type here'),
			labelClear: text('clear label', 'clear')
		}
	};
};

//name the story
WithlabelsInput.story = {
	name: 'WithLabelsInput'
};
