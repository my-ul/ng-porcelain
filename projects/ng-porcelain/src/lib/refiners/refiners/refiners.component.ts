import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { BaseRefinerDefinition } from '../../shared/types/Refiners/BaseRefinerDefinition';
import { Loggable } from '../../Loggable';
import { isEqual } from 'lodash-es';
import { SearchRefinerComponent } from '../../search-refiner/search-refiner/search-refiner.component';
import { DateRefinerComponent } from '../../date-refiner/date-refiner/date-refiner.component';
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
	@Input() enableCustomDateRange: boolean = false; //flag to enable custom date range options in CP apps
	// @Input() isOpen: boolean;

	private _isOpen: boolean = true;

	@Input() set isOpen(value: boolean) {
		if (value !== this._isOpen) {
			this._isOpen = value;
			this.isOpenChange.emit(this._isOpen);
		}
	}

	@Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	// Outputs
	@Output() onRefinersChange: EventEmitter<any> = new EventEmitter();
	@Output() updateDateRefinerStackValidityStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

	//viewchildren refs
	@ViewChildren('searchRef') public searchRefinerCmpRefs: QueryList<SearchRefinerComponent>;

	@ViewChildren('dateRefinerRef') public dateRefinerCmpRefs: QueryList<DateRefinerComponent>;

	//booleans

	/**
	 * boolen to track invalid date refiner stacks in case it exists
	 * */
	public isDateRefinerStacksInvalid: boolean = false;
	// Icons

	// State
	values: { [slug: string]: string[] } = {};

	constructor() {
		super();
	}

	ngOnInit() {}

	handleRefinerChange(update: [string, any]) {
		this.updateDateRefinerStackInputStatus();

		let [slug, selected] = update;

		if (!isEqual(this.values[slug], selected)) {
			this.debug('handleRefinerChange(update)', { before: this.values[slug], after: selected });
			this.setValue(slug, selected);
		}
	}

	/**
	 * Updates status of invalid Date refiner if it exists in date refiner stacks
	 * @param dateEventTriggerd
	 */

	updateDateRefinerStackInputStatus(dateEventTriggerd: boolean = true) {
		if (this.dateRefinerCmpRefs) {
			let invalidDateRefinerCmps = this.dateRefinerCmpRefs
				.toArray()
				.filter(dateRefinerCmpRef => dateRefinerCmpRef.isCustomDateRangeInvalid == true);

			//if any of date refiner is invalide then there is error in date refiner stacks, update the status in flag and emit to parent component

			this.isDateRefinerStacksInvalid = invalidDateRefinerCmps.length > 0 ? true : false;
		} else {
			this.isDateRefinerStacksInvalid = false;
		}

		this.updateDateRefinerStackValidityStatus.emit(this.isDateRefinerStacksInvalid);
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
