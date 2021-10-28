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
import { usStatesFull } from '../../simple-refiner/simple-refiner/simple-refiner.stories';
import { DateTime } from 'luxon';

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

const searchRefinerSecondStates = new SimpleRefinerDefinition({
	slug: 'searchRefinerStatesSecond',
	title: 'search Refiner States second Rack',
	type: 'search',
	options: usStatesFull
});

const dateRefiner = new DateRefinerDefinition({
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
			refiners: [simpleRefiner, searchRefinerStates, searchRefinerSecondStates]
		}
	};
};

SearchRefinerStack.story = {
	name: 'search refiner stack'
};
