import { IDictionary } from '../types/IDictionary';

/**
 * A type that allows typed use of Object.entries(subj).
 *
 * @example
 * let myEntries = collection.toEntries() as Entry<CollectionItem>[];
 */
type Entry<ValueType> = [string, ValueType];

/**
 * A reducer designed to turn an array of Entry tuples into a Dictionary.
 * @example
 * let myEntries = collection.toEntries(); // or anything yielding an Entry 2-tuple [string, any]
 * let myObject = myEntries.reduce(fromEntries, {}); // idiomatic: "reduce from entries."
 */
function fromEntries<ValueType>(
	result: IDictionary<ValueType>,
	[currentKey, currentValue]: Entry<ValueType>
) {
	result[currentKey] = currentValue;
	return result;
}
