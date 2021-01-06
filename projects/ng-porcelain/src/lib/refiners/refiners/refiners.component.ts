import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseRefinerDefinition } from '../../shared/types/Refiners/BaseRefinerDefinition';

@Component({
	selector: 'porcelain-refiners, p-refiners',
	templateUrl: './refiners.component.html',
	styleUrls: ['./refiners.component.scss']
})
export class RefinersComponent implements OnInit {
	// Inputs
	@Input() refiners: BaseRefinerDefinition[];
	@Input() allowIncompleteEmit: boolean = true;

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

	isSimpleRefiner(refiner: BaseRefinerDefinition): boolean {
		return refiner.type === 'simple';
	}

	isDateRefiner(refiner: BaseRefinerDefinition): boolean {
		return refiner.type === 'date';
	}
}
