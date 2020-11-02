import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

//module imports

import { SELECT_DROPDOWN_DIRECTIVES, SELECT_DROPDOWN_IMPORTS } from '../select-dropdown.module';

//import component

import { SelectDropdownComponent1 } from './select-dropdown.component';

//action messages
const SelectedValueEmitted = 'Value is selected';

//create a default
export default {
	title: 'MultiSelect/Select Dropdown with Search',
	decorators: [
		withKnobs,
		moduleMetadata({
			declarations: SELECT_DROPDOWN_DIRECTIVES,
			imports: SELECT_DROPDOWN_IMPORTS
		})
	]
};

export const DefaultPresentation = () => {
	return {
		component: SelectDropdownComponent1,
		props: {}
	};
};

//name the story
DefaultPresentation.story = {
	name: 'Default presentation'
};

export const NormalArrayInput = () => {
	return {
		component: SelectDropdownComponent1,
		props: {
			items: [
				'carrot',
				'beans',
				'capsicum',
				'onion',
				'potato',
				'cabbage',
				'beetroot',
				'tomato',
				'green chilli',
				'grean peas'
			],
			Placeholder: 'type here to search in the box in array list',
			SelectedValue: action(SelectedValueEmitted)
		}
	};
};

//name the story
NormalArrayInput.story = {
	name: 'Normal Array Input'
};

export const ArrayOfobjectsInput = () => {
	return {
		component: SelectDropdownComponent1,
		props: {
			items: [
				{ id: '5001', type: 'None' },
				{ id: '5002', type: 'Glazed' },
				{ id: '5005', type: 'Sugar' },
				{ id: '5007', type: 'Powdered Sugar' },
				{ id: '5006', type: 'Chocolate with Sprinkles' },
				{ id: '5003', type: 'Chocolate' },
				{ id: '5004', type: 'Maple' }
			],
			Placeholder: 'type here to search in the box in array of objects',
			isArrayobj: true,
			fieldName: 'type',
			SelectedValue: action(SelectedValueEmitted)
		}
	};
};

//name the story
ArrayOfobjectsInput.story = {
	name: 'Array of Objects Input'
};
