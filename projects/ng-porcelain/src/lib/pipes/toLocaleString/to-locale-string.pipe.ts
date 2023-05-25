import { Pipe, PipeTransform } from '@angular/core';

export const defaultLocale = navigator.language || 'en-us';
export const defaultDateTimeFormatOptions: Intl.DateTimeFormatOptions = {
	month: 'long',
	day: 'numeric',
	year: 'numeric'
};

@Pipe({
	name: 'toLocaleString',
	pure: true
})
export class ToLocaleStringPipe implements PipeTransform {
	transform(
		value: any,
		locale: string = defaultLocale,
		options: Intl.DateTimeFormatOptions | Intl.NumberFormatOptions = defaultDateTimeFormatOptions
	): any {
		if (typeof value === 'number') {
			return value.toLocaleString(locale, options as Intl.NumberFormatOptions);
		} else if (value instanceof Date) {
			return value.toLocaleString(locale, options as Intl.DateTimeFormatOptions);
		} else {
			return value;
		}
	}
}
