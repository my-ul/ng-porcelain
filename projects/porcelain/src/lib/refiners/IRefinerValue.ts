/**
 * An array of option slugs to be shown as "selected" upon initialization
 */
export type OptionRefinerValue = Array<string>;

/**
 * A simple object representing a date range.
 * Values left null mean there is no upper/lower limit
 */
export interface IDateRefinerValue {
	from?: Date;
	to?: Date;
}

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

export type RefinerValue = DateRefinerValue | OptionRefinerValue;
