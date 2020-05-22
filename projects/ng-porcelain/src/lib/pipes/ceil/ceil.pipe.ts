import { Pipe, PipeTransform } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Loggable } from '../../Loggable';

@Pipe({
	name: 'ceil'
})
export class CeilPipe extends Loggable implements PipeTransform {
	name = 'CeilPipe';
	/**
	 * Applies numeric ceil operation to a value
	 */
	transform(value: any): any {
		if (typeof value === 'number') {
			return Math.ceil(value);
		} else {
			if (isDevMode()) {
				this.trace('CeilPipe.transform(value) called with non-numeric value.');
			}
			return value;
		}
	}
}
