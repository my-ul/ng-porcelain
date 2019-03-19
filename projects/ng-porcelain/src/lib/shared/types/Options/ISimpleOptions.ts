import { ISimpleOption } from './ISimpleOption';
export interface ISimpleOptions<
	OptionType extends ISimpleOption = ISimpleOption,
	ValueType = string
> {
	[optionSlug: string]: ValueType | OptionType;
}
