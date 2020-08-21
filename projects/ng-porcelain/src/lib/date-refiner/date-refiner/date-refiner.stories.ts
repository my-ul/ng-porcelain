// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { moduleMetadata } from '@storybook/angular';

// Utilities
import * as _moment from 'moment';

// Porcelain
import { DateOption } from '../../shared/types/Options/DateOption';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';
import { i18nDateOptions } from '../../shared/utilities/i18n/i18nDateOptions/i18nDateOptions';
import { TranslationService } from '../../services/translation/translation.service';

import { DATE_REFINER_IMPORTS } from '../date-refiner.module';
import { DateRefinerComponent, defaultDateOptions, IDateRefinerProps } from './date-refiner.component';

const moment = _moment;

export default {
	title: 'Refiner System/Date Refiner',

	decorators: [
		withNotes,
		withKnobs,
		moduleMetadata({
			imports: DATE_REFINER_IMPORTS,
			providers: [TranslationService]
		})
	],

	parameters: {
		info: {
			inline: true
		}
	}
};

// export const _1 = 'day';

// _1.story = {
// 	name: 1
// };

// export const __1 = 'day';

// __1.story = {
// 	name: 1
// };

export const RestrictToValidCompleteDateRanges = () => ({
	component: DateRefinerComponent,
	props: {
		refiner: new DateRefinerDefinition({
			slug: 'myRefinerDefinition',
			title: 'Simple Date Refiner',
			options: defaultDateOptions
		}),
		onRefinerChange: action('Date Refiner (simple) changed'),
		allowIncompleteEmit: false
	}
});

RestrictToValidCompleteDateRanges.story = {
	name: 'Restrict to valid/complete date ranges',

	parameters: {
		info: {
			header: true,
			inline: true
		}
	}
};

export const I18NFromTranslationService = () => {
	return {
		component: DateRefinerComponent,
		props: {
			refiner: new DateRefinerDefinition({
				slug: 'myRefinerDefinition',
				title: 'Simple Date Refiner',
				options: defaultDateOptions
			}),
			onRefinerChange: action('Date Refiner (simple) changed')
		}
	};
};

I18NFromTranslationService.story = {
	name: 'i18n from TranslationService'
};

export const AllowInvalidIncompleteRanges = () => ({
	component: DateRefinerComponent,
	props: {
		refiner: new DateRefinerDefinition({
			slug: 'myRefinerDefinition',
			title: 'Simple Date Refiner',
			options: defaultDateOptions
		}),
		invalidCustomRangeLabel: 'try again',
		onRefinerChange: action('Date Refiner (simple) changed'),
		shouldEmitIncomplete: false
	}
});

AllowInvalidIncompleteRanges.story = {
	name: 'Allow invalid/incomplete ranges',

	parameters: {
		info: {
			header: true,
			inline: true
		}
	}
};

export const PredefinedCustomDateRange = () => ({
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
	}
});

PredefinedCustomDateRange.story = {
	name: 'Predefined custom date range'
};

export const CustomTranslation = () => ({
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
	}
});

CustomTranslation.story = {
	parameters: {
		info: {
			header: true,
			inline: true
		}
	}
};

export const CustomLabels = () => ({
	component: DateRefinerComponent,
	props: {
		refiner: new DateRefinerDefinition({
			slug: 'myRefinerDefinition',
			title: 'Simple Date Refiner',
			options: defaultDateOptions
		}),
		onRefinerChange: action('Date Refiner (simple) changed')
	}
});

CustomLabels.story = {
	parameters: {
		info: {
			header: true,
			inline: true
		}
	}
};

export const ClosedByDefault = () => ({
	component: DateRefinerComponent,
	props: {
		isOpen: false,
		onRefinerChange: action('Date refiner value'),
		refiner: new DateRefinerDefinition({
			slug: 'closedByDefault',
			title: 'Closed Date Refiner'
		})
	}
});

ClosedByDefault.story = {
	name: 'Closed by default',
	parameters: {}
};

export const FullDateRefinerWithFullDateOptionDefinitions = () => ({
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
});

FullDateRefinerWithFullDateOptionDefinitions.story = {
	name: 'Full `DateRefiner` with Full `DateOption` definitions',
	parameters: {}
};
