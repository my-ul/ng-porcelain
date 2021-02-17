import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { moduleMetadata } from '@storybook/angular';

//module imports
import { DATE_PICKER_DIRECTIVES, DATE_PICKER_IMPORTS } from '../date-picker.module';

//import component
import { datePickerComponent } from './date-picker.component';

// Utilities
import * as _moment from 'moment';

const moment = _moment;

//action messages
const SelectedValueEmitted = 'selected Date is';
const SelectedFormattedValue = 'formatted value of date is';

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
		component: datePickerComponent,
		props: {
			labelClear: text('clear title text', 'clear'),
			labelSelect: text('select title text', 'select date'),
			placeHolderValue: text('Place Holder Value', 'YYYY-MM-DD'),
			border: boolean('border', true),
			userSelectedDate: action(SelectedValueEmitted),
			selectedFormatDate: action(SelectedFormattedValue)
		}
	};
};
DefaultPresentation.story = {
	name: 'Normal Date picker'
};

/*
export const PreselecteDates = () => {
	return {
		component: datePickerComponent,
		props: {
			labelClear: text('clear title text', 'clear'),
			labelSelect: text('select title text', 'select date'),
			placeHolderValue: text('Place Holder Value', 'YYYY-MM-DD'),
			preselectedDate:text('preselected Date','2021-01-14'),
			border: boolean('border', true),
			userSelectedDate: action(SelectedValueEmitted),
			selectedFormatDate: action(SelectedFormattedValue)
		}
	};
};

PreselecteDates.story = {
	name: 'Date picker with PreselectValues'
};
*/
