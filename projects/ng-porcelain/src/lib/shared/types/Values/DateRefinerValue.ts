import { IDateRefinerValue } from './IDateRefinerValue';
/**
 * Class implementation of an IDateRefiner. Simple construction of a date
 */
export class DateRefinerValue implements IDateRefinerValue {
	optionSlug: string;
	from: Date;
	to: Date;
	constructor(optionSlug?: string, from?: Date, to?: Date) {
		if (optionSlug) {
			this.optionSlug = optionSlug;
		}
		if (from) {
			this.from = from;
		}
		if (to) {
			this.to = to;
		}
	}
}
