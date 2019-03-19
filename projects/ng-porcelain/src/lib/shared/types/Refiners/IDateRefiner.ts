import { IDateOptions } from '../Options/';
import { IBaseRefiner } from './IBaseRefiner';
export interface IDateRefiner extends IBaseRefiner {
	options?: IDateOptions;
}
