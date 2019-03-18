/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
 * @abstract
 */
RefinerBase = /** @class */ (function () {
    function RefinerBase(refinerDefinition) {
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
    return RefinerBase;
}());
/**
 * @abstract
 */
export { RefinerBase };
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
var SimpleRefiner = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleRefiner, _super);
    function SimpleRefiner(refinerDefinition) {
        var _this = _super.call(this, refinerDefinition) || this;
        /**
         * State for expanded/not expanded. When true, all options will be shown on initial render.
         *
         * @type {boolean}
         * @memberof RefinerBase
         */
        _this.isExpanded = false;
        _this.selected = refinerDefinition.selected ? refinerDefinition.selected : [];
        _this.showCount = refinerDefinition.showCount
            ? refinerDefinition.showCount
            : 5;
        _this.isExpanded =
            typeof refinerDefinition.isExpanded === 'boolean'
                ? refinerDefinition.isExpanded
                : false;
        return _this;
    }
    return SimpleRefiner;
}(RefinerBase));
export { SimpleRefiner };
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
var DateRefiner = /** @class */ (function (_super) {
    tslib_1.__extends(DateRefiner, _super);
    function DateRefiner(dateRefiner) {
        var _this = _super.call(this, dateRefiner) || this;
        _this.type = 'date';
        if (dateRefiner) {
            _this.options = dateRefiner.options || null;
        }
        return _this;
    }
    return DateRefiner;
}(RefinerBase));
export { DateRefiner };
if (false) {
    /** @type {?} */
    DateRefiner.prototype.type;
    /** @type {?} */
    DateRefiner.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSVJlZmluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wb3JjZWxhaW4vIiwic291cmNlcyI6WyJsaWIvcmVmaW5lcnMvSVJlZmluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxrQ0FTQzs7O0lBUkEsNEJBQXlCOztJQUN6Qiw2QkFBZTs7SUFDZiw0QkFBYzs7SUFDZCw4QkFBaUI7O0lBQ2pCLGtDQUFxQjs7SUFDckIsaUNBQW1COztJQUNuQiwrQkFBbUM7O0lBQ25DLDZCQUFxQjs7Ozs7QUFHdEI7Ozs7SUFxREMscUJBQVksaUJBQStCO1FBcEQzQzs7V0FFRztRQUNILFNBQUksR0FBc0IsUUFBUSxDQUFDO1FBMEJuQzs7Ozs7V0FLRztRQUNILFdBQU0sR0FBYSxJQUFJLENBQUM7UUFrQnZCLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsTUFBTTtZQUNWLE9BQU8saUJBQWlCLENBQUMsTUFBTSxLQUFLLFNBQVM7Z0JBQzVDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNO2dCQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDO1FBRVQsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3ZFLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFqRUQsSUFpRUM7Ozs7Ozs7Ozs7SUE3REEsMkJBQW1DOzs7Ozs7O0lBUW5DLDRCQUFjOzs7Ozs7O0lBUWQsMkJBQWE7Ozs7Ozs7SUFRYiw4QkFBMkM7Ozs7Ozs7SUFRM0MsNkJBQXdCOzs7Ozs7O0lBUXhCLDRCQUFvQjs7Ozs7O0lBT3BCLGdDQUFtQjs7Ozs7QUFnQnBCLG9DQUVDOzs7SUFEQSxrQ0FBb0I7O0FBR3JCO0lBQW1DLHlDQUFXO0lBZ0I3Qyx1QkFBWSxpQkFBaUM7UUFBN0MsWUFDQyxrQkFBTSxpQkFBaUIsQ0FBQyxTQVV4QjtRQW5CRDs7Ozs7V0FLRztRQUNILGdCQUFVLEdBQWEsS0FBSyxDQUFDO1FBSzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM3RSxLQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFNBQVM7WUFDM0MsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFNBQVM7WUFDN0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNMLEtBQUksQ0FBQyxVQUFVO1lBQ2QsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLEtBQUssU0FBUztnQkFDaEQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFVBQVU7Z0JBQzlCLENBQUMsQ0FBQyxLQUFLLENBQUM7O0lBQ1gsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQTVCRCxDQUFtQyxXQUFXLEdBNEI3Qzs7Ozs7Ozs7SUF0QkEsaUNBQW9COzs7Ozs7O0lBUXBCLG1DQUE2Qjs7Ozs7QUFnQjlCLGtDQUVDOzs7SUFEQSwrQkFBdUI7O0FBR3hCO0lBQWlDLHVDQUFXO0lBSzNDLHFCQUFZLFdBQXlCO1FBQXJDLFlBQ0Msa0JBQU0sV0FBVyxDQUFDLFNBS2xCO1FBVlEsVUFBSSxHQUFHLE1BQU0sQ0FBQztRQU90QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDNUMsQ0FBQzs7SUFDRixDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBaUMsV0FBVyxHQVkzQzs7OztJQVhBLDJCQUF1Qjs7SUFFdkIsOEJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2ltcGxlT3B0aW9uIH0gZnJvbSAnLi9JT3B0aW9uJztcclxuaW1wb3J0IHsgRGF0ZU9wdGlvbnMsIElEYXRlT3B0aW9ucywgSVNpbXBsZU9wdGlvbnMsIFNpbXBsZU9wdGlvbnMgfSBmcm9tICcuL0lPcHRpb25zJztcclxuaW1wb3J0IHsgUmVmaW5lclZhbHVlIH0gZnJvbSAnLi9JUmVmaW5lclZhbHVlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlZmluZXJCYXNlIHtcclxuXHR0eXBlPzogJ3NpbXBsZScgfCAnZGF0ZSc7XHJcblx0dGl0bGU/OiBzdHJpbmc7XHJcblx0c2x1Zz86IHN0cmluZztcclxuXHRpc09wZW4/OiBib29sZWFuO1xyXG5cdGlzRXhwYW5kZWQ/OiBib29sZWFuO1xyXG5cdHNob3dDb3VudD86IG51bWJlcjtcclxuXHRvcHRpb25zPzogSVNpbXBsZU9wdGlvbnM8YW55LCBhbnk+O1xyXG5cdHZhbHVlPzogUmVmaW5lclZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVmaW5lckJhc2UgaW1wbGVtZW50cyBJUmVmaW5lckJhc2Uge1xyXG5cdC8qKlxyXG5cdCAqIFJlZmluZXIgdHlwZSBkaXNjcmltaW5hdG9yLiAgQWxsb3dzIHJlZmluZXJzIHRvIGJlIEpTT04gc2VyaWFsaXplZFxyXG5cdCAqL1xyXG5cdHR5cGU6ICdzaW1wbGUnIHwgJ2RhdGUnID0gJ3NpbXBsZSc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvY2FsaXplZCBzdHJpbmcgdG8gYmUgc2hvd24gYXMgYSBodW1hbi1yZWFkYWJsZSB0aXRsZSBmb3IgdGhlIFJlZmluZXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0ICogQG1lbWJlcm9mIFJlZmluZXJcclxuXHQgKi9cclxuXHR0aXRsZTogc3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIFwia2V5YWJsZVwiIHZhbHVlIHRoYXQgaXMgdW5pcXVlIHdpdGhpbiBhIHJlZmluZXIgc2V0LiAgVXN1YWxseSB0aGUgbmFtZSBvZiBhIHByb3BlcnR5LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge3N0cmluZ31cclxuXHQgKiBAbWVtYmVyb2YgUmVmaW5lclxyXG5cdCAqL1xyXG5cdHNsdWc6IHN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICogRGljdGlvbmFyeSBvZiBvcHRpb25TbHVnID0+IGxhYmVsIG9yIG9wdGlvblNsdWcgPT4gUmVmaW5lck9wdGlvblxyXG5cdCAqXHJcblx0ICogQHR5cGUge1NpbXBsZU9wdGlvbnN9XHJcblx0ICogQG1lbWJlcm9mIFJlZmluZXJEZWZpbml0aW9uXHJcblx0ICovXHJcblx0b3B0aW9ucz86IFNpbXBsZU9wdGlvbnM8U2ltcGxlT3B0aW9uLCBhbnk+O1xyXG5cclxuXHQvKipcclxuXHQgKiBUcnVlIHdoZW4gdGhlIFJlZmluZXIgaXMgdG8gYmUgc2hvd24gaW4gaXRzIG9wZW4gc3RhdGUuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgUmVmaW5lclxyXG5cdCAqL1xyXG5cdGlzT3Blbj86IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHQvKipcclxuXHQgKiBQcm92aWRlIGEgdmFsdWUgaWYgdGhlIHJlZmluZXIgc2hvdWxkIGluaXRpYWxpemUgd2l0aCBhIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge1JlZmluZXJWYWx1ZX1cclxuXHQgKiBAbWVtYmVyb2YgUmVmaW5lclxyXG5cdCAqL1xyXG5cdHZhbHVlOiBSZWZpbmVyVmFsdWU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE51bWJlciBvZiBvcHRpb25zIHRvIHNob3cgaW4gdGhlIHJlZmluZXIgaW4gdGhlIHVuLWV4cGFuZGVkIHN0YXRlLiBEZWZhdWx0IGlzIDVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtudW1iZXJ9XHJcblx0ICovXHJcblx0c2hvd0NvdW50PzogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZWZpbmVyRGVmaW5pdGlvbjogSVJlZmluZXJCYXNlKSB7XHJcblx0XHR0aGlzLnR5cGUgPSByZWZpbmVyRGVmaW5pdGlvbi50eXBlID8gcmVmaW5lckRlZmluaXRpb24udHlwZSA6ICdzaW1wbGUnO1xyXG5cdFx0dGhpcy50aXRsZSA9IHJlZmluZXJEZWZpbml0aW9uLnRpdGxlID8gcmVmaW5lckRlZmluaXRpb24udGl0bGUgOiAnJztcclxuXHRcdHRoaXMuc2x1ZyA9IHJlZmluZXJEZWZpbml0aW9uLnNsdWcgPyByZWZpbmVyRGVmaW5pdGlvbi5zbHVnIDogJyc7XHJcblx0XHR0aGlzLm9wdGlvbnMgPSByZWZpbmVyRGVmaW5pdGlvbi5vcHRpb25zID8gcmVmaW5lckRlZmluaXRpb24ub3B0aW9ucyA6IHt9O1xyXG5cdFx0dGhpcy5pc09wZW4gPVxyXG5cdFx0XHR0eXBlb2YgcmVmaW5lckRlZmluaXRpb24uaXNPcGVuID09PSAnYm9vbGVhbidcclxuXHRcdFx0XHQ/IHJlZmluZXJEZWZpbml0aW9uLmlzT3BlblxyXG5cdFx0XHRcdDogdHJ1ZTtcclxuXHJcblx0XHR0aGlzLnZhbHVlID0gcmVmaW5lckRlZmluaXRpb24udmFsdWUgPyByZWZpbmVyRGVmaW5pdGlvbi52YWx1ZSA6IG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaW1wbGVSZWZpbmVyIGV4dGVuZHMgSVJlZmluZXJCYXNlIHtcclxuXHRzZWxlY3RlZD86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltcGxlUmVmaW5lciBleHRlbmRzIFJlZmluZXJCYXNlIGltcGxlbWVudHMgSVNpbXBsZVJlZmluZXIge1xyXG5cdC8qKlxyXG5cdCAqIEFycmF5IG9mIHNsdWdzIHRvIG1hcmsgYXMgc2VsZWN0ZWQgb24gbG9hZC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtzdHJpbmdbXX1cclxuXHQgKi9cclxuXHRzZWxlY3RlZD86IHN0cmluZ1tdO1xyXG5cclxuXHQvKipcclxuXHQgKiBTdGF0ZSBmb3IgZXhwYW5kZWQvbm90IGV4cGFuZGVkLiBXaGVuIHRydWUsIGFsbCBvcHRpb25zIHdpbGwgYmUgc2hvd24gb24gaW5pdGlhbCByZW5kZXIuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAbWVtYmVyb2YgUmVmaW5lckJhc2VcclxuXHQgKi9cclxuXHRpc0V4cGFuZGVkPzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihyZWZpbmVyRGVmaW5pdGlvbjogSVNpbXBsZVJlZmluZXIpIHtcclxuXHRcdHN1cGVyKHJlZmluZXJEZWZpbml0aW9uKTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdGVkID0gcmVmaW5lckRlZmluaXRpb24uc2VsZWN0ZWQgPyByZWZpbmVyRGVmaW5pdGlvbi5zZWxlY3RlZCA6IFtdO1xyXG5cdFx0dGhpcy5zaG93Q291bnQgPSByZWZpbmVyRGVmaW5pdGlvbi5zaG93Q291bnRcclxuXHRcdFx0PyByZWZpbmVyRGVmaW5pdGlvbi5zaG93Q291bnRcclxuXHRcdFx0OiA1O1xyXG5cdFx0dGhpcy5pc0V4cGFuZGVkID1cclxuXHRcdFx0dHlwZW9mIHJlZmluZXJEZWZpbml0aW9uLmlzRXhwYW5kZWQgPT09ICdib29sZWFuJ1xyXG5cdFx0XHRcdD8gcmVmaW5lckRlZmluaXRpb24uaXNFeHBhbmRlZFxyXG5cdFx0XHRcdDogZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlUmVmaW5lciBleHRlbmRzIElSZWZpbmVyQmFzZSB7XHJcblx0b3B0aW9ucz86IElEYXRlT3B0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVSZWZpbmVyIGV4dGVuZHMgUmVmaW5lckJhc2UgaW1wbGVtZW50cyBJRGF0ZVJlZmluZXIge1xyXG5cdHJlYWRvbmx5IHR5cGUgPSAnZGF0ZSc7XHJcblxyXG5cdG9wdGlvbnM/OiBEYXRlT3B0aW9ucztcclxuXHJcblx0Y29uc3RydWN0b3IoZGF0ZVJlZmluZXI6IElEYXRlUmVmaW5lcikge1xyXG5cdFx0c3VwZXIoZGF0ZVJlZmluZXIpO1xyXG5cclxuXHRcdGlmIChkYXRlUmVmaW5lcikge1xyXG5cdFx0XHR0aGlzLm9wdGlvbnMgPSBkYXRlUmVmaW5lci5vcHRpb25zIHx8IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==