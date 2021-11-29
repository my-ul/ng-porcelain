import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

//module imports
import { SEARCHDROPDOWN_DIRECTIVES, SEARCHDROPDOWN_IMPORTS } from '../search-dropdown.module';

//import component
import { SearchDropdownComponent } from './search-dropdown.component';

//action messages
const SelectedValueEmitted = 'Value is selected';
const clearEventEmitted = 'Clear Event Emitted';
//create a default
export default {
	title: 'Search Dropdown/Dropdown Search Input',
	decorators: [
		withKnobs,
		moduleMetadata({
			declarations: SEARCHDROPDOWN_DIRECTIVES,
			imports: SEARCHDROPDOWN_IMPORTS
		})
	]
};

export const DefaultPresentation = () => {
	let value = '';
	let actionCB = action(SelectedValueEmitted);
	return {
		component: SearchDropdownComponent,
		props: {
			items: ['Apple', 'Banana', 'Cherry', 'Durian'],
			value: 'Apple',
			valueChange: function(newValue) {
				value = newValue;
				actionCB(value);
			},
			clearEvent: function() {
				actionCB();
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
		component: SearchDropdownComponent,
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

export const ArrayOfComplexobjectsInput = () => {
	return {
		component: SearchDropdownComponent,
		props: {
			items: [
				{
					psn: '15472',
					Comname: 'Sterling LLC',
					CompleteAddress: '2763 Star Plaza Rd, Building A, Chicago IL 60660',
					item1: '<div class="topchange">15472 | Sterling LLC</div>',
					item2:
						'<div class="colourchange"> 2763 Star Plaza Rd, Building A, Chicago IL 60660 </div>'
				},
				{
					psn: '15473',
					Comname: 'Sterling Parts Unlimited, LLC',
					CompleteAddress: '3286 Star Plaza Rd, Building D, Chicago IL 60660',
					item1: '<div class="topchange">15473 | Sterling Parts Unlimited, LLC</div>',
					item2:
						'<div class="colourchange"> 3286 Star Plaza Rd, Building D, Chicago IL 60660 </div>'
				},
				{
					psn: '15477',
					Comname: 'Sterling LLC, copy',
					CompleteAddress: '2993 Star Plaza Rd, Suite 203, Chicago IL 60660',
					item1: '<div class="topchange">15477 | Sterling LLC, copy</div>',
					item2:
						'<div class="colourchange" > 2993 Star Plaza Rd, Suite 203, Chicago IL 60660 </div>'
				},
				{
					psn: '764479',
					Comname: 'Hellotester',
					CompleteAddress: 'neyveli,India',
					item1: '<div class="topchange">764479 | Hellotester</div>',
					item2: '<div class="colourchange" > neyveli,India </div>'
				}
			],
			placeholder: 'type here to search in the box in array of objects',
			isObjectArray: true,
			isComplexArray: true,
			isConfirmationNeeded: true,
			isCleared: true,
			type: 'item1',
			types: 'item2',
			value: null,
			query: '15472',
			valueChange: action(SelectedValueEmitted),
			clearEvent: action(clearEventEmitted)
		}
	};
};

//name the story
ArrayOfComplexobjectsInput.story = {
	name: 'Array of Complex Objects Input'
};
export const ArrayOfobjectsInput = () => {
	return {
		component: SearchDropdownComponent,
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
