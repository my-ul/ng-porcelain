// Angular
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Font Awesome 5
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Utilities
import * as _moment from 'moment';
const moment = _moment;

// Porcelain
import {
	IDateRefiner,
	DateOptions,
	DateOption,
	DateRefiner
} from '../../shared/types';
import { IMyDateModel, IMyDate } from 'mydatepicker';

import { i18nDateOptions } from '../../shared/utilities/i18nDateOptions';

export interface DateRefinerValue {
	from: Date;
	to: Date;
}

export interface IDateRefinerProps {
	isOpen?: boolean;
	refiner: IDateRefiner;
	onRefinerChange: EventEmitter<any>;
}

export const defaultDateOptions: DateOptions = i18nDateOptions();

// const animationOptionsInOut = generateSlideInOut('optionsInOut'),
// 	animationRangeInOut = generateSlideInOut('rangeInOut');

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

	fromModel: IMyDate = null;
	toModel: IMyDate = null;

	constructor() {}

	// Events
	onChange() {
		console.group('onChange(event, field)');

		this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);

		console.groupEnd();
	}

	onFromChange($event?: IMyDateModel) {
		this.fromModel = $event.date;
		this.onChange();
	}

	onToChange($event?: IMyDateModel) {
		this.toModel = $event.date;
		this.onChange();
	}

	// States
	optionHasBadge(dateOptionOrDate: DateOption | Date): boolean {
		return (
			dateOptionOrDate instanceof DateOption &&
			typeof dateOptionOrDate.badge !== 'undefined'
		);
	}

	// Getters
	getValue(): DateRefinerValue {
		console.group('getValue()');

		const selectedOption = this.options[this.currentOptionSlug];

		const selectedFrom =
			this.currentOptionSlug === 'custom'
				? this.fromModel
					? selectedOption.getFrom(
							moment()
								.year(this.fromModel.year)
								.month(this.fromModel.month - 1)
								.date(this.fromModel.day)
								.startOf('day')
								.toDate()
					  )
					: null
				: selectedOption
				? selectedOption.getFrom(null)
				: null;

		const selectedTo =
			this.currentOptionSlug === 'custom'
				? this.toModel // is custom... is a to value set?
					? selectedOption.getTo(
							// to value is set
							moment()
								.year(this.toModel.year)
								.month(this.toModel.month - 1)
								.date(this.toModel.day)
								.endOf('day')
								.toDate()
					  )
					: null // to value is not set
				: selectedOption // is not 'custom'
				? selectedOption.getTo(null) // generate the to value
				: null; // return null (range is unbounded)

		console.groupEnd();
		return {
			from: selectedFrom,
			to: selectedTo
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

	ngOnInit() {
		this.options = this.refiner.options
			? this.refiner.options
			: defaultDateOptions;

		for (let optionSlug in this.options) {
			let option = this.options[optionSlug];
			if (option instanceof DateOption) {
				if (option.isSelected === true) {
					this.currentOptionSlug = optionSlug;
				}
			}
		}

		this.onChange();
	}
}
