import { ToLocaleStringPipe } from './to-locale-string.pipe';

describe('ToLocaleStringPipe', () => {
	it('create an instance', () => {
		const pipe = new ToLocaleStringPipe();
		expect(pipe).toBeTruthy();
	});

	it('should format numbers', () => {
		const pipe = new ToLocaleStringPipe();
		const outcomes = {
			'en-US': '1,234.55',
			'zh-tw': '1,234.55',
			'zh-cn': '1,234.55',
			'de-DE': '1.234,55',
			'fr-CA': '1' + String.fromCharCode(160) + '234,55', // non-breaking space
			'ja-JP': '1,234.55',
			'ko-KR': '1,234.55',
			'es-MX': '1234.55'
		};
		const value = 1234.55;
		for (let locale in outcomes) {
			let expected = outcomes[locale];
			let actual = pipe.transform(value, locale);
			expect(actual).toBe(expected);
		}
	});

	it('should format dates', () => {
		const pipe = new ToLocaleStringPipe();
		const outcomes = {
			'en-US': '1/2/2020, 12:00:00 AM',
			'fr-FR': '02/01/2020 à 00:00:00',
			'ja-JP': '2020/1/2 0:00:00'
		};
		const value = new Date(2020, 0, 2, 0, 0, 0, 0);
		for (let locale in outcomes) {
			let expectedFormat = outcomes[locale];
			expect(pipe.transform(value, locale)).toEqual(expectedFormat);
		}
	});

	it('should pass through non-numeric/non-date types.', () => {
		const pipe = new ToLocaleStringPipe();
		['string', true, false, new RegExp('^.*$'), [], {}].forEach(val =>
			expect(pipe.transform(val)).toEqual(val)
		);
	});
});
