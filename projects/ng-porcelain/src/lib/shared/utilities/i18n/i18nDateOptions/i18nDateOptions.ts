import * as _moment from 'moment';
import { DateOptions } from '../../../types/Options/DateOptions';
import { DateOption } from '../../../types/Options/DateOption';
const moment = _moment;

const momentFloor = (arg1?: _moment.DurationInputArg1, arg2?: _moment.DurationInputArg2) => {
	return moment()
		.utc()
		.startOf('day');
};

const momentFloorSubtract = (arg1?: _moment.DurationInputArg1, arg2?: _moment.DurationInputArg2) =>
	momentFloor().subtract(arg1, arg2);

export const i18nDateOptions = (
	viewAllLabel: string = 'View All',
	todayLabel: string = 'Today',
	lastSevenDaysLabel: string = 'Last 7 days',
	lastThirtyDaysLabel: string = 'Last 30 days',
	lastNinetyDaysLabel: string = 'Last 90 days',
	customLabel: string = 'Date Range'
): DateOptions => ({
	'-1': new DateOption({
		slug: '-1',
		getTo: () => null,
		getFrom: () => null,
		label: viewAllLabel
	}),
	// select item where getFrom() <= date < getTo()
	'1': new DateOption({
		label: todayLabel,
		slug: '1',
		getFrom: () =>
			moment()
				.utc()
				.startOf('day')
				.toDate(),
		getTo: () =>
			moment()
				.utc()
				.endOf('day')
				.toDate()
	}),
	'7': new DateOption({
		label: lastSevenDaysLabel,
		slug: '7',
		getFrom: () =>
			moment()
				.utc()
				.startOf('day')
				.subtract(6, 'days')
				.toDate(),
		getTo: () =>
			moment()
				.utc()
				.endOf('day')
				.toDate()
	}),
	'30': new DateOption({
		label: lastThirtyDaysLabel,
		slug: '30',
		getFrom: () => momentFloorSubtract(29, 'days').toDate(),
		getTo: () =>
			moment()
				.utc()
				.endOf('day')
				.toDate()
	}),
	'90': new DateOption({
		label: lastNinetyDaysLabel,
		slug: '90',
		getFrom: () => momentFloorSubtract(89, 'days').toDate(),
		getTo: () =>
			moment()
				.utc()
				.endOf('day')
				.toDate()
	}),
	custom: new DateOption({
		isSelected: true,
		label: customLabel,
		slug: 'custom',
		getFrom: (fromValue?: string | Date) =>
			moment(fromValue)
				.utc()
				.startOf('day')
				.toDate(),
		getTo: (toValue?: string | Date) =>
			moment(toValue)
				.utc()
				.endOf('day')
				.toDate()
	})
});
