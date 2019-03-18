/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var SimpleOption = /** @class */ (function () {
    /**
     * Create an instance of Option from an IOption. If incoming IOption fields are present, they will be set.
     * @param {ISimpleOption} simpleOption
     * @memberof Option
     */
    function SimpleOption(simpleOption) {
        if (simpleOption) {
            this.badge = simpleOption.badge ? simpleOption.badge : null;
            this.label = simpleOption.label ? simpleOption.label : '';
            this.slug = simpleOption.slug ? simpleOption.slug : '';
            this.isSelected = simpleOption.isSelected ? simpleOption.isSelected : null;
        }
    }
    return SimpleOption;
}());
export { SimpleOption };
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
var /**
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
DateOption = /** @class */ (function (_super) {
    tslib_1.__extends(DateOption, _super);
    function DateOption(dateOptionDefinition) {
        var _this = _super.call(this, dateOptionDefinition) || this;
        /** @type {?} */
        var returnNull = (/**
         * @return {?}
         */
        function () { return null; });
        if (dateOptionDefinition) {
            _this.getFrom = dateOptionDefinition.getFrom || returnNull;
            _this.getTo = dateOptionDefinition.getTo || returnNull;
        }
        return _this;
    }
    return DateOption;
}(SimpleOption));
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
export { DateOption };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSU9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BvcmNlbGFpbi8iLCJzb3VyY2VzIjpbImxpYi9yZWZpbmVycy9JT3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsbUNBS0M7OztJQUpBLDhCQUF3Qjs7SUFDeEIsOEJBQWM7O0lBQ2QsNkJBQWE7O0lBQ2IsbUNBQXFCOztBQUd0QjtJQTBCQzs7OztPQUlHO0lBQ0gsc0JBQVksWUFBNEI7UUFDdkMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM1RSxDQUFDO0lBQ0YsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQzs7Ozs7Ozs7Ozs7O0lBOUJBLDZCQUF3Qjs7Ozs7SUFLeEIsNkJBQWM7Ozs7O0lBS2QsNEJBQWE7Ozs7O0lBS2Isa0NBQWlCOzs7OztBQWlCbEIsaUNBR0M7OztJQUZBLDhCQUF1Qzs7SUFDdkMsNEJBQW1DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBZ0Msc0NBQVk7SUFlM0Msb0JBQVksb0JBQWlDO1FBQTdDLFlBQ0Msa0JBQU0sb0JBQW9CLENBQUMsU0FRM0I7O1lBTk0sVUFBVTs7O1FBQUcsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUE7UUFFN0IsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQztZQUMxRCxLQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssSUFBSSxVQUFVLENBQUM7UUFDdkQsQ0FBQzs7SUFDRixDQUFDO0lBQ0YsaUJBQUM7QUFBRCxDQUFDLEFBekJELENBQWdDLFlBQVksR0F5QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcEJBLDZCQUFzQzs7Ozs7Ozs7SUFRdEMsMkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJU2ltcGxlT3B0aW9uIHtcclxuXHRiYWRnZT86IHN0cmluZyB8IG51bWJlcjtcclxuXHRsYWJlbDogc3RyaW5nO1xyXG5cdHNsdWc6IHN0cmluZztcclxuXHRpc1NlbGVjdGVkPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXBsZU9wdGlvbiBpbXBsZW1lbnRzIElTaW1wbGVPcHRpb24ge1xyXG5cdC8qKlxyXG5cdCAqIEEgYmFkZ2UgY2FuIGJlIHNob3duIG5leHQgdG8gdGhlIGxhYmVsLiAgQSBiYWRnZSBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSBob3cgbWFueSByZWNvcmRzIGFuIE9wdGlvbiByZXByZXNlbnRzXHJcblx0ICpcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIFx0XHRbWF0gSW4gUHJvZ3Jlc3NcdFx0Miw5MDBcdHtcdHNsdWc6ICdpblByb2dyZXNzJzsgXHRpc1NlbGVjdGVkOiB0cnVlO1x0YmFkZ2U6IDI5MDAgfVxyXG5cdCAqIFx0XHRbIF0gT24gSG9sZFx0XHRcdDIsNTAwXHR7XHRzbHVnOiAnb25Ib2xkJ1x0XHRcdGlzU2VsZWN0ZWQ6IGZhbHNlO1x0YmFkZ2U6IDI1MDAgfVxyXG5cdCAqIFx0XHRbIF0gU2xpcHBpbmdcdFx0NTAwXHRcdHtcdHNsdWc6ICdzbGlwcGluZyc7XHRcdGlzU2VsZWN0ZWQ6IGZhbHNlO1x0YmFkZ2U6IDUwMCB9XHJcblx0ICovXHJcblx0YmFkZ2U/OiBzdHJpbmcgfCBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgdHJhbnNsYXRlZCwgaHVtYW4tcmVhZGFibGUgbGFiZWwgcmVwcmVzZW50aW5nIG9mIHRoZSBvcHRpb24uXHJcblx0ICovXHJcblx0bGFiZWw6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogQSBrZXlhYmxlLCBzZXJpYWxpemFibGUgbmFtZS9yZXByZXNlbnRhdGlvbiBvZiB0aGUgT3B0aW9uLCBzdWNoIGFzICdpblByb2dyZXNzJ1xyXG5cdCAqL1xyXG5cdHNsdWc6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogQSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgb3B0aW9uLlxyXG5cdCAqL1xyXG5cdGlzU2VsZWN0ZWQ/OiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBPcHRpb24gZnJvbSBhbiBJT3B0aW9uLiBJZiBpbmNvbWluZyBJT3B0aW9uIGZpZWxkcyBhcmUgcHJlc2VudCwgdGhleSB3aWxsIGJlIHNldC5cclxuXHQgKiBAcGFyYW0ge0lTaW1wbGVPcHRpb259IHNpbXBsZU9wdGlvblxyXG5cdCAqIEBtZW1iZXJvZiBPcHRpb25cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzaW1wbGVPcHRpb24/OiBJU2ltcGxlT3B0aW9uKSB7XHJcblx0XHRpZiAoc2ltcGxlT3B0aW9uKSB7XHJcblx0XHRcdHRoaXMuYmFkZ2UgPSBzaW1wbGVPcHRpb24uYmFkZ2UgPyBzaW1wbGVPcHRpb24uYmFkZ2UgOiBudWxsO1xyXG5cdFx0XHR0aGlzLmxhYmVsID0gc2ltcGxlT3B0aW9uLmxhYmVsID8gc2ltcGxlT3B0aW9uLmxhYmVsIDogJyc7XHJcblx0XHRcdHRoaXMuc2x1ZyA9IHNpbXBsZU9wdGlvbi5zbHVnID8gc2ltcGxlT3B0aW9uLnNsdWcgOiAnJztcclxuXHRcdFx0dGhpcy5pc1NlbGVjdGVkID0gc2ltcGxlT3B0aW9uLmlzU2VsZWN0ZWQgPyBzaW1wbGVPcHRpb24uaXNTZWxlY3RlZCA6IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlT3B0aW9uIGV4dGVuZHMgSVNpbXBsZU9wdGlvbiB7XHJcblx0Z2V0RnJvbTogKGZyb21TdHJpbmc/OiBzdHJpbmcpID0+IERhdGU7XHJcblx0Z2V0VG86ICh0b1N0cmluZz86IHN0cmluZykgPT4gRGF0ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBkYXRlIHJhbmdlIG9wdGlvbiB3aXRoaW4gYSBEYXRlIFJlZmluZXJcclxuICpcclxuICogQGV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBcdGltcG9ydCB7IERhdGVPcHRpb24gfSBmcm9tICcuLi9wYXRoL3RvL0lPcHRpb24udHMnXHJcbiAqXHJcbiAqIFx0QENvbXBvbmVudCh7fSlcclxuICogXHRleHBvcnQgY2xhc3MgTXlDb21wb25lbnQge1xyXG4gKiBcdFx0bW9kaWZpZWRPblJlZmluZXIgPSB7XHJcbiAqIFx0XHRcdGRhdGVPcHRpb25TbHVnOiBuZXcgRGF0ZU9wdGlvbih7XHJcbiAqIFx0XHRcdFx0YmFkZ2U6ICcxJyxcclxuICogXHRcdFx0XHRsYWJlbDogJ01vZGlmaWVkIG9uLi4uJyxcclxuICogXHRcdFx0XHRzbHVnOiAnbW9kaWZpZWQnLFxyXG4gKiBcdFx0XHRcdHZhbHVlOiBmYWxzZSxcclxuICogXHRcdFx0XHRnZXRGcm9tOiAoKSA9PiBnZXRZZXN0ZXJkYXkoKSxcclxuICogXHRcdFx0XHRnZXRUbzogKCkgPT4gZ2V0VG9kYXkoKVxyXG4gKiBcdFx0XHR9KVxyXG4gKiBcdFx0fTtcclxuICogXHR9XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBBbmQgdGhlbiBpblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGVPcHRpb24gZXh0ZW5kcyBTaW1wbGVPcHRpb24gaW1wbGVtZW50cyBJRGF0ZU9wdGlvbiB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRoZSBzdGFydCB2YWx1ZSBmb3IgdGhlIGRhdGUgcmVmaW5lciByYW5nZS4gIElmIG5vIHN0YXJ0IHZhbHVlLCByZXR1cm4gbnVsbC5cclxuXHQgKi9cclxuXHRnZXRGcm9tOiAoZnJvbVN0cmluZzogc3RyaW5nKSA9PiBEYXRlO1xyXG5cclxuXHQvKipcclxuXHQgKiBGdW5jdGlvbiB0byBnZW5lcmF0ZSB0aGUgZW5kICh0bykgdmFsdWUgZm9yIHRoZSBkYXRlIHJlZmluZXIgcmFuZ2UuIElmIG5vIGVuZCB2YWx1ZSBpcyBuZWVkZWQsIHJldHVybiBudWxsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRvU3RyaW5nIHtzdHJpbmd9IEEgc3RyaW5nIHRvIHBhcnNlLCByZXByZXNlbnRpbmcgdGhlIGxhdGVyIGRhdGUuXHJcblx0ICogQHJldHVybnMgYSBEYXRlIG9iamVjdCAob3IgbnVsbCkgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBwYXJzZWQgZnJvbSBgdG9TdHJpbmdgXHJcblx0ICovXHJcblx0Z2V0VG86ICh0b1N0cmluZzogc3RyaW5nKSA9PiBEYXRlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihkYXRlT3B0aW9uRGVmaW5pdGlvbjogSURhdGVPcHRpb24pIHtcclxuXHRcdHN1cGVyKGRhdGVPcHRpb25EZWZpbml0aW9uKTtcclxuXHJcblx0XHRjb25zdCByZXR1cm5OdWxsID0gKCkgPT4gbnVsbDtcclxuXHJcblx0XHRpZiAoZGF0ZU9wdGlvbkRlZmluaXRpb24pIHtcclxuXHRcdFx0dGhpcy5nZXRGcm9tID0gZGF0ZU9wdGlvbkRlZmluaXRpb24uZ2V0RnJvbSB8fCByZXR1cm5OdWxsO1xyXG5cdFx0XHR0aGlzLmdldFRvID0gZGF0ZU9wdGlvbkRlZmluaXRpb24uZ2V0VG8gfHwgcmV0dXJuTnVsbDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19