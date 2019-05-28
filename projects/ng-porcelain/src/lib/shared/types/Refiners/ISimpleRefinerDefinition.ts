import { IBaseRefinerDefinition } from './IBaseRefinerDefinition';

/**
 * Simple object version of a SimpleRefinerDefinition.
 * Pass any ISimpleRefinerDefinition to the SimpleRefinerDefinition constructor.
 * @since 1.4.0
 */
export interface ISimpleRefinerDefinition extends IBaseRefinerDefinition {
	selected?: string[];
}

/**
 * @deprecated Since 1.4.0. Use `ISimpleRefinerDefinition` instead of `ISimpleRefiner`.
 */
export interface ISimpleRefiner extends ISimpleRefinerDefinition {}
