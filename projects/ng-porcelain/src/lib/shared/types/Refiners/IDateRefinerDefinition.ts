import { IDateRefinerDefinition } from './IDateRefinerDefinition';
import { IBaseRefinerDefinition } from './IBaseRefinerDefinition';
import { IDateOptions } from '../Options/IDateOptions';
import { IDateRefinerValue } from '../Values/IDateRefinerValue';

/**
 * Defines a plain javascript object passed to DateRefinerDefinition constructor.
 * @since 1.4.0
 */
export interface IDateRefinerDefinition extends IBaseRefinerDefinition {
	options?: IDateOptions;
	value?: IDateRefinerValue;
}

/**
 * @deprecated Use `IDateRefinerDefinition` instead of `IDateRefiner`
 */
export interface IDateRefiner extends IDateRefinerDefinition {}
