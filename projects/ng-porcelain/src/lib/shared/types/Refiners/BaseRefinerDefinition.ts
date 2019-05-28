// Imports
import { Subject, BehaviorSubject } from 'rxjs';

// Library
import { IBaseRefinerDefinition } from './IBaseRefinerDefinition';
import { RefinerType } from './RefinerType';
import { SimpleOption } from '../Options/SimpleOption';
import { SimpleOptions } from '../Options/SimpleOptions';
import { RefinerValue } from '../Values/RefinerValue';

/**
 * Abstract refiner definition. Can be used for typing arrays of mixed refiner types.
 *
 * @since 1.4.0
 * @example
 * 		let refiners: BaseRefinerDefinition[] = [];
 */
export abstract class BaseRefinerDefinition implements IBaseRefinerDefinition {
	/**
	 * Refiner type discriminator.  Allows refiners to be JSON serialized
	 */
	type: RefinerType;
	/**
	 * Localized string to be shown as a human-readable title for the Refiner
	 *
	 */
	title: string;
	/**
	 * A "keyable" value that is unique within a refiner set.  Usually the name of a property.
	 */
	slug: string;
	/**
	 * Dictionary of optionSlug => label or optionSlug => RefinerOption
	 */
	options?: SimpleOptions<SimpleOption, any>;
	/**
	 * True when the Refiner is to be shown in its open state.
	 *
	 */
	isOpen?: boolean = true;
	/**
	 * Provide a value if the refiner should initialize with a value.
	 *
	 * @deprecated
	 */
	value?: RefinerValue;

	/**
	 * Number of options to show in the refiner in the un-expanded state. Default is 5
	 *
	 */
	showCount?: number;

	valueSubject: Subject<any>;

	constructor(refinerDefinition: IBaseRefinerDefinition) {
		this.title = refinerDefinition.title ? refinerDefinition.title : '';
		this.slug = refinerDefinition.slug ? refinerDefinition.slug : '';
		this.options = refinerDefinition.options ? refinerDefinition.options : {};
		this.isOpen = typeof refinerDefinition.isOpen === 'boolean' ? refinerDefinition.isOpen : true;
	}
}

/**
 * @deprecated Use `BaseRefinerDefinition` instead of `BaseRefiner`
 */
export abstract class BaseRefiner extends BaseRefinerDefinition {}
