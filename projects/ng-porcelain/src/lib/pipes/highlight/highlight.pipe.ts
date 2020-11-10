import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
	transform(value: string, highlight: string): string {
		if (!highlight) return value;
		let re = new RegExp(highlight, 'gi');
		return value.replace(re, `<mark class="highlight__query">$&</mark>`);
	}
}
