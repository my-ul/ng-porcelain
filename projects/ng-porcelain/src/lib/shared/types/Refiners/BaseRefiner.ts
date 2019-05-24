import { SimpleOptions } from '../Options/';
import { SimpleOption } from '../Options/SimpleOption';
import { RefinerType } from './RefinerType';
import { IBaseRefiner } from './IBaseRefiner';
import { RefinerValue } from '../Values';
import { Subject, BehaviorSubject } from 'rxjs';
export abstract class BaseRefiner implements IBaseRefiner {
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

	constructor(refinerDefinition: IBaseRefiner) {
		this.title = refinerDefinition.title ? refinerDefinition.title : '';
		this.slug = refinerDefinition.slug ? refinerDefinition.slug : '';
		this.options = refinerDefinition.options ? refinerDefinition.options : {};
		this.isOpen = typeof refinerDefinition.isOpen === 'boolean' ? refinerDefinition.isOpen : true;
	}
}
