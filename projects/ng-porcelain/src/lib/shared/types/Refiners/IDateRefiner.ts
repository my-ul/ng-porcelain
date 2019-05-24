import { IDateOptions } from '../Options/';
import { IBaseRefiner } from './IBaseRefiner';
import { IDateRefinerValue } from '../Values';
export interface IDateRefiner extends IBaseRefiner {
	options?: IDateOptions;
	value?: IDateRefinerValue;
}
