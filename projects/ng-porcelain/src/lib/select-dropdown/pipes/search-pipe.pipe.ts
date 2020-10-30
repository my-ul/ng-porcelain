import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
	transform(
		items: any[],
		searchText: string,
		isArrayobj: boolean = false,
		fieldName: string = ''
	): any[] {
		//return empty array if empty array is passed
		if (!items) {
			return [];
		}
		//if no search text return empty items
		if (!searchText) {
			return items;
		}
		//convert all searchtext into lowercase
		searchText = searchText.toLowerCase();

		//incase sent array is array of objects containing feilds
		if (isArrayobj) {
			//filter items and check for search text with includes
			return items.filter(item => {
				if (item && item[fieldName]) {
					return item[fieldName].toLowerCase().includes(searchText);
				}
				return false;
			});
		}
		//if array is just normal one
		else {
			//filter items and check for search text with includes
			return items.filter(item => {
				return item.toLowerCase().includes(searchText);
			});
		}
	}
}
