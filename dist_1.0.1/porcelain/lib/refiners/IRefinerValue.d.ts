/**
 * An array of option slugs to be shown as "selected" upon initialization
 */
export declare type OptionRefinerValue = Array<string>;
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
export declare class DateRefinerValue implements IDateRefinerValue {
    from: Date;
    to: Date;
    constructor(from?: Date, to?: Date);
}
export declare type RefinerValue = DateRefinerValue | OptionRefinerValue;
