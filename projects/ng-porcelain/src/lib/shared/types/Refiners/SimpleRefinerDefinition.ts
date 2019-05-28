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
	 * A subject that can be updated and subscribed to for the current value.
	 */
	valueSubject: BehaviorSubject<string[]>;

	constructor(refinerDefinition: ISimpleRefinerDefinition) {
		super(refinerDefinition);

		console.group('SimpleRefiner > constructor(refinerDefinition)');
		// console.log({ refinerDefinition });

		this.type = RefinerType.simple;
		this.showCount = refinerDefinition.showCount ? refinerDefinition.showCount : 5;
		this.isExpanded =
			typeof refinerDefinition.isExpanded === 'boolean' ? refinerDefinition.isExpanded : false;

		this.valueSubject = new BehaviorSubject<string[]>([]);
		if (refinerDefinition.selected) {
			this.valueSubject.next(refinerDefinition.selected);
		}
		console.groupEnd();
	}
}

/**
 * @deprecated Use `SimpleRefinerDefinition` instead of `SimpleRefiner`
 */
export class SimpleRefiner extends SimpleRefinerDefinition {}
