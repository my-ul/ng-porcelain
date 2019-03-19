import { RefinerType } from './RefinerType';
import { BaseRefiner } from './BaseRefiner';
import { ISimpleRefiner } from './ISimpleRefiner';
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
	constructor(refinerDefinition: ISimpleRefiner) {
		super(refinerDefinition);
		this.type = RefinerType.simple;
		this.selected = refinerDefinition.selected ? refinerDefinition.selected : [];
		this.showCount = refinerDefinition.showCount
			? refinerDefinition.showCount
			: 5;
		this.isExpanded =
			typeof refinerDefinition.isExpanded === 'boolean'
				? refinerDefinition.isExpanded
				: false;
	}
}
