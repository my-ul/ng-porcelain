import { RefinerType } from './RefinerType';
import { ISimpleOptions } from '../Options/ISimpleOptions';

export interface IBaseRefinerDefinition {
	type?: RefinerType;
	title?: string;
	slug?: string;
	isOpen?: boolean;
	isExpanded?: boolean;
	showCount?: number;
	options?: ISimpleOptions<any, any>;
	//value?: RefinerValue;
}

/**
 * @deprecated Use `IBaseRefinerDefinition` instead of `IBaseRefiner`. Will be removed at 2.0.0
 */
export interface IBaseRefiner extends IBaseRefinerDefinition {}
