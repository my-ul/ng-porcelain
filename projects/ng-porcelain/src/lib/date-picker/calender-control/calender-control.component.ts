import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { IMyOptions, IMyDateModel, IMyDate } from 'angular-mydatepicker';

@Component({
	selector: 'calender-control',
	templateUrl: './calender-control.component.html',
	styleUrls: ['./calender-control.component.scss']
})
export class CalenderControlComponent implements OnInit {
	@Input() responselangJson: any;

	@Input() datePickerOptions = {
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

	//output
	@Output() SelectedTime: EventEmitter<IMyDateModel> = new EventEmitter<IMyDateModel>();

	myDatePickerOptions: IMyOptions = {
		// other options...
		dateFormat: 'dd.mm.yyyy',
		//showFooterToday: true,
		todayTxt: 'Today',
		disableUntil: {
			year: 2017,
			month: 12,
			day: 1
		}
	};

	name = 'Angular 5';
	public todaySelDate: any;
	public temp;
	public model;
	public selDate: IMyDate = null;
	constructor() {}

	public ngOnInit() {
		let d: Date = new Date();
		this.selDate = {
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			day: d.getDate()
		};
		console.log(this.selDate);

		this.todaySelDate = this.getDatePickerObject(moment(new Date()).format('DD-MM-YYYY'), 0);
		// this.model=this.todaySelDate;
		console.log('======', this.todaySelDate);
		console.log(this.myDatePickerOptions.dateFormat);
		console.log(this.myDatePickerOptions.todayTxt);
	}
	onDateChanged(event: IMyDateModel) {
		this.SelectedTime.emit(event);
		// Update value of selDate variable
		this.selDate = event.singleDate.date;
	}

	private getDatePickerObject(date: string, id: any) {
		if (date != undefined) {
			let dataTemp: string[] = date.split('-');
			if (id == 0) {
				this.temp = {
					day: Number(dataTemp[0]),
					month: Number(dataTemp[1]),
					year: Number(dataTemp[2])
				};
				return this.temp;
			}
		}
	}
}
