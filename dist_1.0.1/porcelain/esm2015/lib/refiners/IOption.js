/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ISimpleOption() { }
if (false) {
    /** @type {?|undefined} */
    ISimpleOption.prototype.badge;
    /** @type {?} */
    ISimpleOption.prototype.label;
    /** @type {?} */
    ISimpleOption.prototype.slug;
    /** @type {?|undefined} */
    ISimpleOption.prototype.isSelected;
}
export class SimpleOption {
    /**
     * Create an instance of Option from an IOption. If incoming IOption fields are present, they will be set.
     * \@memberof Option
     * @param {?=} simpleOption
     */
    constructor(simpleOption) {
        if (simpleOption) {
            this.badge = simpleOption.badge ? simpleOption.badge : null;
            this.label = simpleOption.label ? simpleOption.label : '';
            this.slug = simpleOption.slug ? simpleOption.slug : '';
            this.isSelected = simpleOption.isSelected ? simpleOption.isSelected : null;
        }
    }
}
if (false) {
    /**
     * A badge can be shown next to the label.  A badge can be used to indicate how many records an Option represents
     *
     * \@example
     * 		[X] In Progress		2,900	{	slug: 'inProgress'; 	isSelected: true;	badge: 2900 }
     * 		[ ] On Hold			2,500	{	slug: 'onHold'			isSelected: false;	badge: 2500 }
     * 		[ ] Slipping		500		{	slug: 'slipping';		isSelected: false;	badge: 500 }
     * @type {?}
     */
    SimpleOption.prototype.badge;
    /**
     * A translated, human-readable label representing of the option.
     * @type {?}
     */
    SimpleOption.prototype.label;
    /**
     * A keyable, serializable name/representation of the Option, such as 'inProgress'
     * @type {?}
     */
    SimpleOption.prototype.slug;
    /**
     * A default value for the option.
     * @type {?}
     */
    SimpleOption.prototype.isSelected;
}
/**
 * @record
 */
export function IDateOption() { }
if (false) {
    /** @type {?} */
    IDateOption.prototype.getFrom;
    /** @type {?} */
    IDateOption.prototype.getTo;
}
/**
 * Represents a date range option within a Date Refiner
 *
 * \@example
 * ```typescript
 * 	import { DateOption } from '../path/to/IOption.ts'
 *
 * \@Component({})
 * 	export class MyComponent {
 * 		modifiedOnRefiner = {
 * 			dateOptionSlug: new DateOption({
 * 				badge: '1',
 * 				label: 'Modified on...',
 * 				slug: 'modified',
 * 				value: false,
 * 				getFrom: () => getYesterday(),
 * 				getTo: () => getToday()
 * 			})
 * 		};
 * 	}
 * ```
 *
 * And then in
 */
export class DateOption extends SimpleOption {
    /**
     * @param {?} dateOptionDefinition
     */
    constructor(dateOptionDefinition) {
        super(dateOptionDefinition);
        /** @type {?} */
        const returnNull = (/**
         * @return {?}
         */
        () => null);
        if (dateOptionDefinition) {
            this.getFrom = dateOptionDefinition.getFrom || returnNull;
            this.getTo = dateOptionDefinition.getTo || returnNull;
        }
    }
}
if (false) {
    /**
     * Function to generate the start value for the date refiner range.  If no start value, return null.
     * @type {?}
     */
    DateOption.prototype.getFrom;
    /**
     * Function to generate the end (to) value for the date refiner range. If no end value is needed, return null.
     *
     * \@param toString {string} A string to parse, representing the later date.
     * \@return a Date object (or null) representing the value parsed from `toString`
     * @type {?}
     */
    DateOption.prototype.getTo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSU9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BvcmNlbGFpbi8iLCJzb3VyY2VzIjpbImxpYi9yZWZpbmVycy9JT3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxtQ0FLQzs7O0lBSkEsOEJBQXdCOztJQUN4Qiw4QkFBYzs7SUFDZCw2QkFBYTs7SUFDYixtQ0FBcUI7O0FBR3RCLE1BQU07Ozs7OztJQStCTCxZQUFZLFlBQTRCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDNUUsQ0FBQztJQUNGLENBQUM7Q0FDRDs7Ozs7Ozs7Ozs7SUE5QkEsNkJBQXdCOzs7OztJQUt4Qiw2QkFBYzs7Ozs7SUFLZCw0QkFBYTs7Ozs7SUFLYixrQ0FBaUI7Ozs7O0FBaUJsQixpQ0FHQzs7O0lBRkEsOEJBQXVDOztJQUN2Qyw0QkFBbUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJwQyxNQUFNLGlCQUFrQixTQUFRLFlBQVk7Ozs7SUFlM0MsWUFBWSxvQkFBaUM7UUFDNUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O2NBRXRCLFVBQVU7OztRQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTtRQUU3QixFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQztRQUN2RCxDQUFDO0lBQ0YsQ0FBQztDQUNEOzs7Ozs7SUFwQkEsNkJBQXNDOzs7Ozs7OztJQVF0QywyQkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElTaW1wbGVPcHRpb24ge1xyXG5cdGJhZGdlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG5cdGxhYmVsOiBzdHJpbmc7XHJcblx0c2x1Zzogc3RyaW5nO1xyXG5cdGlzU2VsZWN0ZWQ/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltcGxlT3B0aW9uIGltcGxlbWVudHMgSVNpbXBsZU9wdGlvbiB7XHJcblx0LyoqXHJcblx0ICogQSBiYWRnZSBjYW4gYmUgc2hvd24gbmV4dCB0byB0aGUgbGFiZWwuICBBIGJhZGdlIGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIGhvdyBtYW55IHJlY29yZHMgYW4gT3B0aW9uIHJlcHJlc2VudHNcclxuXHQgKlxyXG5cdCAqIEBleGFtcGxlXHJcblx0ICogXHRcdFtYXSBJbiBQcm9ncmVzc1x0XHQyLDkwMFx0e1x0c2x1ZzogJ2luUHJvZ3Jlc3MnOyBcdGlzU2VsZWN0ZWQ6IHRydWU7XHRiYWRnZTogMjkwMCB9XHJcblx0ICogXHRcdFsgXSBPbiBIb2xkXHRcdFx0Miw1MDBcdHtcdHNsdWc6ICdvbkhvbGQnXHRcdFx0aXNTZWxlY3RlZDogZmFsc2U7XHRiYWRnZTogMjUwMCB9XHJcblx0ICogXHRcdFsgXSBTbGlwcGluZ1x0XHQ1MDBcdFx0e1x0c2x1ZzogJ3NsaXBwaW5nJztcdFx0aXNTZWxlY3RlZDogZmFsc2U7XHRiYWRnZTogNTAwIH1cclxuXHQgKi9cclxuXHRiYWRnZT86IHN0cmluZyB8IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSB0cmFuc2xhdGVkLCBodW1hbi1yZWFkYWJsZSBsYWJlbCByZXByZXNlbnRpbmcgb2YgdGhlIG9wdGlvbi5cclxuXHQgKi9cclxuXHRsYWJlbDogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGtleWFibGUsIHNlcmlhbGl6YWJsZSBuYW1lL3JlcHJlc2VudGF0aW9uIG9mIHRoZSBPcHRpb24sIHN1Y2ggYXMgJ2luUHJvZ3Jlc3MnXHJcblx0ICovXHJcblx0c2x1Zzogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBvcHRpb24uXHJcblx0ICovXHJcblx0aXNTZWxlY3RlZD86IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIE9wdGlvbiBmcm9tIGFuIElPcHRpb24uIElmIGluY29taW5nIElPcHRpb24gZmllbGRzIGFyZSBwcmVzZW50LCB0aGV5IHdpbGwgYmUgc2V0LlxyXG5cdCAqIEBwYXJhbSB7SVNpbXBsZU9wdGlvbn0gc2ltcGxlT3B0aW9uXHJcblx0ICogQG1lbWJlcm9mIE9wdGlvblxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHNpbXBsZU9wdGlvbj86IElTaW1wbGVPcHRpb24pIHtcclxuXHRcdGlmIChzaW1wbGVPcHRpb24pIHtcclxuXHRcdFx0dGhpcy5iYWRnZSA9IHNpbXBsZU9wdGlvbi5iYWRnZSA/IHNpbXBsZU9wdGlvbi5iYWRnZSA6IG51bGw7XHJcblx0XHRcdHRoaXMubGFiZWwgPSBzaW1wbGVPcHRpb24ubGFiZWwgPyBzaW1wbGVPcHRpb24ubGFiZWwgOiAnJztcclxuXHRcdFx0dGhpcy5zbHVnID0gc2ltcGxlT3B0aW9uLnNsdWcgPyBzaW1wbGVPcHRpb24uc2x1ZyA6ICcnO1xyXG5cdFx0XHR0aGlzLmlzU2VsZWN0ZWQgPSBzaW1wbGVPcHRpb24uaXNTZWxlY3RlZCA/IHNpbXBsZU9wdGlvbi5pc1NlbGVjdGVkIDogbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVPcHRpb24gZXh0ZW5kcyBJU2ltcGxlT3B0aW9uIHtcclxuXHRnZXRGcm9tOiAoZnJvbVN0cmluZz86IHN0cmluZykgPT4gRGF0ZTtcclxuXHRnZXRUbzogKHRvU3RyaW5nPzogc3RyaW5nKSA9PiBEYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIGRhdGUgcmFuZ2Ugb3B0aW9uIHdpdGhpbiBhIERhdGUgUmVmaW5lclxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIFx0aW1wb3J0IHsgRGF0ZU9wdGlvbiB9IGZyb20gJy4uL3BhdGgvdG8vSU9wdGlvbi50cydcclxuICpcclxuICogXHRAQ29tcG9uZW50KHt9KVxyXG4gKiBcdGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAqIFx0XHRtb2RpZmllZE9uUmVmaW5lciA9IHtcclxuICogXHRcdFx0ZGF0ZU9wdGlvblNsdWc6IG5ldyBEYXRlT3B0aW9uKHtcclxuICogXHRcdFx0XHRiYWRnZTogJzEnLFxyXG4gKiBcdFx0XHRcdGxhYmVsOiAnTW9kaWZpZWQgb24uLi4nLFxyXG4gKiBcdFx0XHRcdHNsdWc6ICdtb2RpZmllZCcsXHJcbiAqIFx0XHRcdFx0dmFsdWU6IGZhbHNlLFxyXG4gKiBcdFx0XHRcdGdldEZyb206ICgpID0+IGdldFllc3RlcmRheSgpLFxyXG4gKiBcdFx0XHRcdGdldFRvOiAoKSA9PiBnZXRUb2RheSgpXHJcbiAqIFx0XHRcdH0pXHJcbiAqIFx0XHR9O1xyXG4gKiBcdH1cclxuICogYGBgXHJcbiAqXHJcbiAqIEFuZCB0aGVuIGluXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZU9wdGlvbiBleHRlbmRzIFNpbXBsZU9wdGlvbiBpbXBsZW1lbnRzIElEYXRlT3B0aW9uIHtcclxuXHJcblx0LyoqXHJcblx0ICogRnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGhlIHN0YXJ0IHZhbHVlIGZvciB0aGUgZGF0ZSByZWZpbmVyIHJhbmdlLiAgSWYgbm8gc3RhcnQgdmFsdWUsIHJldHVybiBudWxsLlxyXG5cdCAqL1xyXG5cdGdldEZyb206IChmcm9tU3RyaW5nOiBzdHJpbmcpID0+IERhdGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRoZSBlbmQgKHRvKSB2YWx1ZSBmb3IgdGhlIGRhdGUgcmVmaW5lciByYW5nZS4gSWYgbm8gZW5kIHZhbHVlIGlzIG5lZWRlZCwgcmV0dXJuIG51bGwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdG9TdHJpbmcge3N0cmluZ30gQSBzdHJpbmcgdG8gcGFyc2UsIHJlcHJlc2VudGluZyB0aGUgbGF0ZXIgZGF0ZS5cclxuXHQgKiBAcmV0dXJucyBhIERhdGUgb2JqZWN0IChvciBudWxsKSByZXByZXNlbnRpbmcgdGhlIHZhbHVlIHBhcnNlZCBmcm9tIGB0b1N0cmluZ2BcclxuXHQgKi9cclxuXHRnZXRUbzogKHRvU3RyaW5nOiBzdHJpbmcpID0+IERhdGU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRhdGVPcHRpb25EZWZpbml0aW9uOiBJRGF0ZU9wdGlvbikge1xyXG5cdFx0c3VwZXIoZGF0ZU9wdGlvbkRlZmluaXRpb24pO1xyXG5cclxuXHRcdGNvbnN0IHJldHVybk51bGwgPSAoKSA9PiBudWxsO1xyXG5cclxuXHRcdGlmIChkYXRlT3B0aW9uRGVmaW5pdGlvbikge1xyXG5cdFx0XHR0aGlzLmdldEZyb20gPSBkYXRlT3B0aW9uRGVmaW5pdGlvbi5nZXRGcm9tIHx8IHJldHVybk51bGw7XHJcblx0XHRcdHRoaXMuZ2V0VG8gPSBkYXRlT3B0aW9uRGVmaW5pdGlvbi5nZXRUbyB8fCByZXR1cm5OdWxsO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=