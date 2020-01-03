import { Pipe, PipeTransform, isDevMode } from '@angular/core';

@Pipe({
	name: 'round'
})
export class RoundPipe implements PipeTransform {
	transform(value: any, args?: any): any {
		if (typeof value === 'number') {
			return Math.round(value);
		} else {
			if (isDevMode()) {
				console.trace('RoundPipe.transform(value) called with non-numeric value.');
			}
			return value;
		}
	}
}
