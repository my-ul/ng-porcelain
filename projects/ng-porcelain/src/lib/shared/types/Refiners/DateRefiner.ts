// rxjs
import { BehaviorSubject } from 'rxjs';

// Library
import { BaseRefiner } from './BaseRefiner';
import { DateOptions } from '../Options/DateOptions';
import { DateRefinerValue } from '../Values/DateRefinerValue';
import { i18nDateOptions } from '../../utilities/i18nDateOptions';
import { IDateOption } from '../Options/IDateOption';
import { IDateRefiner } from './IDateRefiner';
import { IDateRefinerState } from './../../../date-refiner/date-refiner/date-refiner.component';
import { RefinerType } from './RefinerType';

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

		const firstOption = Object.values(this.options)[0] as IDateOption;

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
