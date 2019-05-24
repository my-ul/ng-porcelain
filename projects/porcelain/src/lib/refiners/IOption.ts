export interface ISimpleOption {
	badge?: string | number;
	label: string;
	slug: string;
	isSelected?: boolean;
}

export class SimpleOption implements ISimpleOption {
	/**
	 * A badge can be shown next to the label.  A badge can be used to indicate how many records an Option represents
	 *
	 * @example
	 * 		[X] In Progress		2,900	{	slug: 'inProgress'; 	isSelected: true;	badge: 2900 }
	 * 		[ ] On Hold			2,500	{	slug: 'onHold'			isSelected: false;	badge: 2500 }
	 * 		[ ] Slipping		500		{	slug: 'slipping';		isSelected: false;	badge: 500 }
	 */
	badge?: string | number;

	/**
	 * A translated, human-readable label representing of the option.
	 */
	label: string;

	/**
	 * A keyable, serializable name/representation of the Option, such as 'inProgress'
	 */
	slug: string;

	/**
	 * A default value for the option.
	 */
	isSelected?: any;

	/**
	 * Create an instance of Option from an IOption. If incoming IOption fields are present, they will be set.
	 * @param {ISimpleOption} simpleOption
	 * @memberof Option
	 */
	constructor(simpleOption?: ISimpleOption) {
		if (simpleOption) {
			this.badge = simpleOption.badge ? simpleOption.badge : null;
			this.label = simpleOption.label ? simpleOption.label : '';
			this.slug = simpleOption.slug ? simpleOption.slug : '';
			this.isSelected = simpleOption.isSelected ? simpleOption.isSelected : null;
		}
	}
}

export interface IDateOption extends ISimpleOption {
	getFrom: (fromString?: string) => Date;
	getTo: (toString?: string) => Date;
}

/**
 * Represents a date range option within a Date Refiner
 *
 * @example
 * ```typescript
 * 	import { DateOption } from '../path/to/IOption.ts'
 *
 * 	@Component({})
 * 	export class MyComponent {
 * 		modifiedOnRefiner = {
 * 			dateOptionSlug: new DateOption({
 * 				badge: '1',
 * 				label: 'Modified on...',
 * 				slug: 'modified',
 * 				value: false,
 * 				getFrom: () => getYesterday(),
 * 				getTo: () => getToday()
 * 			})
 * 		};
 * 	}
 * ```
 *
 * And then in
 */
export class DateOption extends SimpleOption implements IDateOption {
	/**
	 * Function to generate the start value for the date refiner range.  If no start value, return null.
	 */
	getFrom: (fromString: string) => Date;

	/**
	 * Function to generate the end (to) value for the date refiner range. If no end value is needed, return null.
	 *
	 * @param toString {string} A string to parse, representing the later date.
	 * @returns a Date object (or null) representing the value parsed from `toString`
	 */
	getTo: (toString: string) => Date;

	constructor(dateOptionDefinition: IDateOption) {
		super(dateOptionDefinition);

		const returnNull = () => null;

		if (dateOptionDefinition) {
			this.getFrom = dateOptionDefinition.getFrom || returnNull;
			this.getTo = dateOptionDefinition.getTo || returnNull;
		}
	}
}
