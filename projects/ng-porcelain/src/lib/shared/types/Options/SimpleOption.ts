import { ISimpleOption } from './ISimpleOption';
export class SimpleOption implements ISimpleOption {
	/**
	 * A badge can be shown next to the label.  A badge can be used to indicate how many records an Option represents
	 *
	 * @example
	 * 		[X] In Progress		2,900	{	slug: 'inProgress'; 	isSelected: true;	badge: 2900 }
	 * 		[ ] On Hold			2,500	{	slug: 'onHold'			isSelected: false;	badge: 2500 }
	 * 		[ ] Slipping		  500	{	slug: 'slipping';		isSelected: false;	badge: 500 }
	 */
	badge?: string | number;
	/**
	 * A translated, human-readable label representing of the option.
	 */
	label: string;
	/**
	 * A keyable, serializable name/representation of the Option, such as 'inProgress'
	 */
	slug: string;
	/**
	 * A default value for the option.
	 */
	isSelected?: any;
	/**
	 * If there is value in tooltip text then tooltip would displayed radio refiner
	 */
	tooltipText?: string = '';
	/**
	 * By default references the image present in assets folder inside porcelain. Just pass on the image URL located in your application directory
	 * */
	customToolTipImageUrl?: string = '';

	/**
	 * Create an instance of Option from an IOption. If incoming IOption fields are present, they will be set.
	 */
	constructor(simpleOption?: ISimpleOption) {
		if (simpleOption) {
			this.badge = simpleOption.badge ? simpleOption.badge : null;
			this.label = simpleOption.label ? simpleOption.label : '';
			this.slug = simpleOption.slug ? simpleOption.slug : '';
			this.isSelected = simpleOption.isSelected ? simpleOption.isSelected : null;
			this.tooltipText = simpleOption.tooltipText ? simpleOption.tooltipText : '';
			this.customToolTipImageUrl = simpleOption.customToolTipImageUrl
				? simpleOption.customToolTipImageUrl
				: '';
		}
	}
}
