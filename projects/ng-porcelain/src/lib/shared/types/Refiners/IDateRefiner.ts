import { IBaseRefiner } from './IBaseRefiner';
import { IDateOptions } from '../Options/IDateOptions';
import { IDateRefinerValue } from '../Values/IDateRefinerValue';

export interface IDateRefiner extends IBaseRefiner {
	options?: IDateOptions;
	value?: IDateRefinerValue;
}
