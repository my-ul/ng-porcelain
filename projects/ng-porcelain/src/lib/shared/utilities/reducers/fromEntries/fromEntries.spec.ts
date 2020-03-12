import { fromEntries } from './fromEntries';
import { Entry } from '../../../types/Containers/Entry/Entry';

describe('`fromEntries` Reducer', () => {
	it('should turn an array of entries into an object', () => {
		let entries: Entry<string>[] = [
			['one', 'One'],
			['two', 'Two'],
			['three', 'Three']
		];

		let obj = entries.reduce(fromEntries, {});

		expect(obj).toEqual({
			one: 'One',
			two: 'Two',
			three: 'Three'
		});
	});
});
