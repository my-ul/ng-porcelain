import { Pipe, PipeTransform } from '@angular/core';
import { sprintf } from 'sprintf-js';

@Pipe({
	name: 'sprintf'
})
export class SprintfPipe implements PipeTransform {
	/**
	 * Provides sprintf pipe for templates
	 * @example html
	 * 	<p>USD {{ currencyAmount | sprintf:'%.02f' }}</p>
	 */
	transform(formatString: any, ...args: any[]): any {
		return sprintf(formatString, ...args);
	}
}
