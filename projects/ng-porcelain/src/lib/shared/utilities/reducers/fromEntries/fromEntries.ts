import { IDictionary, Entry } from '../../../types/Containers';

/**
 * A reducer designed to turn an array of Entry tuples into a Dictionary.
 * @example
 * let myEntries = collection.toEntries(); // or anything yielding an Entry 2-tuple [string, any]
 * let myObject = myEntries.reduce(fromEntries, {}); // idiomatic: "reduce from entries."
 */
export function fromEntries<ValueType>(
	result: IDictionary<ValueType>,
	[currentKey, currentValue]: Entry<ValueType>,
	currentIdx: number,
	array: Entry<ValueType>[]
) {
	result[currentKey] = currentValue;
	return result;
}
