import { SimpleOption } from './SimpleOption';
import { IDateOption } from './IDateOption';
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
	getFrom: (fromString: string | Date) => Date;
	/**
	 * Function to generate the end (to) value for the date refiner range. If no end value is needed, return null.
	 *
	 * @param toString A string to parse, representing the later date.
	 * @returns a Date object (or null) representing the value parsed from `toString`
	 */
	getTo: (toString: string | Date) => Date;
	constructor(dateOptionDefinition: IDateOption) {
		super(dateOptionDefinition);
		const returnNull = () => null;
		if (dateOptionDefinition) {
			this.getFrom = dateOptionDefinition.getFrom || returnNull;
			this.getTo = dateOptionDefinition.getTo || returnNull;
		}
	}
}
