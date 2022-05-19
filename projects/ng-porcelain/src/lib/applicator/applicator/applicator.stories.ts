import { APPLICATOR_DIRECTIVES } from '../applicator.module';
// Storybook
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';

// Porcelain
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';
import { i18nDateOptions } from '../../shared/utilities/i18n/i18nDateOptions/i18nDateOptions';

import { APPLICATOR_IMPORTS } from '../applicator.module';
import { ApplicatorComponent } from './applicator.component';
import { toSimpleOptionDictionary } from '../../shared/utilities/toSimpleOptionDictionary';
import {
	usStatesFull,
	usStatesRadioFull
} from '../../simple-refiner/simple-refiner/simple-refiner.stories';
import { DateTime } from 'luxon';
import { SimpleOption } from '../../shared/types/Options/SimpleOption';

const vegetables = {
	tomato: new SimpleOption({ badge: 15, label: 'tomato', slug: 'tomato' }),
	potatoes: new SimpleOption({ badge: 20, label: 'potatoes', slug: 'potatoes' }),
	onion: new SimpleOption({ badge: 30, label: 'onion', slug: 'onion' }),
	peas: new SimpleOption({ badge: 45, label: 'peas', slug: 'peas' }),
	cabbage: new SimpleOption({ badge: 7, label: 'cabbage', slug: 'cabbage' }),
	beetroot: new SimpleOption({ badge: 17, label: 'beetroot', slug: 'beetroot' }),
	spinach: new SimpleOption({ badge: 5, label: 'spinach', slug: 'spinach' }),
	carrot: new SimpleOption({ badge: 5, label: 'carrot', slug: 'carrot' })
};

const fruits = {
	apple: new SimpleOption({ badge: 25, label: 'apple', slug: 'apple' }),
	mango: new SimpleOption({ badge: 12, label: 'mango', slug: 'mango' }),
	grapes: new SimpleOption({ badge: 13, label: 'grapes', slug: 'grapes' }),
	fig: new SimpleOption({ badge: 35, label: 'fig', slug: 'fig' }),
	banana: new SimpleOption({ badge: 27, label: 'banana', slug: 'banana' }),
	watermelon: new SimpleOption({ badge: 11, label: 'watermelon', slug: 'watermelon' }),
	orange: new SimpleOption({ badge: 8, label: 'orange', slug: 'orange' }),
	apricot: new SimpleOption({ badge: 9, label: 'apricot', slug: 'apricot' })
};

const vegetablesRefinersDefaultSelected = new SimpleRefinerDefinition({
	slug: 'vegetables',
	title: 'Vegetables Default Enabled',
	type: 'simple',
	preSelectedValues: ['tomato', 'potatoes'],
	options: vegetables
});

const fruitsRefinersDefaultSelected = new SimpleRefinerDefinition({
	slug: 'fruits',
	title: 'Vegetables Default Enabled',
	type: 'search',
	preSelectedValues: ['apple', 'mango'],
	options: fruits
});

const simpleRefiner = new SimpleRefinerDefinition({
	slug: 'simpleRefiner',
	title: 'Simple Refiner (all selected)',
	selected: ['al', 'ak', 'az'],
	options: {
		al: 'Alabama',
		ak: 'Alaska',
		az: 'Arizona'
	}
});

const anotherSimpleRefiner = new SimpleRefinerDefinition({
	slug: 'anotherSimpleRefiner',
	title: 'Another Simple Refiner',
	type: 'search',
	selected: ['al', 'az'],
	options: toSimpleOptionDictionary({
		al: 'Alabama',
		ak: 'Alaska',
		az: 'Arizona'
	})
});

const searchRefinerStates = new SimpleRefinerDefinition({
	slug: 'searchRefinerStates',
	title: 'search Refiner States',
	type: 'search',
	options: usStatesFull
});
const searchRadioRefinerStates = new SimpleRefinerDefinition({
	slug: 'searchRadioRefinerStates',
	title: 'Select view',
	type: 'radio',
	options: usStatesRadioFull,
	selected: ['AL']
});

const searchRefinerSecondStates = new SimpleRefinerDefinition({
	slug: 'searchRefinerStatesSecond',
	title: 'search Refiner States second Rack',
	type: 'search',

	options: usStatesFull
});

const dateRefiner = new DateRefinerDefinition({
	enableCustomDateRange: false,
	slug: 'dateRefiner',
	title: 'Date Refiner',
	value: {
		from: DateTime.utc()
			.startOf('year')
			.toJSDate(),
		to: DateTime.utc()
			.endOf('year')
			.toJSDate(),
		optionSlug: 'custom'
	},
	options: i18nDateOptions()
});

export default {
	title: 'Refiner System/Applicator',

	decorators: [
		moduleMetadata({
			declarations: APPLICATOR_DIRECTIVES,
			imports: APPLICATOR_IMPORTS
		})
	]
};

export const DefaultNoProps = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			onReset: action('Applicators reset'),
			refiners: [dateRefiner, simpleRefiner, anotherSimpleRefiner]
		}
	};
};

DefaultNoProps.story = {
	name: 'Default (no props)'
};

export const ProvideDefaultValueBehavior = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [simpleRefiner, anotherSimpleRefiner, dateRefiner],
			defaultValues: {
				simpleRefiner: ['al', 'az'],
				anotherSimpleRefiner: ['ak'],
				dateRefiner: {
					optionSlug: 'custom',
					from: '1989-02-14',
					to: '1989-11-06'
				}
			}
		}
	};
};

ProvideDefaultValueBehavior.story = {
	name: 'Provide default value behavior'
};

export const ThrowsErrorsWithInvalidRefinersSeeConsole = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [{}, new Date(), new RegExp('invalid refiner')]
		}
	};
};

ThrowsErrorsWithInvalidRefinersSeeConsole.story = {
	name: 'Throws errors with invalid refiners (see console)'
};

export const SetApplyOnInitToFalse = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [simpleRefiner, dateRefiner, anotherSimpleRefiner],
			applyOnInit: false
		}
	};
};

SetApplyOnInitToFalse.story = {
	name: 'Set applyOnInit to false'
};

export const SearchRefinerStack = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			refiners: [searchRefinerStates, searchRefinerSecondStates, searchRadioRefinerStates]
		}
	};
};

SearchRefinerStack.story = {
	name: 'search refiner stack'
};

export const ProvideCustomDateRange = () => {
	return {
		component: ApplicatorComponent,
		props: {
			enableCustomDateRange: true,
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			refiners: [dateRefiner, simpleRefiner, searchRefinerStates],
			defaultValues: {
				dateRefiner: {
					optionSlug: 'custom'
				}
			}
		}
	};
};

ProvideCustomDateRange.story = {
	name: 'Provide custom date range'
};

export const defaultSelectedOptions = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [vegetablesRefinersDefaultSelected, fruitsRefinersDefaultSelected]
		}
	};
};

defaultSelectedOptions.story = {
	name: 'Options Selected By Default On Reset'
};

export const selectedOptionsOnInitialLoad = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [
				new SimpleRefinerDefinition({
					slug: 'vegetables',
					title: 'Vegetables Default Enabled',
					type: 'simple',
					selected: ['tomato', 'potatoes'],
					options: vegetables
				}),
				new SimpleRefinerDefinition({
					slug: 'fruits',
					title: 'Vegetables Default Enabled',
					type: 'search',
					selected: ['apple', 'mango'],
					options: fruits
				})
			]
		}
	};
};

selectedOptionsOnInitialLoad.story = {
	name: 'Options Selected By Default On Inital Load'
};
