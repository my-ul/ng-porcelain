import { RefinerType } from './RefinerType';
import { ISimpleOptions } from '../Options/ISimpleOptions';

export interface IBaseRefiner {
	type?: RefinerType;
	title?: string;
	slug?: string;
	isOpen?: boolean;
	isExpanded?: boolean;
	showCount?: number;
	options?: ISimpleOptions<any, any>;
	//value?: RefinerValue;
}
