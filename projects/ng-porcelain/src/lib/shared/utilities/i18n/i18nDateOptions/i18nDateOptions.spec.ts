import { i18nDateOptions } from './i18nDateOptions';

describe('i18nDateOptions Utility', () => {
	it('should return English by default', () => {
		const dateOptions = i18nDateOptions();

		let expected = {
			'-1': 'View All',
			'1': 'Today',
			'7': 'Last 7 days',
			'30': 'Last 30 days',
			'90': 'Last 90 days'
		};

		Object
			// Karma/Jasmine doesn't work in an environment with object.entries()
			.keys(expected)
			.map(optionSlug => [optionSlug, expected[optionSlug]])
			.forEach(([expectedSlug, expectedLabel]: [string, string]) => {
				expect(dateOptions[expectedSlug].slug).toEqual(expectedSlug);
				expect(dateOptions[expectedSlug].label).toEqual(expectedLabel);
			});
	});
});
