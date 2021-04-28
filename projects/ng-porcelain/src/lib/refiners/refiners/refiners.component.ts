import { Component, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { BaseRefinerDefinition } from '../../shared/types/Refiners/BaseRefinerDefinition';
import { Loggable } from '../../Loggable';
import { isEqual } from 'lodash-es';
import { SearchRefinerComponent } from '../../search-refiner/search-refiner/search-refiner.component';
@Component({
	selector: 'porcelain-refiners, p-refiners',
	templateUrl: './refiners.component.html',
	styleUrls: ['./refiners.component.scss']
})
export class RefinersComponent extends Loggable implements OnInit {
	readonly name = 'RefinersComponent';

	// Inputs
	@Input() refiners: BaseRefinerDefinition[];
	@Input() allowIncompleteEmit: boolean = true;

	// Outputs
	@Output() onRefinersChange: EventEmitter<any> = new EventEmitter();

	//viewchildren refs
	@ViewChildren('searchRef') public searchRefinerCmpRefs: SearchRefinerComponent;

	// Icons

	// State
	values: { [slug: string]: string[] } = {};

	constructor() {
		super();
	}

	ngOnInit() {}

	handleRefinerChange(update: [string, any]) {
		let [slug, selected] = update;

		if (!isEqual(this.values[slug], selected)) {
			this.debug('handleRefinerChange(update)', { before: this.values[slug], after: selected });
			this.setValue(slug, selected);
		}
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

	isSearchRefiner(refiner: BaseRefinerDefinition): boolean {
		return refiner.type === 'search';
	}
}
