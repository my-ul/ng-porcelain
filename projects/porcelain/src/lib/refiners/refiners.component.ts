import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RefinerBase } from './IRefiner';

@Component({
	selector: 'porcelain-refiners',
	templateUrl: './refiners.component.html',
	styleUrls: ['./refiners.component.scss']
})
export class RefinersComponent implements OnInit {
	// Inputs
	@Input() refiners: RefinerBase[];

	// Outputs
	@Output() onRefinersChange: EventEmitter<any> = new EventEmitter()

	// Icons

	// State
	values: { [slug: string]: string[] } = {};

	constructor() {}

	ngOnInit() {
	}

	handleRefinerChange(update: [string, any ]) {
		let [slug, selected] = update;
		console.log(`${slug} refiner updated with value`, selected);

		this.setValue(slug, selected);
	}

	setValue(slug: string, value: any) {
		this.values[slug] = value;
		this.onRefinersChange.emit(this.values)
	}

	toQueryString(): string {
		return Object.keys(this.values)
			.reduce((result, paramKey) => {
				if ( // None are selected, return result so far
					Array.isArray(this.values[paramKey]) &&
					this.values[paramKey].length === 0
				) {
					return result;
				} else if ( // Some are selected, return result + new options
					Array.isArray(this.values[paramKey]) &&
					this.values[paramKey].length > 0
				) {
					return [
						...result,
						encodeURIComponent(paramKey) +
							'=' +
							this.values[paramKey]
								.map(val => encodeURIComponent(val))
								.join(',')
					];
				} else if ( // Is an object, like a dictionary (start, end date)
					typeof this.values[paramKey] === 'object'
				) {
					return [
						...result,
						Object.keys(this.values[paramKey])
							.map(nestedKey => {
								let valueToEncode =
									this.values[paramKey][nestedKey] instanceof
									Date
										? this.values[paramKey][
												nestedKey
										  ].toJSON()
										: this.values[paramKey][nestedKey];
								return (
									`${encodeURIComponent(
										paramKey
									)}[${encodeURIComponent(nestedKey)}]` +
									'=' +
									encodeURIComponent(valueToEncode)
								);
							})
							.join('&')
					];
				}
			}, [])
			.join('&');
	}
}
