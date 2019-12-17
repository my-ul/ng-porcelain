import { DateRefinerDefinition } from './../../shared';
// Angular
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Font Awesome 5
import { faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
// Utilities
import * as _moment from 'moment';
import { IMyDate } from 'mydatepicker';

// Porcelain
import {
	DateOption,
	DateOptions,
	DateRefinerValue,
	i18nDateOptions,
	IDateRefinerDefinition
} from '../../shared';
import { of } from 'rxjs';

// Issue with moment requires this workaround for now
const moment = _moment;

export interface IDateRefinerProps {
	isOpen?: boolean;
	refiner: IDateRefinerDefinition;
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
	@Input() refiner: DateRefinerDefinition;

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

	/**
	 * Defines emit behavior for invalid ranges.
	 * Set to true to allow unbounded ranges (with a null to or from value)
	 */
	@Input() allowIncompleteEmit: boolean = true;

	// Outputs
	@Output() onRefinerChange: EventEmitter<any> = new EventEmitter();

	// Icons
	faChevronDown: IconDefinition = faCaretDown;

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
			typeof date === 'string'
				? moment.utc(date, 'YYYY-MM-DD') // needs to be parsed as UTC
				: moment(date).utc(); // has time zone context, must convert to UTC

		if (parsed.isValid) {
			return {
				date: {
					day: parsed.get('date'),
					month: parsed.get('month') + 1, // Zero-indexed => One-indexed
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
		this.onChange(this.currentOptionSlug);
	}

	onToChange($event) {
		this.toModel = $event;
		this.onChange(this.currentOptionSlug);
	}

	/**
	 * Calculate whether or not the range is considered "complete".
	 */
	isComplete(): boolean {
		const value = this.getValue();

		// -1 is a slug commonly associated with 'all' (as in no start or end)
		if (value.optionSlug === '-1') {
			return true;
		}

		if (
			value.from instanceof Date &&
			value.to instanceof Date &&
			value.from.getUTCMilliseconds() < value.to.getUTCMilliseconds()
		) {
			return true;
		}

		return false;
	}

	// Events
	onChange(newOptionSlug: string) {
		console.group('onChange(newOptionSlug)', { newOptionSlug });

		this.currentOptionSlug = newOptionSlug;

		const isComplete = this.isComplete();
		const value = this.getValue();
		let shouldEmit = false;

		// the current option has changed to a predefined range
		if (this.currentOptionSlug !== newOptionSlug && newOptionSlug !== 'custom') {
			shouldEmit = true;
		}

		// or we're emitting a complete custom range
		if (newOptionSlug === 'custom' && isComplete) {
			shouldEmit = true;
		}

		// or the range is incomplete/invalid, but this is allowed
		if (newOptionSlug === 'custom' && this.allowIncompleteEmit && !isComplete) {
			// notice the negation of isComplete
			shouldEmit = true;
		}

		if (shouldEmit === true) {
			this.ignoreNext = true;
			this.refiner.valueSubject.next(value);
		}

		console.groupEnd();
	}

	// States
	optionHasBadge(dateOptionOrDate: DateOption | Date): boolean {
		return dateOptionOrDate instanceof DateOption && typeof dateOptionOrDate.badge !== 'undefined';
	}

	/**
	 * Computes and returns the current date range using UTC time as the working time zone.
	 *
	 * When the current option is 'custom', the dates for to and from are computed from toModel and fromModel, respectively.
	 * If the values are not set, (toModel/fromModel are blank), the component will return null.
	 * If the component's shouldEmitIncomplete input is TRUE, these values will be emitted to your application immediately.
	 * Otherwise, the component will wait for a valid range before emitting any values.
	 * 	set [shouldEmitIncomplete]="true" to get incomplete ranges (no start or no end)
	 * 	set [shouldEmitIncomplete]="false" to ensure that your application only receives COMPLETE ranges.
	 */
	getValue(): DateRefinerValue {
		console.group('getValue()');

		const currentOption = this.refiner.options[this.currentOptionSlug];

		if (this.currentOptionSlug === 'custom') {
			const from = this.fromModel
				? currentOption.getFrom(
						moment()
							.utc()
							.year(this.fromModel.date.year)
							.month(this.fromModel.date.month - 1) // zero-indexed, so Jan is 0; Dec is 11
							.date(this.fromModel.date.day)
							.startOf('day')
							.toDate()
				  )
				: null;

			const to = this.toModel
				? currentOption.getTo(
						moment()
							.utc()
							.year(this.toModel.date.year)
							.month(this.toModel.date.month - 1)
							.date(this.toModel.date.day)
							.endOf('day')
							.toDate()
				  )
				: null;

			console.log('returning a custom range');
			return {
				from,
				to,
				optionSlug: 'custom'
			};
		}

		console.groupEnd();

		if (this.currentOptionSlug === '-1') {
			console.log('returning the "all" range');
			return {
				from: null,
				to: null,
				optionSlug: '-1'
			};
		} else {
			console.log('returning a pre-defined range');
			return {
				from: currentOption.getFrom(null),
				to: currentOption.getTo(null),
				optionSlug: this.currentOptionSlug
			};
		}
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
