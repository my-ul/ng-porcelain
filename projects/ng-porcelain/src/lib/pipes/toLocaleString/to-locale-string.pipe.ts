import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'toLocaleString'
})
export class ToLocaleStringPipe implements PipeTransform {
	transform(value: any, locale?: string): any {
		locale == locale || navigator.language || 'en-US';

		if (typeof value === 'number') {
			return value.toLocaleString(locale);
		} else if (value instanceof Date) {
			return value.toLocaleString(locale);
		} else {
			return value;
		}
	}
}
