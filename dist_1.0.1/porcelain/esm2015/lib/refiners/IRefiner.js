/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IRefinerBase() { }
if (false) {
    /** @type {?|undefined} */
    IRefinerBase.prototype.type;
    /** @type {?|undefined} */
    IRefinerBase.prototype.title;
    /** @type {?|undefined} */
    IRefinerBase.prototype.slug;
    /** @type {?|undefined} */
    IRefinerBase.prototype.isOpen;
    /** @type {?|undefined} */
    IRefinerBase.prototype.isExpanded;
    /** @type {?|undefined} */
    IRefinerBase.prototype.showCount;
    /** @type {?|undefined} */
    IRefinerBase.prototype.options;
    /** @type {?|undefined} */
    IRefinerBase.prototype.value;
}
/**
 * @abstract
 */
export class RefinerBase {
    /**
     * @param {?} refinerDefinition
     */
    constructor(refinerDefinition) {
        /**
         * Refiner type discriminator.  Allows refiners to be JSON serialized
         */
        this.type = 'simple';
        /**
         * True when the Refiner is to be shown in its open state.
         *
         * @type {boolean}
         * @memberof Refiner
         */
        this.isOpen = true;
        this.type = refinerDefinition.type ? refinerDefinition.type : 'simple';
        this.title = refinerDefinition.title ? refinerDefinition.title : '';
        this.slug = refinerDefinition.slug ? refinerDefinition.slug : '';
        this.options = refinerDefinition.options ? refinerDefinition.options : {};
        this.isOpen =
            typeof refinerDefinition.isOpen === 'boolean'
                ? refinerDefinition.isOpen
                : true;
        this.value = refinerDefinition.value ? refinerDefinition.value : null;
    }
}
if (false) {
    /**
     * Refiner type discriminator.  Allows refiners to be JSON serialized
     * @type {?}
     */
    RefinerBase.prototype.type;
    /**
     * Localized string to be shown as a human-readable title for the Refiner
     *
     * \@memberof Refiner
     * @type {?}
     */
    RefinerBase.prototype.title;
    /**
     * A "keyable" value that is unique within a refiner set.  Usually the name of a property.
     *
     * \@memberof Refiner
     * @type {?}
     */
    RefinerBase.prototype.slug;
    /**
     * Dictionary of optionSlug => label or optionSlug => RefinerOption
     *
     * \@memberof RefinerDefinition
     * @type {?}
     */
    RefinerBase.prototype.options;
    /**
     * True when the Refiner is to be shown in its open state.
     *
     * \@memberof Refiner
     * @type {?}
     */
    RefinerBase.prototype.isOpen;
    /**
     * Provide a value if the refiner should initialize with a value.
     *
     * \@memberof Refiner
     * @type {?}
     */
    RefinerBase.prototype.value;
    /**
     * Number of options to show in the refiner in the un-expanded state. Default is 5
     *
     * @type {?}
     */
    RefinerBase.prototype.showCount;
}
/**
 * @record
 */
export function ISimpleRefiner() { }
if (false) {
    /** @type {?|undefined} */
    ISimpleRefiner.prototype.selected;
}
export class SimpleRefiner extends RefinerBase {
    /**
     * @param {?} refinerDefinition
     */
    constructor(refinerDefinition) {
        super(refinerDefinition);
        /**
         * State for expanded/not expanded. When true, all options will be shown on initial render.
         *
         * @type {boolean}
         * @memberof RefinerBase
         */
        this.isExpanded = false;
        this.selected = refinerDefinition.selected ? refinerDefinition.selected : [];
        this.showCount = refinerDefinition.showCount
            ? refinerDefinition.showCount
            : 5;
        this.isExpanded =
            typeof refinerDefinition.isExpanded === 'boolean'
                ? refinerDefinition.isExpanded
                : false;
    }
}
if (false) {
    /**
     * Array of slugs to mark as selected on load.
     *
     * @type {?}
     */
    SimpleRefiner.prototype.selected;
    /**
     * State for expanded/not expanded. When true, all options will be shown on initial render.
     *
     * \@memberof RefinerBase
     * @type {?}
     */
    SimpleRefiner.prototype.isExpanded;
}
/**
 * @record
 */
export function IDateRefiner() { }
if (false) {
    /** @type {?|undefined} */
    IDateRefiner.prototype.options;
}
export class DateRefiner extends RefinerBase {
    /**
     * @param {?} dateRefiner
     */
    constructor(dateRefiner) {
        super(dateRefiner);
        this.type = 'date';
        if (dateRefiner) {
            this.options = dateRefiner.options || null;
        }
    }
}
if (false) {
    /** @type {?} */
    DateRefiner.prototype.type;
    /** @type {?} */
    DateRefiner.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSVJlZmluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wb3JjZWxhaW4vIiwic291cmNlcyI6WyJsaWIvcmVmaW5lcnMvSVJlZmluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLGtDQVNDOzs7SUFSQSw0QkFBeUI7O0lBQ3pCLDZCQUFlOztJQUNmLDRCQUFjOztJQUNkLDhCQUFpQjs7SUFDakIsa0NBQXFCOztJQUNyQixpQ0FBbUI7O0lBQ25CLCtCQUFtQzs7SUFDbkMsNkJBQXFCOzs7OztBQUd0QixNQUFNOzs7O0lBcURMLFlBQVksaUJBQStCO1FBcEQzQzs7V0FFRztRQUNILFNBQUksR0FBc0IsUUFBUSxDQUFDO1FBMEJuQzs7Ozs7V0FLRztRQUNILFdBQU0sR0FBYSxJQUFJLENBQUM7UUFrQnZCLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsTUFBTTtZQUNWLE9BQU8saUJBQWlCLENBQUMsTUFBTSxLQUFLLFNBQVM7Z0JBQzVDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNO2dCQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDO1FBRVQsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3ZFLENBQUM7Q0FDRDs7Ozs7O0lBN0RBLDJCQUFtQzs7Ozs7OztJQVFuQyw0QkFBYzs7Ozs7OztJQVFkLDJCQUFhOzs7Ozs7O0lBUWIsOEJBQTJDOzs7Ozs7O0lBUTNDLDZCQUF3Qjs7Ozs7OztJQVF4Qiw0QkFBb0I7Ozs7OztJQU9wQixnQ0FBbUI7Ozs7O0FBZ0JwQixvQ0FFQzs7O0lBREEsa0NBQW9COztBQUdyQixNQUFNLG9CQUFxQixTQUFRLFdBQVc7Ozs7SUFnQjdDLFlBQVksaUJBQWlDO1FBQzVDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBVDFCOzs7OztXQUtHO1FBQ0gsZUFBVSxHQUFhLEtBQUssQ0FBQztRQUs1QixJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTO1lBQzNDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTO1lBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsVUFBVTtZQUNkLE9BQU8saUJBQWlCLENBQUMsVUFBVSxLQUFLLFNBQVM7Z0JBQ2hELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO2dCQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ1gsQ0FBQztDQUNEOzs7Ozs7O0lBdEJBLGlDQUFvQjs7Ozs7OztJQVFwQixtQ0FBNkI7Ozs7O0FBZ0I5QixrQ0FFQzs7O0lBREEsK0JBQXVCOztBQUd4QixNQUFNLGtCQUFtQixTQUFRLFdBQVc7Ozs7SUFLM0MsWUFBWSxXQUF5QjtRQUNwQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFMWCxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBT3RCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztRQUM1QyxDQUFDO0lBQ0YsQ0FBQztDQUNEOzs7SUFYQSwyQkFBdUI7O0lBRXZCLDhCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpbXBsZU9wdGlvbiB9IGZyb20gJy4vSU9wdGlvbic7XHJcbmltcG9ydCB7IERhdGVPcHRpb25zLCBJRGF0ZU9wdGlvbnMsIElTaW1wbGVPcHRpb25zLCBTaW1wbGVPcHRpb25zIH0gZnJvbSAnLi9JT3B0aW9ucyc7XHJcbmltcG9ydCB7IFJlZmluZXJWYWx1ZSB9IGZyb20gJy4vSVJlZmluZXJWYWx1ZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZWZpbmVyQmFzZSB7XHJcblx0dHlwZT86ICdzaW1wbGUnIHwgJ2RhdGUnO1xyXG5cdHRpdGxlPzogc3RyaW5nO1xyXG5cdHNsdWc/OiBzdHJpbmc7XHJcblx0aXNPcGVuPzogYm9vbGVhbjtcclxuXHRpc0V4cGFuZGVkPzogYm9vbGVhbjtcclxuXHRzaG93Q291bnQ/OiBudW1iZXI7XHJcblx0b3B0aW9ucz86IElTaW1wbGVPcHRpb25zPGFueSwgYW55PjtcclxuXHR2YWx1ZT86IFJlZmluZXJWYWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZmluZXJCYXNlIGltcGxlbWVudHMgSVJlZmluZXJCYXNlIHtcclxuXHQvKipcclxuXHQgKiBSZWZpbmVyIHR5cGUgZGlzY3JpbWluYXRvci4gIEFsbG93cyByZWZpbmVycyB0byBiZSBKU09OIHNlcmlhbGl6ZWRcclxuXHQgKi9cclxuXHR0eXBlOiAnc2ltcGxlJyB8ICdkYXRlJyA9ICdzaW1wbGUnO1xyXG5cclxuXHQvKipcclxuXHQgKiBMb2NhbGl6ZWQgc3RyaW5nIHRvIGJlIHNob3duIGFzIGEgaHVtYW4tcmVhZGFibGUgdGl0bGUgZm9yIHRoZSBSZWZpbmVyXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqIEBtZW1iZXJvZiBSZWZpbmVyXHJcblx0ICovXHJcblx0dGl0bGU6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogQSBcImtleWFibGVcIiB2YWx1ZSB0aGF0IGlzIHVuaXF1ZSB3aXRoaW4gYSByZWZpbmVyIHNldC4gIFVzdWFsbHkgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIFJlZmluZXJcclxuXHQgKi9cclxuXHRzbHVnOiBzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpY3Rpb25hcnkgb2Ygb3B0aW9uU2x1ZyA9PiBsYWJlbCBvciBvcHRpb25TbHVnID0+IFJlZmluZXJPcHRpb25cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtTaW1wbGVPcHRpb25zfVxyXG5cdCAqIEBtZW1iZXJvZiBSZWZpbmVyRGVmaW5pdGlvblxyXG5cdCAqL1xyXG5cdG9wdGlvbnM/OiBTaW1wbGVPcHRpb25zPFNpbXBsZU9wdGlvbiwgYW55PjtcclxuXHJcblx0LyoqXHJcblx0ICogVHJ1ZSB3aGVuIHRoZSBSZWZpbmVyIGlzIHRvIGJlIHNob3duIGluIGl0cyBvcGVuIHN0YXRlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFJlZmluZXJcclxuXHQgKi9cclxuXHRpc09wZW4/OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZSBhIHZhbHVlIGlmIHRoZSByZWZpbmVyIHNob3VsZCBpbml0aWFsaXplIHdpdGggYSB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtSZWZpbmVyVmFsdWV9XHJcblx0ICogQG1lbWJlcm9mIFJlZmluZXJcclxuXHQgKi9cclxuXHR2YWx1ZTogUmVmaW5lclZhbHVlO1xyXG5cclxuXHQvKipcclxuXHQgKiBOdW1iZXIgb2Ygb3B0aW9ucyB0byBzaG93IGluIHRoZSByZWZpbmVyIGluIHRoZSB1bi1leHBhbmRlZCBzdGF0ZS4gRGVmYXVsdCBpcyA1XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHNob3dDb3VudD86IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IocmVmaW5lckRlZmluaXRpb246IElSZWZpbmVyQmFzZSkge1xyXG5cdFx0dGhpcy50eXBlID0gcmVmaW5lckRlZmluaXRpb24udHlwZSA/IHJlZmluZXJEZWZpbml0aW9uLnR5cGUgOiAnc2ltcGxlJztcclxuXHRcdHRoaXMudGl0bGUgPSByZWZpbmVyRGVmaW5pdGlvbi50aXRsZSA/IHJlZmluZXJEZWZpbml0aW9uLnRpdGxlIDogJyc7XHJcblx0XHR0aGlzLnNsdWcgPSByZWZpbmVyRGVmaW5pdGlvbi5zbHVnID8gcmVmaW5lckRlZmluaXRpb24uc2x1ZyA6ICcnO1xyXG5cdFx0dGhpcy5vcHRpb25zID0gcmVmaW5lckRlZmluaXRpb24ub3B0aW9ucyA/IHJlZmluZXJEZWZpbml0aW9uLm9wdGlvbnMgOiB7fTtcclxuXHRcdHRoaXMuaXNPcGVuID1cclxuXHRcdFx0dHlwZW9mIHJlZmluZXJEZWZpbml0aW9uLmlzT3BlbiA9PT0gJ2Jvb2xlYW4nXHJcblx0XHRcdFx0PyByZWZpbmVyRGVmaW5pdGlvbi5pc09wZW5cclxuXHRcdFx0XHQ6IHRydWU7XHJcblxyXG5cdFx0dGhpcy52YWx1ZSA9IHJlZmluZXJEZWZpbml0aW9uLnZhbHVlID8gcmVmaW5lckRlZmluaXRpb24udmFsdWUgOiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2ltcGxlUmVmaW5lciBleHRlbmRzIElSZWZpbmVyQmFzZSB7XHJcblx0c2VsZWN0ZWQ/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXBsZVJlZmluZXIgZXh0ZW5kcyBSZWZpbmVyQmFzZSBpbXBsZW1lbnRzIElTaW1wbGVSZWZpbmVyIHtcclxuXHQvKipcclxuXHQgKiBBcnJheSBvZiBzbHVncyB0byBtYXJrIGFzIHNlbGVjdGVkIG9uIGxvYWQuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nW119XHJcblx0ICovXHJcblx0c2VsZWN0ZWQ/OiBzdHJpbmdbXTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RhdGUgZm9yIGV4cGFuZGVkL25vdCBleHBhbmRlZC4gV2hlbiB0cnVlLCBhbGwgb3B0aW9ucyB3aWxsIGJlIHNob3duIG9uIGluaXRpYWwgcmVuZGVyLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQG1lbWJlcm9mIFJlZmluZXJCYXNlXHJcblx0ICovXHJcblx0aXNFeHBhbmRlZD86IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IocmVmaW5lckRlZmluaXRpb246IElTaW1wbGVSZWZpbmVyKSB7XHJcblx0XHRzdXBlcihyZWZpbmVyRGVmaW5pdGlvbik7XHJcblxyXG5cdFx0dGhpcy5zZWxlY3RlZCA9IHJlZmluZXJEZWZpbml0aW9uLnNlbGVjdGVkID8gcmVmaW5lckRlZmluaXRpb24uc2VsZWN0ZWQgOiBbXTtcclxuXHRcdHRoaXMuc2hvd0NvdW50ID0gcmVmaW5lckRlZmluaXRpb24uc2hvd0NvdW50XHJcblx0XHRcdD8gcmVmaW5lckRlZmluaXRpb24uc2hvd0NvdW50XHJcblx0XHRcdDogNTtcclxuXHRcdHRoaXMuaXNFeHBhbmRlZCA9XHJcblx0XHRcdHR5cGVvZiByZWZpbmVyRGVmaW5pdGlvbi5pc0V4cGFuZGVkID09PSAnYm9vbGVhbidcclxuXHRcdFx0XHQ/IHJlZmluZXJEZWZpbml0aW9uLmlzRXhwYW5kZWRcclxuXHRcdFx0XHQ6IGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVJlZmluZXIgZXh0ZW5kcyBJUmVmaW5lckJhc2Uge1xyXG5cdG9wdGlvbnM/OiBJRGF0ZU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlUmVmaW5lciBleHRlbmRzIFJlZmluZXJCYXNlIGltcGxlbWVudHMgSURhdGVSZWZpbmVyIHtcclxuXHRyZWFkb25seSB0eXBlID0gJ2RhdGUnO1xyXG5cclxuXHRvcHRpb25zPzogRGF0ZU9wdGlvbnM7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRhdGVSZWZpbmVyOiBJRGF0ZVJlZmluZXIpIHtcclxuXHRcdHN1cGVyKGRhdGVSZWZpbmVyKTtcclxuXHJcblx0XHRpZiAoZGF0ZVJlZmluZXIpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zID0gZGF0ZVJlZmluZXIub3B0aW9ucyB8fCBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=