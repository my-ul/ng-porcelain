import {
	Component,
	OnInit,
	Input,
	Inject,
	Output,
	EventEmitter,
	HostBinding,
	ViewChild,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { AngularMyDatePickerDirective, IMyDateModel, IMyOptions } from 'angular-mydatepicker';

import { faCalendarAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';

@Component({
	selector: 'porcelain-datepicker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss']
})
export class datePickerComponent implements OnInit, OnChanges {
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

	@ViewChild('DatePicker', { static: false })
	public myDatePickRef: AngularMyDatePickerDirective = null;
	public selectedDate: IMyDateModel = null;
	constructor() {}

	public ngOnInit() {
		if (this.preselectedDate !== '') {
			this.setPreselectedDate();
		}
	}
	/**
	 *
	 * Incase input changes update datepicker
	 *
	 * @param changes
	 */

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['preselectedDate']) {
			this.setPreselectedDate();
		}
	}

	/**
	 *
	 *SetPreselectedDate After Validation
	 * */

	public setPreselectedDate() {
		let preselectedDate: Date = this.getPreSelectedDate(this.preselectedDate);
		if (preselectedDate) {
			this.selectedDate = {
				isRange: false,
				singleDate: {
					date: {
						day: preselectedDate.getDate(),
						month: preselectedDate.getMonth() + 1, // Zero-indexed => One-indexed
						year: preselectedDate.getFullYear()
					}
				}
			};
		}
	}

	/**
	 *
	 *Onchange date update ngmodel date and emits value
	 * */

	public onDateChanged(event: IMyDateModel) {
		// Update value of selDate variable
		this.selectedDate = event;
		this.userSelectedDate.emit(event);
		this.selectedFormatDate.emit(event.singleDate.formatted);
	}

	/**
	 *
	 * Below function is reference to convert from date to string
	 * @param date
	 */

	public getPreSelectedDate(date: string): Date {
		let parsed = DateTime.fromISO(date);
		if (parsed.isValid) {
			return parsed.toJSDate();
		} else {
			return null;
		}
	}

	/**
	 *
	 * Below function is reference to convert from date to string
	 * @param date
	 */
	public filterDateToStringFormat(date: Date): string {
		let DateValues = DateTime.fromJSDate(date, { zone: 'UTC' }).toISODate();
		return DateValues;
	}
	/**
	 * Below Function is for clearing Datepicker. Use ViewChild to get value
	 * */
	public clear() {
		this.myDatePickRef.clearDate();
	}

	/**
	 *
	 * Utility function for setting date via viewChild. USE OF Preselected Input is adviced!!
	 * */
	public SetDatePickerValue(inputdate: string) {
		this.preselectedDate = inputdate;
		this.setPreselectedDate();
	}
}
