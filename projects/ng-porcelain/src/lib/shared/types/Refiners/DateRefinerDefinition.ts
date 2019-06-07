// rxjs
import { BehaviorSubject } from 'rxjs';

// Library
import { BaseRefinerDefinition } from './BaseRefinerDefinition';
import { DateOptions } from '../Options/DateOptions';
import { DateRefinerValue } from '../Values/DateRefinerValue';
import { i18nDateOptions } from '../../utilities/i18nDateOptions';
import { IDateOption } from '../Options/IDateOption';
import { IDateRefinerDefinition } from './IDateRefinerDefinition';
import { IDateRefinerState } from '../../../date-refiner/date-refiner/date-refiner.component';
import { RefinerType } from './RefinerType';

/**
 * Defines DateRefinerComponent behavior.
 * @since 1.4.0
 */
export class DateRefinerDefinition extends BaseRefinerDefinition implements IDateRefinerDefinition {
	options?: DateOptions;
	value?: DateRefinerValue;
	valueSubject: BehaviorSubject<IDateRefinerState>;
	constructor(dateRefiner: IDateRefinerDefinition) {
		super(dateRefiner);
		this.type = RefinerType.date;

		if (dateRefiner) {
			this.options = dateRefiner.options || i18nDateOptions();
		}

		const firstOption = Object.keys(this.options).map(key => this.options[key])[0] as IDateOption;

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

/**
 * @deprecated Use `DateRefinerDefinition` instead of `DateRefiner`
 */
export class DateRefiner extends DateRefinerDefinition {}
