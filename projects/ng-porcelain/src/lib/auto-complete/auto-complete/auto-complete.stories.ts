import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color, number } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

//module imports
import { AUTOCOMPLETE_DIRECTIVES, AUTOCOMPLETE_IMPORTS } from '../auto-complete.module';

//import component
import { AutoCompleteComponent } from './auto-complete.component';

//action messages
const SelectedValueEmitted = 'throttled value is';

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
