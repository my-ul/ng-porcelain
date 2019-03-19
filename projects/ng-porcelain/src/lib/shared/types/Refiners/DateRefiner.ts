import { DateOptions } from '../Options/';
import { RefinerType } from './RefinerType';
import { BaseRefiner } from './BaseRefiner';
import { IDateRefiner } from './IDateRefiner';
export class DateRefiner extends BaseRefiner implements IDateRefiner {
	options?: DateOptions;
	constructor(dateRefiner: IDateRefiner) {
		super(dateRefiner);
		this.type = RefinerType.date;
		if (dateRefiner) {
			this.options = dateRefiner.options || null;
		}
	}
}
