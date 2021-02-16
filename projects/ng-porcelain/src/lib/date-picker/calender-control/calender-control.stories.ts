import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { moduleMetadata } from '@storybook/angular';

//module imports
import { DATE_PICKER_DIRECTIVES, DATE_PICKER_IMPORTS } from '../date-picker.module';

//import component
import { CalenderControlComponent } from './calender-control.component';

// Utilities
import * as _moment from 'moment';

const moment = _moment;

//action messages
const SelectedValueEmitted = 'selected Date is';

//create a default
export default {
	title: 'Controls/DatePicker',
	decorators: [
		withKnobs,
		moduleMetadata({
			declarations: DATE_PICKER_DIRECTIVES,
			imports: DATE_PICKER_IMPORTS
		})
	]
};

export const DefaultPresentation = () => {
	return {
		component: CalenderControlComponent,
		props: {
			SelectedTime: action(SelectedValueEmitted)
		}
	};
};
DefaultPresentation.story = {
	name: 'Normal Date picker'
};
