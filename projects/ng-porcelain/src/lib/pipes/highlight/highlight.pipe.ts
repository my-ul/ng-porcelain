import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
	transform(value: string, highlight: string): string {
		if (value.toString().includes('<')) {
			let valuedup = value.replace(/\<(.+?)\>/g, '');
			if (!highlight) return value;
			value = value.replace(valuedup, '--');
			let re = new RegExp(highlight, 'gi');
			valuedup = valuedup.replace(re, `<mark class="highlight__query">$&</mark>`);
			return value.replace('--', valuedup);
		} else {
			if (!highlight) return value;
			let re = new RegExp(highlight, 'gi');
			return value.replace(re, `<mark class="highlight__query">$&</mark>`);
		}
	}
}
