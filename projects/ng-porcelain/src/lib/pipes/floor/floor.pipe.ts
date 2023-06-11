import { Pipe, PipeTransform, isDevMode } from '@angular/core';

@Pipe({
	name: 'floor'
})
export class FloorPipe implements PipeTransform {
	name = 'FloorPipe';

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
