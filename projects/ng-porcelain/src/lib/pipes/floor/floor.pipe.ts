import { Pipe, PipeTransform } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Loggable } from '../../Loggable';

@Pipe({
	name: 'floor'
})
export class FloorPipe extends Loggable implements PipeTransform {
	name = 'FloorPipe';

	transform(value: any, args?: any): any {
		if (typeof value === 'number') {
			return Math.floor(value);
		} else {
			if (isDevMode()) {
				this.trace('FloorPipe.transform(value) called with non-numeric value.');
			}
			return value;
		}
	}
}
