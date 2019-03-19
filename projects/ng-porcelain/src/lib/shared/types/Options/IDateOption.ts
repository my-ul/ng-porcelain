import { ISimpleOption } from './ISimpleOption';
export interface IDateOption extends ISimpleOption {
	getFrom: (fromString?: string) => Date;
	getTo: (toString?: string) => Date;
}
