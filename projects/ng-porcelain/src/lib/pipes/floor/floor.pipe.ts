import { Pipe, PipeTransform } from '@angular/core';
import { isDevMode } from '@angular/core';

@Pipe({
	name: 'floor'
})
export class FloorPipe implements PipeTransform {
	transform(value: any, args?: any): any {
		if (typeof value === 'number') {
			return Math.floor(value);
		} else {
			if (isDevMode()) {
				console.trace('FloorPipe.transform(value) called with non-numeric value.');
			}
			return value;
		}
	}
}
