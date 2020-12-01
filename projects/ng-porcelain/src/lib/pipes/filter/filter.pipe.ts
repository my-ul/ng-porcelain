import { Pipe, PipeTransform } from '@angular/core';

export interface FilterItem {
	index: number;
	value: any;
}

/**
 * Filters an array for consumption by an angular *ngFor expression.
 * @example
 * 	```html
 * 	<input [(ngModel)]="searchQuery" placeholder="filter the list...">
 * 	<li *ngFor="let item of items | filter : searchQuery">
 * 		{{item}}
 * 	</li>
 * 	```
 */
@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	transform(
		items: any[],
		query: string,
		isObjectArray: boolean = false,
		labelProp: string = ''
	): FilterItem[] {
		// If there's no search string yet, return all items
		if (!query) {
			return items.map((value, index) => ({ index, value }));
		}

		query = query.toLowerCase();

		// By dynamically asigning the getLabel function,
		// the reduce function is much easier to maintain and read.
		const getLabel = isObjectArray ? item => item[labelProp] : item => item;

		return items.reduce((result, value, index) => {
			if (
				getLabel(value)
					.toLowerCase()
					.indexOf(query) > -1
			) {
				// return result array with this item added
				return [...result, { index, value }];
			} else {
				// return result array without this item added
				return result;
			}
		}, [] as FilterItem[]);
	}
}
