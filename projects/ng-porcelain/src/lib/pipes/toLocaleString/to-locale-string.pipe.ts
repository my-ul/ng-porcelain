import { Pipe, PipeTransform } from '@angular/core';

export const defaultLocale = navigator.language || 'en-us';
export const defaultDateTimeFormatOptions = {
	month: 'long',
	day: 'numeric',
	year: 'numeric'
};

@Pipe({
	name: 'toLocaleString'
})
export class ToLocaleStringPipe implements PipeTransform {
	transform(
		value: any,
		locale: string = defaultLocale,
		options: Intl.DateTimeFormatOptions = defaultDateTimeFormatOptions
	): any {
		locale = locale || navigator.language || 'en-US';

		if (typeof value === 'number') {
			return value.toLocaleString(locale, options);
		} else if (value instanceof Date) {
			return value.toLocaleDateString(locale, options);
		} else {
			return value;
		}
	}
}
