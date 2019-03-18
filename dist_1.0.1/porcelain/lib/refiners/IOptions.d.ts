import { SimpleOption, DateOption, ISimpleOption, IDateOption } from "./IOption";
export interface ISimpleOptions<OptionType = ISimpleOption, ValueType = string> {
    [optionSlug: string]: ValueType | OptionType;
}
export declare class SimpleOptions<OptionType = SimpleOption, ValueType = string> implements ISimpleOptions<OptionType, ValueType> {
    [optionSlug: string]: ValueType | OptionType;
}
export declare type IDateOptions = ISimpleOptions<IDateOption, IDateOption>;
export declare type DateOptions = SimpleOptions<DateOption, DateOption>;
