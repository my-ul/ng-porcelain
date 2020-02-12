import { Pipe, PipeTransform } from '@angular/core';
import { isDevMode } from '@angular/core';

@Pipe({
	name: 'ceil'
})
export class CeilPipe implements PipeTransform {
	/**
	 * Applies numeric ceil operation to a value
	 */
	transform(value: any): any {
		if (typeof value === 'number') {
			return Math.ceil(value);
		} else {
			if (isDevMode()) {
				console.trace('CeilPipe.transform(value) called with non-numeric value.');
			}
			return value;
		}
	}
}
