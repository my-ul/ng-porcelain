import { DateTime } from 'luxon';
import { DateOption } from '../../../types/Options/DateOption';
import { IDictionary } from '../../../types/Containers/IDictonary/IDictionary';

export const i18nDateOptions = (
	viewAllLabel: string = 'View All',
	todayLabel: string = 'Today',
	lastSevenDaysLabel: string = 'Last 7 days',
	lastThirtyDaysLabel: string = 'Last 30 days',
	lastNinetyDaysLabel: string = 'Last 90 days',
	customLabel: string = 'Date Range'
): IDictionary<DateOption> => ({
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
			DateTime.now()
				.toUTC()
				.startOf('day')
				.toJSDate(),
		getTo: () =>
			DateTime.now()
				.toUTC()
				.endOf('day')
				.toJSDate()
	}),
	'7': new DateOption({
		label: lastSevenDaysLabel,
		slug: '7',
		getFrom: () =>
			DateTime.utc()
				.startOf('day')
				.minus({ days: 6 })
				.toJSDate(),
		getTo: () =>
			DateTime.utc()
				.endOf('day')
				.toJSDate()
	}),
	'30': new DateOption({
		label: lastThirtyDaysLabel,
		slug: '30',
		getFrom: () =>
			DateTime.utc()
				.startOf('day')
				.minus({ days: 29 })
				.toJSDate(),
		getTo: () =>
			DateTime.utc()
				.endOf('day')
				.toJSDate()
	}),
	'90': new DateOption({
		label: lastNinetyDaysLabel,
		slug: '90',
		getFrom: () =>
			DateTime.utc()
				.startOf('day')
				.minus({ days: 89 })
				.toJSDate(),
		getTo: () =>
			DateTime.utc()
				.endOf('day')
				.toJSDate()
	}),
	custom: new DateOption({
		isSelected: true,
		label: customLabel,
		slug: 'custom',
		getFrom: (fromValue?: string | Date) => {
			if (fromValue) {
				return (typeof fromValue === 'string'
					? DateTime.fromISO(fromValue)
					: DateTime.fromJSDate(fromValue)
				)
					.toUTC()
					.startOf('day')
					.toJSDate();
			} else {
				return null;
			}
		},
		getTo: (toValue?: string | Date) => {
			if (toValue) {
				return (typeof toValue === 'string'
					? DateTime.fromISO(toValue)
					: DateTime.fromJSDate(toValue)
				)
					.toUTC()
					.endOf('day')
					.toJSDate();
			} else {
				return null;
			}
		}
	})
});
