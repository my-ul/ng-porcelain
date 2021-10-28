// Angular
import { Component, EventEmitter, Input, OnInit, Output, isDevMode } from '@angular/core';
// Font Awesome 5
import { faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
// Utilities

import { IMyDateModel } from 'angular-mydatepicker';

// Porcelain
import { TranslationService } from '../../services/translation/translation.service';
import { IDictionary } from '../../shared/types/Containers/IDictonary/IDictionary';
import { DateOption } from '../../shared/types/Options/DateOption';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';
import { DateRefinerValue } from '../../shared/types/Values/DateRefinerValue';
import { i18nDateOptions } from '../../shared/utilities/i18n/i18nDateOptions/i18nDateOptions';
import { IDateRefinerDefinition } from '../../shared/types/Refiners/IDateRefinerDefinition';
import { Loggable } from '../../Loggable';
import { DateTime } from 'luxon';

export interface IDateRefinerProps {
	isOpen?: boolean;
	refiner: IDateRefinerDefinition;
	onRefinerChange: EventEmitter<any>;
}

export interface IDateRefinerState {
	optionSlug: string;
	from: string | Date | DateTime;
	to: string | Date | DateTime;
}

export const defaultDateOptions: IDictionary<DateOption> = i18nDateOptions();

// const animationOptionsInOut = generateSlideInOut('optionsInOut'),
// 	animationRangeInOut = generateSlideInOut('rangeInOut');

export interface ISimplifiedMyDateModel {
	date: IMyDateModel;
}

@Component({
	selector: 'porcelain-date-refiner, p-date-refiner',
	templateUrl: './date-refiner.component.html',
	styleUrls: ['./date-refiner.component.scss']
})
export class DateRefinerComponent extends Loggable implements OnInit {
	readonly name = 'DateRefinerComponent';

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
		stylesData: {
			selector: 'date-picker',
			styles: `
			`
		}
	};

	@Input() fromLabel: string = 'From';
	@Input() toLabel: string = 'To';
	@Input() invalidCustomRangeLabel: string = 'Please select a valid date range.';

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
	options: IDictionary<DateOption> = defaultDateOptions;

	// Angular
	objectKeys = Object.keys;

	// State
	currentOptionSlug: string;
	private ignoreNext: boolean = false;

	fromModel: IMyDateModel = null;
	toModel: IMyDateModel = null;

	constructor(private translationService: TranslationService) {
		super();
		this.log('constructor()');

		/**
		 * Applies translations using myUL Translation file format.
		 **/

		this.translationService.getTranslations().subscribe(
			TranslationService.translate<DateRefinerComponent>(this, {
				label_From: 'fromLabel',
				label_To: 'toLabel',
				label_PleaseSelectAValidDateRange: 'invalidCustomRangeLabel'
			})
		);
	}

	parseDateState(date: string | Date | DateTime): IMyDateModel {
		this.debug('parseDateState(date)', { date });
		// prettier-ignore
		const parsed: DateTime =
			typeof date === 'string' ? DateTime.fromISO(date, { zone: 'utc' })
				: date instanceof Date ? DateTime.fromJSDate(date).toUTC()
				: date instanceof DateTime ? date
				: null;

		if (parsed.isValid) {
			return {
				isRange: false,
				singleDate: {
					date: {
						day: parsed.day,
						month: parsed.month, // Zero-indexed => One-indexed
						year: parsed.year
					}
				}
			};
		} else {
			return null;
		}
	}

	ngOnInit() {
		this.debug('ngOnInit()');

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
	}

	onFromChange($event) {
		this.debug('onFromChange($event)', { $event });
		this.fromModel = $event;
		this.onChange(this.currentOptionSlug);
	}

	onToChange($event) {
		this.debug('onToChange($event)', { $event });
		this.toModel = $event;
		this.onChange(this.currentOptionSlug);
	}

	isCustomRangeValid() {
		const value = this.getValue();
		if (value.optionSlug === 'custom') {
			if (this.allowIncompleteEmit) {
				return true;
			} else {
				return (
					value.from instanceof Date &&
					value.to instanceof Date &&
					value.from.getTime() < value.to.getTime()
				);
			}
		}
		return true;
	}

	/**
	 * Calculate whether or not the range is considered "complete".
	 */
	isComplete(): boolean {
		const value = this.getValue();
		this.debug('isComplete()', { value });

		// -1 is a slug commonly associated with 'all' (as in no start or end)
		if (value.optionSlug === '-1') {
			return true;
		}

		if (
			value.from instanceof Date &&
			value.to instanceof Date &&
			value.from.getTime() < value.to.getTime() // are unix epoch timestamps
		) {
			return true;
		}

		return false;
	}

	// Events
	onChange(newOptionSlug: string) {
		let shouldEmit = false;

		// update currentOptionSlug here, as inComplete and getValue
		// rely on the updated value.
		this.currentOptionSlug = newOptionSlug;

		const isComplete = this.isComplete();
		const value = this.getValue();

		this.debug('onChange(newOptionSlug)', 'before validation', {
			allowIncompleteEmit: this.allowIncompleteEmit,
			isComplete,
			value,
			newOptionSlug
		});

		// the current option has changed to a predefined range
		if (this.currentOptionSlug !== 'custom' && isComplete) {
			shouldEmit = true;
		}

		// custom refiner options may generate unbounded ranges, and need to emit
		if (this.currentOptionSlug !== 'custom' && !isComplete && this.allowIncompleteEmit) {
			shouldEmit = true;
		}

		// or we're emitting a complete custom range
		if (this.currentOptionSlug === 'custom' && isComplete) {
			shouldEmit = true;
		}

		// or the range is incomplete/invalid, but allowed by flag
		if (this.currentOptionSlug === 'custom' && !isComplete && this.allowIncompleteEmit) {
			shouldEmit = true;
		}

		if (shouldEmit === true) {
			this.debug('onChange()', 'emitting value', { value });
			this.ignoreNext = true;
			this.refiner.valueSubject.next(value);
		}
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
	 * 	set [shouldEmitIncomplete]="true" to get incomplete ranges (allowing omitted start and/or omitted end)
	 * 	set [shouldEmitIncomplete]="false" to ensure that your application only receives COMPLETE ranges.
	 */
	getValue(): DateRefinerValue {
		this.debug('getValue()');

		const currentOption = this.refiner.options[this.currentOptionSlug];

		if (this.currentOptionSlug === 'custom') {
			this.debug('this.fromModel, this.toModel', {
				fromModel: this.fromModel,
				toModel: this.toModel
			});
			const from = this.fromModel
				? currentOption.getFrom(
						DateTime.utc()
							.set({
								year: this.fromModel.singleDate.date.year,
								month: this.fromModel.singleDate.date.month,
								day: this.fromModel.singleDate.date.day
							})
							.startOf('day')
							.toJSDate()
				  )
				: null;

			const to = this.toModel
				? currentOption.getTo(
						DateTime.utc()
							.set({
								year: this.toModel.singleDate.date.year,
								month: this.toModel.singleDate.date.month,
								day: this.toModel.singleDate.date.day
							})
							.endOf('day')
							.toJSDate()
				  )
				: null;

			return {
				from,
				to,
				optionSlug: 'custom'
			};
		}

		if (this.currentOptionSlug === '-1') {
			return {
				from: null,
				to: null,
				optionSlug: '-1'
			};
		} else {
			return {
				from: currentOption.getFrom(null),
				to: currentOption.getTo(null),
				optionSlug: this.currentOptionSlug
			};
		}
	}

	getOptionLabel(option: DateOption): string {
		this.debug('getOptionLabel(option)', { option });
		if (option instanceof DateOption) {
			if (option.label) {
				return option.label;
			}
		}
	}

	getOptionBadge(option: DateOption | Date): string {
		this.debug('getOptionBadge(option)', { option });
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
		this.debug('toggleOpen()', { isOpen: this.isOpen });
		this.isOpen = !this.isOpen;
	}
}
