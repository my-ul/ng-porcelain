// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { storiesOf, moduleMetadata } from '@storybook/angular';

// Utilities
import * as _moment from 'moment';

// Porcelain
import {
	DateOption,
	DateRefinerDefinition,
	i18nDateOptions
} from '../../.../../../projects/ng-porcelain/src/lib/shared';
import { DATE_REFINER_IMPORTS } from './../../../projects/ng-porcelain/src/lib/date-refiner/date-refiner.module';
import {
	DateRefinerComponent,
	defaultDateOptions,
	IDateRefinerProps
} from './../../../projects/ng-porcelain/src/lib/date-refiner/date-refiner/date-refiner.component';

const moment = _moment;

storiesOf('Date Refiner Component', module)
	.addDecorator(withNotes)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			imports: DATE_REFINER_IMPORTS
		})
	)
	.addParameters({
		info: {
			inline: true
		}
	})
	.add(
		'Simple `DateRefiner` definition',
		() => ({
			component: DateRefinerComponent,
			props: {
				refiner: new DateRefinerDefinition({
					slug: 'myRefinerDefinition',
					title: 'Simple Date Refiner',
					options: defaultDateOptions
				}),
				onRefinerChange: action('Date Refiner (simple) changed')
			} as IDateRefinerProps
		}),
		{
			notes: { markdown: require('./simpleRefinerDefinition.md') },
			info: {
				header: true,
				inline: true
			}
		}
	)
	.add('Predefined custom date range', () => ({
		component: DateRefinerComponent,
		props: {
			refiner: new DateRefinerDefinition({
				slug: 'myRefinerDefinition',
				title: 'Simple Date Refiner',
				options: defaultDateOptions,
				value: {
					optionSlug: 'custom',
					from: moment.utc('2018-01-01', 'YYYY-MM-DD').toDate(),
					to: moment.utc('2018-12-31', 'YYYY-MM-DD').toDate()
				}
			}),
			onRefinerChange: action('Date Refiner (simple) changed')
		} as IDateRefinerProps
	}))
	.add(
		'Custom Translation',
		() => ({
			component: DateRefinerComponent,
			props: {
				toLabel: 'Al',
				fromLabel: 'Del',
				datePickerOptions: {
					dateFormat: 'yyyy-mm-dd',
					dayLabels: {
						su: 'do',
						mo: 'lu',
						tu: 'ma',
						we: 'mi',
						th: 'ju',
						fr: 'vi',
						sa: 'sab'
					},
					monthLabels: {
						1: 'ene',
						2: 'feb',
						3: 'mar',
						4: 'abr',
						5: 'may',
						6: 'jun',
						7: 'jul',
						8: 'ago',
						9: 'sep',
						10: 'oct',
						11: 'nov',
						12: 'dic'
					},
					todayBtnTxt: 'Hoy'
				},
				refiner: new DateRefinerDefinition({
					slug: 'myRefinerDefinition',
					title: 'Simple Date Refiner',
					options: i18nDateOptions(
						'Ver todo',
						'Hoy',
						'Últimos 7 días',
						'Últimos 30 días',
						'Últimos 90 días',
						'Fecha Rango'
					)
				}),
				onRefinerChange: action('Date Refiner (translated) changed')
			} as IDateRefinerProps
		}),
		{
			notes: { markdown: require('./simpleRefinerDefinition.md') },
			info: {
				header: true,
				inline: true
			}
		}
	)
	.add(
		'Custom Labels',
		() => ({
			component: DateRefinerComponent,
			props: {
				refiner: new DateRefinerDefinition({
					slug: 'myRefinerDefinition',
					title: 'Simple Date Refiner',
					options: defaultDateOptions
				}),
				onRefinerChange: action('Date Refiner (simple) changed')
			} as IDateRefinerProps
		}),
		{
			notes: { markdown: require('./simpleRefinerDefinition.md') },
			info: {
				header: true,
				inline: true
			}
		}
	)
	.add(
		'Closed by default',
		() => ({
			component: DateRefinerComponent,
			props: {
				isOpen: false,
				onRefinerChange: action('Date refiner value'),
				refiner: new DateRefinerDefinition({
					slug: 'closedByDefault',
					title: 'Closed Date Refiner'
				})
			} as IDateRefinerProps
		}),
		{}
	)
	.add(
		'Full `DateRefiner` with Full `DateOption` definitions',
		() => ({
			component: DateRefinerComponent,
			props: {
				onRefinerChange: action('Date Refiner value changed'),
				refiner: new DateRefinerDefinition({
					slug: 'withBadges',
					title: 'Date Refiner with Badges',
					options: {
						today: new DateOption({
							badge: 9999,
							label: 'Today',
							getFrom: () =>
								moment
									.call(null)
									.set('seconds', 0)
									.set('minutes', 0)
									.set('hour', 0)
									.toDate(),
							getTo: () =>
								moment
									.call(null)
									.set('seconds', 0)
									.set('minutes', 0)
									.set('hour', 0)
									.add(1, 'day')
									.toDate(),
							slug: 'today'
						}),
						pastSevenDays: new DateOption({
							badge: 9999999,
							slug: 'pastSevenDays',
							label: 'Past 7 days',
							getFrom: () =>
								moment
									.call(null)
									.set('seconds', 0)
									.set('minutes', 0)
									.set('hour', 0)
									.subtract(7, 'days')
									.toDate(),
							getTo: () =>
								moment
									.call(null)
									.set('seconds', 0)
									.set('minutes', 0)
									.set('hour', 0)
									.add(1, 'day')
									.toDate()
						})
					}
				})
			}
		}),
		{}
	);
