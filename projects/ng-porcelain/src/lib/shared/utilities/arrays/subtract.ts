/**
 * Subtracts one set(subtrahend) from another(minuend).
 * @param minuend Set of all items for which subtrahend will be removed.
 * @param subtrahend Set of items to remove from minuend.
 */
export function subtract<T>(minuend: T[], subtrahend: T[]): T[] {
	return minuend.filter(item => subtrahend.indexOf(item) === -1);
}
