import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { BaseRefinerDefinition } from '../../shared/types/Refiners/BaseRefinerDefinition';

//simplerefiner import

import { SimpleRefinerComponent } from '../../simple-refiner/simple-refiner/simple-refiner.component';

@Component({
	selector: 'porcelain-refiners',
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

	//view children components to clear values
	@ViewChildren(SimpleRefinerComponent) Simplerefiners: QueryList<SimpleRefinerComponent>;

	// State
	values: { [slug: string]: string[] } = {};

	constructor() {}

	ngOnInit() {}

	public clearSearchTextOfSimpleRefiners(): void {
		//clear all the queries of simple refiners if exists in DOM
		if (this.Simplerefiners) {
			this.Simplerefiners.forEach(x => {
				x.clear();
			});
		}
	}

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
