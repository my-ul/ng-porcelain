import { RefinerType } from './RefinerType';
import { BaseRefiner } from './BaseRefiner';
import { ISimpleRefiner } from './ISimpleRefiner';
import { Subject, BehaviorSubject } from 'rxjs';
export class SimpleRefiner extends BaseRefiner implements ISimpleRefiner {
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

	constructor(refinerDefinition: ISimpleRefiner) {
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
