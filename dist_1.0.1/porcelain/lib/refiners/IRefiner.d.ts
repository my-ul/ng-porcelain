import { SimpleOption } from './IOption';
import { DateOptions, IDateOptions, ISimpleOptions, SimpleOptions } from './IOptions';
import { RefinerValue } from './IRefinerValue';
export interface IRefinerBase {
    type?: 'simple' | 'date';
    title?: string;
    slug?: string;
    isOpen?: boolean;
    isExpanded?: boolean;
    showCount?: number;
    options?: ISimpleOptions<any, any>;
    value?: RefinerValue;
}
export declare abstract class RefinerBase implements IRefinerBase {
    /**
     * Refiner type discriminator.  Allows refiners to be JSON serialized
     */
    type: 'simple' | 'date';
    /**
     * Localized string to be shown as a human-readable title for the Refiner
     *
     * @type {string}
     * @memberof Refiner
     */
    title: string;
    /**
     * A "keyable" value that is unique within a refiner set.  Usually the name of a property.
     *
     * @type {string}
     * @memberof Refiner
     */
    slug: string;
    /**
     * Dictionary of optionSlug => label or optionSlug => RefinerOption
     *
     * @type {SimpleOptions}
     * @memberof RefinerDefinition
     */
    options?: SimpleOptions<SimpleOption, any>;
    /**
     * True when the Refiner is to be shown in its open state.
     *
     * @type {boolean}
     * @memberof Refiner
     */
    isOpen?: boolean;
    /**
     * Provide a value if the refiner should initialize with a value.
     *
     * @type {RefinerValue}
     * @memberof Refiner
     */
    value: RefinerValue;
    /**
     * Number of options to show in the refiner in the un-expanded state. Default is 5
     *
     * @type {number}
     */
    showCount?: number;
    constructor(refinerDefinition: IRefinerBase);
}
export interface ISimpleRefiner extends IRefinerBase {
    selected?: string[];
}
export declare class SimpleRefiner extends RefinerBase implements ISimpleRefiner {
    /**
     * Array of slugs to mark as selected on load.
     *
     * @type {string[]}
     */
    selected?: string[];
    /**
     * State for expanded/not expanded. When true, all options will be shown on initial render.
     *
     * @type {boolean}
     * @memberof RefinerBase
     */
    isExpanded?: boolean;
    constructor(refinerDefinition: ISimpleRefiner);
}
export interface IDateRefiner extends IRefinerBase {
    options?: IDateOptions;
}
export declare class DateRefiner extends RefinerBase implements IDateRefiner {
    readonly type: string;
    options?: DateOptions;
    constructor(dateRefiner: IDateRefiner);
}
