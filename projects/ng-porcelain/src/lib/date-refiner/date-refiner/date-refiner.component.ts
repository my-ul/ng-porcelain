// Angular
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Font Awesome 5
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Utilities
import * as moment from 'moment';

// Porcelain
import {
	IDateRefiner,
	DateOptions,
	DateOption,
	DateRefiner
} from '../../shared/types';

export interface DateRefinerValue {
	from: Date;
	to: Date;
}

export interface IDateRefinerProps {
	isOpen?: boolean;
	refiner: IDateRefiner;
	onRefinerChange: EventEmitter<any>;
}

const momentFloor = (
	arg1?: moment.DurationInputArg1,
	arg2?: moment.DurationInputArg2
) => {
	return moment
		.call(null)
		.set('hours', 0)
		.set('minutes', 0)
		.set('seconds', 0);
};

const momentFloorSubtract = (
	arg1?: moment.DurationInputArg1,
	arg2?: moment.DurationInputArg2
) => momentFloor().subtract(arg1, arg2);

const momentFloorAdd = (
	arg1?: moment.DurationInputArg1,
	arg2?: moment.DurationInputArg2
) => momentFloor().add(arg1, arg2);

export const defaultDateOptions: DateOptions = {
	// yields no range by default (unrestricted)
	'-1': new DateOption({
		slug: '-1',
		getTo: () => null,
		getFrom: () => null,
		label: 'View All'
	}),

	// select item where getFrom() <= date < getTo()
	'1': new DateOption({
		label: 'Today',
		slug: '1',
		getTo: () => momentFloorAdd(1, 'day').toDate(),
		getFrom: () => momentFloor().toDate()
	}),
	'7': new DateOption({
		label: 'Last 7 Days',
		slug: '7',
		getTo: () => momentFloorAdd(1, 'day').toDate(),
		getFrom: () => momentFloorSubtract(7, 'days').toDate()
	}),
	'30': new DateOption({
		label: 'Last 30 Days',
		slug: '30',
		getTo: () => momentFloorAdd(1, 'day').toDate(),
		getFrom: () => momentFloorSubtract(30, 'days').toDate()
	}),
	'90': new DateOption({
		label: 'Last 90 Days',
		slug: '90',
		getTo: () => momentFloorAdd(1, 'day').toDate(),
		getFrom: () => momentFloorSubtract(90, 'days').toDate()
	}),
	custom: new DateOption({
		isSelected: true,
		label: 'Date Range...',
		slug: 'custom',
		getTo: (toString?: string) => moment.call(null, toString).toDate(),
		getFrom: (fromString?: string) => moment.call(null, fromString).toDate()
	})
};

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
	startString: string;
	endString: string;

	constructor() {}

	// Events
	onChange() {
		this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);
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
		const selectedOption = this.options[this.currentOptionSlug];
		return {
			from:
				selectedOption instanceof DateOption
					? selectedOption.getFrom(this.startString)
					: selectedOption,
			to:
				selectedOption instanceof DateOption
					? selectedOption.getTo(this.endString)
					: selectedOption
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
