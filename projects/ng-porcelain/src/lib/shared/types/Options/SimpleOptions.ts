import { SimpleOption } from './SimpleOption';
import { ISimpleOption } from './ISimpleOption';
import { ISimpleOptions } from './ISimpleOptions';
export class SimpleOptions<
	OptionType extends ISimpleOption = SimpleOption,
	ValueType = string
> implements ISimpleOptions<OptionType, ValueType> {
	[optionSlug: string]: ValueType | OptionType;
}
