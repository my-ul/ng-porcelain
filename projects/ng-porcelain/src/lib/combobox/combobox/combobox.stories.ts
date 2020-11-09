import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

//module imports
import { COMBOBOX_DIRECTIVES, COMBOBOX_IMPORTS } from '../combobox.module';

//import component
import { ComboboxComponent } from './combobox.component';

//action messages
const SelectedValueEmitted = 'Value is selected';

//create a default
export default {
	title: 'Controls/Combobox Input',
	decorators: [
		withKnobs,
		moduleMetadata({
			declarations: COMBOBOX_DIRECTIVES,
			imports: COMBOBOX_IMPORTS
		})
	]
};

export const DefaultPresentation = () => {
	let value = '';
	let actionCB = action(SelectedValueEmitted);
	return {
		component: ComboboxComponent,
		props: {
			items: ['Apple', 'Banana', 'Cherry', 'Durian'],
			value: 'Apple',
			valueChange: function(newValue) {
				value = newValue;
				actionCB(value);
			}
		}
	};
};

//name the story
DefaultPresentation.story = {
	name: 'Default Presentation'
};

export const NormalArrayInput = () => {
	return {
		component: ComboboxComponent,
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
			valueChange: action(SelectedValueEmitted)
		}
	};
};

//name the story
NormalArrayInput.story = {
	name: 'Normal Array Input'
};

export const ArrayOfobjectsInput = () => {
	return {
		component: ComboboxComponent,
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
			placeholder: 'type here to search in the box in array of objects',
			isObjectArray: true,
			labelProp: 'type',
			value: null,
			valueChange: action(SelectedValueEmitted)
		}
	};
};

//name the story
ArrayOfobjectsInput.story = {
	name: 'Array of Objects Input'
};
