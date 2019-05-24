import { Subject, BehaviorSubject } from 'rxjs';
import { DateOptions } from '../Options/';
import { DateRefinerValue } from '../Values/DateRefinerValue';
import { IDateRefinerState } from './../../../date-refiner/date-refiner/date-refiner.component';
import { BaseRefiner } from './BaseRefiner';
import { IDateRefiner } from './IDateRefiner';
import { RefinerType } from './RefinerType';
import { first } from 'rxjs/operators';
import { i18nDateOptions } from '../../utilities';

export class DateRefiner extends BaseRefiner implements IDateRefiner {
	options?: DateOptions;
	value?: DateRefinerValue;
	valueSubject: BehaviorSubject<IDateRefinerState>;
	constructor(dateRefiner: IDateRefiner) {
		super(dateRefiner);
		this.type = RefinerType.date;

		if (dateRefiner) {
			this.options = dateRefiner.options || i18nDateOptions();
		}

		const firstOption = Object.values(this.options)[0];

		this.valueSubject = new BehaviorSubject<IDateRefinerState>(
			dateRefiner.value
				? {
						from: dateRefiner.value.from,
						optionSlug: dateRefiner.value.optionSlug,
						to: dateRefiner.value.to
				  }
				: {
						from: firstOption.getFrom(null),
						optionSlug: firstOption.slug,
						to: firstOption.getTo(null)
				  }
		);
	}
}
