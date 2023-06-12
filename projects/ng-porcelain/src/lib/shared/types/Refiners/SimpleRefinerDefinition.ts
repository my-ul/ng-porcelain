import { RefinerType } from './RefinerType';
import { BaseRefinerDefinition } from './BaseRefinerDefinition';
import { ISimpleRefinerDefinition } from './ISimpleRefinerDefinition';
import { Subject, BehaviorSubject } from 'rxjs';

/**
 * Class used to define Simple Refiner component behavior.
 * @since 1.4.0
 */
export class SimpleRefinerDefinition extends BaseRefinerDefinition implements ISimpleRefinerDefinition {
	/**
	 * Array of slugs to mark as selected on load.
	 */
	selected?: string[];

	/**
	 * State for expanded/not expanded. When true, all options will be shown on initial render.
	 *
	 */
	isExpanded?: boolean = false;

	/**
	 * stores default preselect Values. When reset button is hit these refiners will be selected by default
	 * */
	defaultPreSelectValues?: string[] = [];

	/**
	 * If there is value in tooltip text then tooltip would displayed radio refiner
	 */
	tooltipText?: string = '';
	/**
	 * By default references the image present in assets folder inside porcelain. Just pass on the image URL located in your application directory
	 * */
	badge?: string | number = '';

	/**
	 * A subject that can be updated and subscribed to for the current value.
	 */
	valueSubject: BehaviorSubject<string[]>;

	constructor(refinerDefinition: ISimpleRefinerDefinition) {
		super(refinerDefinition);
		/**
		 * Set the refiner type according to the definition type string.
		 * The search option will display a
		 */
		this.type = refinerDefinition.type ? refinerDefinition.type : 'simple';

		/**
		 * Set the default showCount value.  This affects the Show %s More and Show Less button.
		 */
		this.showCount = refinerDefinition.showCount ? refinerDefinition.showCount : 5;

		/**
		 * Determines whether expandos are open or closed by default.
		 */
		this.isExpanded =
			typeof refinerDefinition.isExpanded === 'boolean' ? refinerDefinition.isExpanded : false;
		this.tooltipText = refinerDefinition.tooltipText ? refinerDefinition.tooltipText : '';
		this.badge = refinerDefinition.badge ? refinerDefinition.badge : '';
		/**
		 * Used to send new selection values to subscribers
		 */
		this.valueSubject = new BehaviorSubject<string[]>([]);

		if (refinerDefinition.selected) {
			this.valueSubject.next(refinerDefinition.selected);
		}

		if (refinerDefinition.preSelectedValues) {
			this.defaultPreSelectValues = refinerDefinition.preSelectedValues.map(
				defaultSelectedValue => defaultSelectedValue
			);
			this.valueSubject.next(refinerDefinition.preSelectedValues);
		}
	}
}

/**
 * @deprecated Use `SimpleRefinerDefinition` instead of `SimpleRefiner`
 */
export class SimpleRefiner extends SimpleRefinerDefinition {}
