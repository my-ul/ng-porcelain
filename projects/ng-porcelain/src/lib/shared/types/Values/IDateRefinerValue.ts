/**
 * A simple object representing a date range.
 * Values left null mean there is no upper/lower limit
 */
export interface IDateRefinerValue {
	from?: Date;
	to?: Date;
}
