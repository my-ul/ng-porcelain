// Angular
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Font Awesome 5
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// Utilities
import * as _moment from 'moment';
import { IMyDate } from 'mydatepicker';
// Porcelain
import {
	DateOption,
	DateOptions,
	DateRefiner,
	DateRefinerValue,
	IDateRefiner
} from '../../shared/types';
import { i18nDateOptions } from '../../shared/utilities/i18nDateOptions';

// Issue with moment requires this workaround for now
const moment = _moment;

export interface IDateRefinerProps {
	isOpen?: boolean;
	refiner: IDateRefiner;
	onRefinerChange: EventEmitter<any>;
}

export interface IDateRefinerState {
	optionSlug: string;
	from: string | Date | _moment.Moment;
	to: string | Date | _moment.Moment;
}

export const defaultDateOptions: DateOptions = i18nDateOptions();

// const animationOptionsInOut = generateSlideInOut('optionsInOut'),
// 	animationRangeInOut = generateSlideInOut('rangeInOut');

export interface ISimplifiedMyDateModel {
	date: IMyDate;
}

@Component({
	selector: 'porcelain-date-refiner',
	templateUrl: './date-refiner.component.html',
	styleUrls: ['./date-refiner.component.scss']
})
export class DateRefinerComponent implements OnInit {
	// Inputs
	@Input() isOpen: boolean = true;
	@Input() refiner: DateRefiner;

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
		todayBtnTxt: 'Today'
	};

	@Input() fromLabel: string = 'From';
	@Input() toLabel: string = 'To';

	// Outputs
	@Output() onRefinerChange: EventEmitter<any> = new EventEmitter();

	// Icons
	faChevronDown = faCaretDown;

	// Constants
	options: DateOptions = defaultDateOptions;

	// Angular
	objectKeys = Object.keys;

	// State
	currentOptionSlug: string;
	private ignoreNext: boolean = false;

	fromModel: ISimplifiedMyDateModel = null;
	toModel: ISimplifiedMyDateModel = null;

	constructor() {
		console.group('DateRefinerComponent > constructor()');

		console.groupEnd();
	}

	parseDateState(date: string | Date | _moment.Moment): ISimplifiedMyDateModel {
		const parsed: _moment.Moment =
			typeof date === 'string' ? moment(date, 'YYYY-MM-DD').utc() : moment(date).utc();

		if (parsed.isValid) {
			return {
				date: {
					day: parsed.get('date'),
					month: parsed.get('month') + 1, // Zero-indexed
					year: parsed.get('year')
				}
			};
		} else {
			return null;
		}
	}

	ngOnInit() {
		console.group('DateRefinerComponent.ngOnInit()');

		this.options = this.refiner.options ? this.refiner.options : defaultDateOptions;

		for (let optionSlug in this.options) {
			if (this.options.hasOwnProperty(optionSlug)) {
				let option = this.options[optionSlug];
				if (option instanceof DateOption) {
					if (option.isSelected === true) {
						this.currentOptionSlug = optionSlug;
					}
				}
			}
		}

		// Connect new Subscription-based state updates to callback system for users using version < 1.3
		this.refiner.valueSubject.subscribe(value => {
			console.log('emitting', value);
			this.onRefinerChange.emit([this.refiner.slug, value]);
		});

		// Subscribe to updates to the value, which can be pushed by anyone with a reference to `this.refiner`.
		this.refiner.valueSubject.subscribe(value => {
			if (this.ignoreNext) {
				this.ignoreNext = false;
			} else {
				this.currentOptionSlug = value.optionSlug;
				if (this.currentOptionSlug === 'custom') {
					this.fromModel = this.parseDateState(value.from);
					this.toModel = this.parseDateState(value.to);
				}
			}
		});

		console.groupEnd();
	}

	onFromChange($event) {
		this.fromModel = $event;
		this.onChange();
	}

	onToChange($event) {
		this.toModel = $event;
		this.onChange();
	}

	// Events
	onChange() {
		console.group('onChange()');

		this.ignoreNext = true;
		this.refiner.valueSubject.next(this.getValue());

		console.groupEnd();
	}

	// States
	optionHasBadge(dateOptionOrDate: DateOption | Date): boolean {
		return dateOptionOrDate instanceof DateOption && typeof dateOptionOrDate.badge !== 'undefined';
	}

	// Getters
	getValue(): DateRefinerValue {
		console.group('getValue()');

		const currentOption = this.refiner.options[this.currentOptionSlug];

		if (this.currentOptionSlug === 'custom') {
		}

		const currentFromDate =
			this.currentOptionSlug === 'custom' && this.fromModel
				? moment()
						.utc()
						.year(this.fromModel.date.year)
						.month(this.fromModel.date.month) // zero-indexed, so Jan is 0; Dec is 11
						.date(this.fromModel.date.day)
						.startOf('day')
						.toDate()
				: moment()
						.utc()
						.startOf('day')
						.toDate();
		const from = currentOption.getFrom(currentFromDate);

		const currentToDate =
			this.currentOptionSlug === 'custom' && this.toModel
				? moment()
						.utc()
						.year(this.toModel.date.year)
						.month(this.toModel.date.month)
						.date(this.toModel.date.day)
						.endOf('day')
						.toDate()
				: moment()
						.utc()
						.endOf('day')
						.toDate();
		const to = currentOption.getTo(currentToDate);

		console.groupEnd();

		return {
			from,
			optionSlug: this.currentOptionSlug,
			to
		};
	}

	getOptionLabel(option: DateOption): string {
		if (option instanceof DateOption) {
			if (option.label) {
				return option.label;
			}
		}
	}

	getOptionBadge(option: DateOption | Date): string {
		if (option instanceof DateOption) {
			if (option.badge) {
				if (typeof option.badge === 'number') {
					return option.badge.toLocaleString();
				} else {
					return option.badge;
				}
			}
		} else {
			return '';
		}
	}

	// Mutators
	toggleOpen() {
		this.isOpen = !this.isOpen;
	}
}
