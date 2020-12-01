import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
	const strings = ['Apple', 'Banana', 'Cherry', 'Durian'];
	const objects = [
		{ id: '5001', type: 'None' },
		{ id: '5002', type: 'Glazed' },
		{ id: '5005', type: 'Sugar' },
		{ id: '5007', type: 'Powdered Sugar' },
		{ id: '5006', type: 'Chocolate with Sprinkles' },
		{ id: '5003', type: 'Chocolate' },
		{ id: '5004', type: 'Maple' }
	];
	let filterPipe;

	beforeAll(() => {
		filterPipe = new FilterPipe();
	});

	it('can create an instance', () => {
		const pipe = new FilterPipe();
		expect(pipe).toBeTruthy();
	});

	it('can filter strings', () => {
		let expected = [{ index: 0, value: 'Apple' }];
		let actual = filterPipe.transform(strings, 'app');

		expect(actual).toEqual(expected);
	});

	it('can filter objects', () => {
		let expected = [{ index: 6, value: { id: '5004', type: 'Maple' } }];
		let result = filterPipe.transform(objects, 'map', true, 'type');

		expect(result).toEqual(expected);
	});

	it('returns all items when the query is the empty string', () => {
		let expected = strings.map((value, index) => {
			return { index, value };
		});
		let actual = filterPipe.transform(strings, '');

		expect(actual).toEqual(expected);
	});

	it('is not case sensitive', () => {
		let uppercase = filterPipe.transform(strings, 'APP');
		let lowercase = filterPipe.transform(strings, 'app');

		expect(uppercase).toEqual(lowercase);
	});
});
