import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { BaseRefinerDefinition } from '../../shared/types/Refiners/BaseRefinerDefinition';
import { Loggable } from '../../Loggable';
import { isEqual } from 'lodash-es';
import { SearchRefinerComponent } from '../../search-refiner/search-refiner/search-refiner.component';
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';

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
	@Input() disable: boolean = false; /*Sets the disable flag to disable refiners in required apps*/

	// Outputs
	@Output() onRefinersChange: EventEmitter<any> = new EventEmitter();

	//viewchildren refs
	@ViewChildren('searchRef') public searchRefinerCmpRefs: QueryList<SearchRefinerComponent>;

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

	isSimpleRefiner(refiner: BaseRefinerDefinition): refiner is SimpleRefinerDefinition {
		return refiner.type === 'simple';
	}
	isSimpleRadioRefiner(refiner: BaseRefinerDefinition): refiner is SimpleRefinerDefinition {
		return refiner.type === 'radio';
	}
	isDateRefiner(refiner: BaseRefinerDefinition): refiner is DateRefinerDefinition {
		return refiner.type === 'date';
	}

	isSearchRefiner(refiner: BaseRefinerDefinition): refiner is SimpleRefinerDefinition {
		return refiner.type === 'search';
	}
}
