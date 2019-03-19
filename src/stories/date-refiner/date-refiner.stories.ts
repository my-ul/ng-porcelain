import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { storiesOf } from '@storybook/angular';

// Utilities
import * as moment from 'moment';

import {
	IDateRefinerProps,
	DateRefinerComponent
} from 'projects/ng-porcelain/src/lib/date-refiner/date-refiner/date-refiner.component';
import { DATE_REFINER_IMPORTS } from 'projects/ng-porcelain/src/lib/date-refiner/date-refiner.module';
import { DateRefiner, DateOption } from 'projects/ng-porcelain/src/lib/shared/types';

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
					options: null // use the default options
					//type: 'date',
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
								moment()
									.set('seconds', 0)
									.set('minutes', 0)
									.set('hour', 0)
									.toDate(),
							getTo: () =>
								moment()
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
								moment()
									.set('seconds', 0)
									.set('minutes', 0)
									.set('hour', 0)
									.subtract(7, 'days')
									.toDate(),
							getTo: () =>
								moment()
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
