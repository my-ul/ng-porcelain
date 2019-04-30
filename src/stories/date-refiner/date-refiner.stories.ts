import { IMyDayLabels } from 'mydatepicker';
import { defaultDateOptions } from './../../../projects/ng-porcelain/src/lib/date-refiner/date-refiner/date-refiner.component';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { storiesOf } from '@storybook/angular';

// Utilities
import * as _moment from 'moment';
const moment = _moment;

import {
	IDateRefinerProps,
	DateRefinerComponent
} from 'projects/ng-porcelain/src/lib/date-refiner/date-refiner/date-refiner.component';
import { DATE_REFINER_IMPORTS } from 'projects/ng-porcelain/src/lib/date-refiner/date-refiner.module';
import { DateRefiner, DateOption } from 'projects/ng-porcelain/src/lib/shared/types';
import { i18nDateOptions } from 'projects/ng-porcelain/src/lib/shared/utilities';

// Porcelain

storiesOf('Date Refiner Component', module)
	.addDecorator(withNotes)
	.addDecorator(withKnobs)
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
				refiner: new DateRefiner({
					slug: 'myRefinerDefinition',
					title: 'Simple Date Refiner',
					options: defaultDateOptions
				}),
				onRefinerChange: action('Date Refiner (simple) changed')
			} as IDateRefinerProps,
			moduleMetadata: {
				imports: DATE_REFINER_IMPORTS
			}
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
		'Custom Translation',
		() => ({
			component: DateRefinerComponent,
			props: {
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
				refiner: new DateRefiner({
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
			} as IDateRefinerProps,
			moduleMetadata: {
				imports: DATE_REFINER_IMPORTS
			}
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
				refiner: new DateRefiner({
					slug: 'myRefinerDefinition',
					title: 'Simple Date Refiner',
					options: defaultDateOptions
				}),
				onRefinerChange: action('Date Refiner (simple) changed')
			} as IDateRefinerProps,
			moduleMetadata: {
				imports: DATE_REFINER_IMPORTS
			}
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
			moduleMetadata: {
				imports: DATE_REFINER_IMPORTS
			},
			props: {
				isOpen: false,
				onRefinerChange: action('Date refiner value'),
				refiner: new DateRefiner({
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
			moduleMetadata: {
				imports: DATE_REFINER_IMPORTS
			},
			props: {
				onRefinerChange: action('Date Refiner value changed'),
				refiner: new DateRefiner({
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
