import { IDateRefinerValue } from './IDateRefinerValue';
/**
 * Class implementation of an IDateRefiner. Simple construction of a date
 */
export class DateRefinerValue implements IDateRefinerValue {
	from: Date;
	to: Date;
	constructor(from?: Date, to?: Date) {
		if (from) {
			this.from = from;
		}
		if (to) {
			this.to = to;
		}
	}
}
