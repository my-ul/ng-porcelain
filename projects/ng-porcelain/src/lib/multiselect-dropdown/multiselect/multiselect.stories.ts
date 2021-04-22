import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color, array } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

import { MultiSelectComponent } from './multiselect.component';
import { MULTISELECT_DIRECTIVES, MULTISELECT_IMPORTS } from '../multiselect.module';

//action messages
const selectedValueString = 'Value in string is selected';
const selectedArray = 'value in Array ';

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

export const DefaultPresentation = () => {
	return {
		component: MultiSelectComponent,
		props: {
			listItems: [
				{ id: 4888949, label: 'Alabama', type: 'AL', isSelected: true },
				{ id: 4888349, label: 'Alaska', type: 'AK', isSelected: true },
				{ id: 4843949, label: 'Arizona', type: 'AZ', isSelected: true },
				{ id: 4812949, label: 'Arkansas', type: 'AR', isSelected: false },
				{ id: 4846949, label: 'California', type: 'CA', isSelected: false },
				{ id: 4812349, label: 'Colorado', type: 'CO', isSelected: true },
				{ id: 4888679, label: 'Connecticut', type: 'CN', isSelected: false },
				{ id: 4888309, label: 'Florida', type: 'FL', isSelected: true },
				{ id: 4078949, label: 'Georgia', type: 'GE', isSelected: true },
				{ id: 4881972, label: 'Hawaii', type: 'HI', isSelected: false },
				{ id: 4888980, label: 'Idaho', type: 'ID', isSelected: true },
				{ id: 4098949, label: 'Illinois', type: 'IL', isSelected: false },
				{ id: 4068949, label: 'Indiana', type: 'IN', isSelected: true },
				{ id: 4068949, label: 'Iowa', type: 'IA', isSelected: false },
				{ id: 4018949, label: 'Kansas', type: 'KA', isSelected: false },
				{ id: 4158949, label: 'Kentucky', type: 'KY', isSelected: true },
				{ id: 4178949, label: 'Louisiana', type: 'LA', isSelected: false }
			],
			LabelProp: text('label prop', 'label'),
			selectedLabelPlaceholder: text('labelplaceholder', 'please select any state'),
			selectedLabel: text('starting Placeholder value', 'please select state to continue'),
			userEnteredInputBoxValue: action(selectedValueString),
			SelectedArrayItems: action(selectedArray)
		}
	};
};

DefaultPresentation.story = { name: 'Simple Multiselect Dropdown' };
