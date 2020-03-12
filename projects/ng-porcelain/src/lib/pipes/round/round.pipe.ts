import { Pipe, PipeTransform, isDevMode } from '@angular/core';
import { Loggable } from '../../Loggable';

@Pipe({
	name: 'round'
})
export class RoundPipe extends Loggable implements PipeTransform {
	name = 'RoundPipe';
	transform(value: any, args?: any): any {
		if (typeof value === 'number') {
			return Math.round(value);
		} else {
			if (isDevMode()) {
				this.trace('RoundPipe.transform(value) called with non-numeric value.');
			}
			return value;
		}
	}
}
