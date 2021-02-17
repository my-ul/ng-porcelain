import { Component, OnInit, Input, Inject, Output, EventEmitter, HostBinding } from '@angular/core';
import * as moment from 'moment';
import { IMyOptions, IMyDateModel, IMyDate } from 'angular-mydatepicker';

import { faCalendarAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'calender-control',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss']
})
export class datePickerComponent implements OnInit {
	@Input() placeHolderValue: string = 'YYYY-MM-DD';

	/**
	 * Icon of chevron pointing down, used for the dropdown toggle.
	 */
	@Input() datePickerIcon = faCalendarAlt;

	/**
	 * Icon for the clear button
	 */
	@Input() clearIcon = faTimesCircle;

	/**
	 * Accessibility label for the clear button.
	 */
	@Input() labelClear: string = 'Clear';

	/**
	 * Accessibility label for dropdown icon.
	 */
	@Input() labelSelect: string = 'Select';

	/**
	 * Controls the display of the border.  Set to false to eliminate borders.
	 */
	@HostBinding('class.datePicker--has-border')
	@Input()
	border: boolean = true;

	/**
	 * Color for the clear icon.  By default, #9dacba
	 */
	@Input() clearIconColor: string = '#9dacba';

	/**
	 * Color for the clear icon.  By default, #9dacba
	 */
	@Input() datePickerIconColor: string = 'unset';

	/**
	 * if preselected date is given then this will be set
	 */
	@Input() preselectedDate: string = '';

	/**
	 *optional datepicker input
	 */
	@Input() datePickerOptions: IMyOptions = {
		dateFormat: 'yyyy-mm-dd',
		dayLabels: {
			su: 'Sun',
			mo: 'Mon',
			tu: 'Tue',
			we: 'Wed',
			th: 'Thu',
			fr: 'Fri',
			sa: 'Sat'
		},
		monthLabels: {
			1: 'Jan',
			2: 'Feb',
			3: 'Mar',
			4: 'Apr',
			5: 'May',
			6: 'Jun',
			7: 'Jul',
			8: 'Aug',
			9: 'Sep',
			10: 'Oct',
			11: 'Nov',
			12: 'Dec'
		},
		stylesData: {
			selector: 'date-picker',
			styles: `
			`
		},
		//showFooterToday: true,
		todayTxt: 'Today'
	};

	/**
	 * outputs selected date as in given format
	 */
	@Output() userSelectedDate: EventEmitter<IMyDateModel> = new EventEmitter<IMyDateModel>();
	/**
	 * outputs selected date as in string format in YYYY-MM-DD
	 */
	@Output() selectedFormatDate: EventEmitter<string> = new EventEmitter<string>();

	public selectedDate: IMyDate = null;
	constructor() {}

	public ngOnInit() {
		/*
		//load preselected date if existed
		if (this.preselectedDate !== '') {
			this.setPreselectedDate();
		}
		*/
	}

	/**
	 *
	 *SetPreselectedDate After Validation
	 * */
	/*
	 * Needs to be Implemented if Required
	public setPreselectedDate() {
		let preselectedDate: Date = this.getPreSelectedDate(this.preselectedDate);
		if (preselectedDate) {
			this.selectedDate = {
				year: preselectedDate.getFullYear(),
				month: preselectedDate.getMonth(),
				day: preselectedDate.getDay()
			};
		}
	}
	*/

	/**
	 *
	 *Onchange date update ngmodel date and emits value
	 * */

	public onDateChanged(event: IMyDateModel) {
		// Update value of selDate variable
		this.selectedDate = event.singleDate.date;
		this.userSelectedDate.emit(event);
		this.selectedFormatDate.emit(event.singleDate.formatted);
	}

	/**
	 *
	 * Below function is reference to convert from date to string
	 * @param date
	 */
	/**
	 * Needs to be developed
	public getPreSelectedDate(date: string): Date{
		if (moment.isDate(date)) {
			return moment(date, 'YYYY-MM-DD').toDate();			
		}
		else {
			return null;
		}
	}
	*/

	/**
	 *
	 * Below function is reference to convert from date to string
	 * @param date
	 */
	public filterDateToStringFormat(date: Date): string {
		let DateValues = moment.utc(date).format('YYYY-MM-DD');
		return DateValues;
	}
}
