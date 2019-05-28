import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseRefiner } from '../../shared';

@Component({
	selector: 'porcelain-refiners',
	templateUrl: './refiners.component.html',
	styleUrls: ['./refiners.component.scss']
})
export class RefinersComponent implements OnInit {
	// Inputs
	@Input() refiners: BaseRefiner[];

	// Outputs
	@Output() onRefinersChange: EventEmitter<any> = new EventEmitter();

	// Icons

	// State
	values: { [slug: string]: string[] } = {};

	constructor() {}

	ngOnInit() {}

	handleRefinerChange(update: [string, any]) {
		let [slug, selected] = update;

		this.setValue(slug, selected);
	}

	setValue(slug: string, value: any) {
		this.values[slug] = value;
		this.onRefinersChange.emit(this.values);
	}

	isSimpleRefiner(refiner: BaseRefiner): boolean {
		return refiner.type === 'simple';
	}

	isDateRefiner(refiner: BaseRefiner): boolean {
		return refiner.type === 'date';
	}
}
