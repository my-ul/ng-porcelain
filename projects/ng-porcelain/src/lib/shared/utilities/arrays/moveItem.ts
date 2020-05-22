/**
 * Moves item at arr[sourceIdx] to arr[destIdx]
 */
export function moveItem<U>(arr: U[], sourceIdx, destIdx) {
	// remove `from` item and store it
	const item = arr.splice(sourceIdx, 1)[0];
	// insert stored item into position `to`
	arr.splice(destIdx, 0, item);
}
