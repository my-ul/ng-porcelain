import { SimpleOption } from './IOption';
import { DateOptions, IDateOptions, ISimpleOptions, SimpleOptions } from './IOptions';
import { RefinerValue } from './IRefinerValue';

export enum RefinerType {
	simple = 'simple',
	date = 'date'
}

export interface IRefinerBase {
	type?: RefinerType;
	title?: string;
	slug?: string;
	isOpen?: boolean;
	isExpanded?: boolean;
	showCount?: number;
	options?: ISimpleOptions<any, any>;
	value?: RefinerValue;
}

export abstract class RefinerBase implements IRefinerBase {
	/**
	 * Refiner type discriminator.  Allows refiners to be JSON serialized
	 */
	type: RefinerType = RefinerType.simple;

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
	isOpen?: boolean = true;

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

	constructor(refinerDefinition: IRefinerBase) {
		this.type = refinerDefinition.type ? refinerDefinition.type : RefinerType.simple;
		this.title = refinerDefinition.title ? refinerDefinition.title : '';
		this.slug = refinerDefinition.slug ? refinerDefinition.slug : '';
		this.options = refinerDefinition.options ? refinerDefinition.options : {};
		this.isOpen = typeof refinerDefinition.isOpen === 'boolean' ? refinerDefinition.isOpen : true;

		this.value = refinerDefinition.value ? refinerDefinition.value : null;
	}
}

export interface ISimpleRefiner extends IRefinerBase {
	selected?: string[];
}

export class SimpleRefiner extends RefinerBase implements ISimpleRefiner {
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
	isExpanded?: boolean = false;

	constructor(refinerDefinition: ISimpleRefiner) {
		super(refinerDefinition);

		this.selected = refinerDefinition.selected ? refinerDefinition.selected : [];
		this.showCount = refinerDefinition.showCount ? refinerDefinition.showCount : 5;
		this.isExpanded =
			typeof refinerDefinition.isExpanded === 'boolean' ? refinerDefinition.isExpanded : false;
	}
}

export interface IDateRefiner extends IRefinerBase {
	options?: IDateOptions;
}

export class DateRefiner extends RefinerBase implements IDateRefiner {
	readonly type = RefinerType.date;

	options?: DateOptions;

	constructor(dateRefiner: IDateRefiner) {
		super(dateRefiner);

		if (dateRefiner) {
			this.options = dateRefiner.options || null;
		}
	}
}
