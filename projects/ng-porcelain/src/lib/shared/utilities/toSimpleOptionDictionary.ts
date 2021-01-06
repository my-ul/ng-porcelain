import { IDictionary } from '../types/Containers/IDictonary/IDictionary';
import { SimpleOption } from '../types/Options/SimpleOption';
import { fromEntries } from './reducers/fromEntries/fromEntries';

/**
 * Converts string dictionaries to SimpleOption dictionary to be be used as the refiner.options property.
 * @param dict A string => string dictionary that should be converted to a SimpleOption dictionary
 */
export function toSimpleOptionDictionary(dict: IDictionary<string>): IDictionary<SimpleOption> {
	return Object.keys(dict)
		.map(slug => {
			const label = dict[slug];
			return [
				slug,
				new SimpleOption({
					slug,
					label
				})
			];
		})
		.reduce(fromEntries, {});
}
