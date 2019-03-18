/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var RefinersComponent = /** @class */ (function () {
    function RefinersComponent() {
        // Outputs
        this.onRefinersChange = new EventEmitter();
        // Icons
        // State
        this.values = {};
    }
    /**
     * @return {?}
     */
    RefinersComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} update
     * @return {?}
     */
    RefinersComponent.prototype.handleRefinerChange = /**
     * @param {?} update
     * @return {?}
     */
    function (update) {
        var _a = tslib_1.__read(update, 2), slug = _a[0], selected = _a[1];
        console.log(slug + " refiner updated with value", selected);
        this.setValue(slug, selected);
    };
    /**
     * @param {?} slug
     * @param {?} value
     * @return {?}
     */
    RefinersComponent.prototype.setValue = /**
     * @param {?} slug
     * @param {?} value
     * @return {?}
     */
    function (slug, value) {
        this.values[slug] = value;
        this.onRefinersChange.emit(this.values);
    };
    /**
     * @return {?}
     */
    RefinersComponent.prototype.toQueryString = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Object.keys(this.values)
            .reduce((/**
         * @param {?} result
         * @param {?} paramKey
         * @return {?}
         */
        function (result, paramKey) {
            if (Array.isArray(_this.values[paramKey]) &&
                _this.values[paramKey].length === 0) {
                return result;
            }
            else if (Array.isArray(_this.values[paramKey]) &&
                _this.values[paramKey].length > 0) {
                return tslib_1.__spread(result, [
                    encodeURIComponent(paramKey) +
                        '=' +
                        _this.values[paramKey]
                            .map((/**
                         * @param {?} val
                         * @return {?}
                         */
                        function (val) { return encodeURIComponent(val); }))
                            .join(',')
                ]);
            }
            else if (typeof _this.values[paramKey] === 'object') {
                return tslib_1.__spread(result, [
                    Object.keys(_this.values[paramKey])
                        .map((/**
                     * @param {?} nestedKey
                     * @return {?}
                     */
                    function (nestedKey) {
                        /** @type {?} */
                        var valueToEncode = _this.values[paramKey][nestedKey] instanceof
                            Date
                            ? _this.values[paramKey][nestedKey].toJSON()
                            : _this.values[paramKey][nestedKey];
                        return (encodeURIComponent(paramKey) + "[" + encodeURIComponent(nestedKey) + "]" +
                            '=' +
                            encodeURIComponent(valueToEncode));
                    }))
                        .join('&')
                ]);
            }
        }), [])
            .join('&');
    };
    RefinersComponent.decorators = [
        { type: Component, args: [{
                    selector: 'porcelain-refiners',
                    template: "<ul class=\"refiners\" @[blockInitialAnimation]>\n\t<li *ngFor=\"let refiner of refiners\" class=\"refiner\">\n\t\t<ng-container *ngIf=\"refiner.type === 'date'\">\n\t\t\t<porcelain-date-refiner\n\t\t\t\t(onRefinerChange)=\"handleRefinerChange($event)\"\n\t\t\t\t[refiner]=\"refiner\"\n\t\t\t></porcelain-date-refiner>\n\t\t</ng-container>\n\n\t\t<ng-container *ngIf=\"refiner.type === 'simple'\">\n\t\t\t<porcelain-simple-refiner\n\t\t\t\t(onRefinerChange)=\"handleRefinerChange($event)\"\n\t\t\t\t[refiner]=\"refiner\"\n\t\t\t></porcelain-simple-refiner>\n\t\t</ng-container>\n\t</li>\n</ul>\n",
                    styles: ["a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}.media{display:flex;min-width:0;max-width:100%}.media__left,.media__right{flex:0}.media__left{margin-right:.75em}.media__body{flex:1}.media__right{margin-left:.75em}.media--align-items-center{align-items:center}.media--clickable{cursor:pointer}.media--align-center{-ms-grid-row-align:center;align-self:center}.refiners>.refiner+.refiner{border-top:1px solid #ccc}"]
                }] }
    ];
    RefinersComponent.ctorParameters = function () { return []; };
    RefinersComponent.propDecorators = {
        refiners: [{ type: Input }],
        onRefinersChange: [{ type: Output }]
    };
    return RefinersComponent;
}());
export { RefinersComponent };
if (false) {
    /** @type {?} */
    RefinersComponent.prototype.refiners;
    /** @type {?} */
    RefinersComponent.prototype.onRefinersChange;
    /** @type {?} */
    RefinersComponent.prototype.values;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmaW5lcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcG9yY2VsYWluLyIsInNvdXJjZXMiOlsibGliL3JlZmluZXJzL3JlZmluZXJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0U7SUFpQkM7UUFSQSxVQUFVO1FBQ0EscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFbEUsUUFBUTtRQUVSLFFBQVE7UUFDUixXQUFNLEdBQWlDLEVBQUUsQ0FBQztJQUUzQixDQUFDOzs7O0lBRWhCLG9DQUFROzs7SUFBUjtJQUNBLENBQUM7Ozs7O0lBRUQsK0NBQW1COzs7O0lBQW5CLFVBQW9CLE1BQXNCO1FBQ3JDLElBQUEsOEJBQXlCLEVBQXhCLFlBQUksRUFBRSxnQkFBUTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFJLElBQUksZ0NBQTZCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRUQsb0NBQVE7Ozs7O0lBQVIsVUFBUyxJQUFZLEVBQUUsS0FBVTtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN4QyxDQUFDOzs7O0lBRUQseUNBQWE7OztJQUFiO1FBQUEsaUJBK0NDO1FBOUNBLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDN0IsTUFBTTs7Ozs7UUFBQyxVQUFDLE1BQU0sRUFBRSxRQUFRO1lBQ3hCLEVBQUUsQ0FBQyxDQUNGLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FDbEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ1QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDRixNQUFNLGtCQUNGLE1BQU07b0JBQ1Qsa0JBQWtCLENBQUMsUUFBUSxDQUFDO3dCQUMzQixHQUFHO3dCQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOzZCQUNuQixHQUFHOzs7O3dCQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEVBQXZCLENBQXVCLEVBQUM7NkJBQ25DLElBQUksQ0FBQyxHQUFHLENBQUM7bUJBQ1g7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNULE9BQU8sS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxRQUNsQyxDQUFDLENBQUMsQ0FBQztnQkFDRixNQUFNLGtCQUNGLE1BQU07b0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUNoQyxHQUFHOzs7O29CQUFDLFVBQUEsU0FBUzs7NEJBQ1QsYUFBYSxHQUNoQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs0QkFDaEMsSUFBSTs0QkFDSCxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FDckIsU0FBUyxDQUNSLENBQUMsTUFBTSxFQUFFOzRCQUNaLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDcEMsTUFBTSxDQUFDLENBQ0gsa0JBQWtCLENBQ3BCLFFBQVEsQ0FDUixTQUFJLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxNQUFHOzRCQUNyQyxHQUFHOzRCQUNILGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUNqQyxDQUFDO29CQUNILENBQUMsRUFBQzt5QkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDO21CQUNWO1lBQ0gsQ0FBQztRQUNGLENBQUMsR0FBRSxFQUFFLENBQUM7YUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDOztnQkFqRkQsU0FBUyxTQUFDO29CQUNWLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLCtsQkFBd0M7O2lCQUV4Qzs7OzsyQkFHQyxLQUFLO21DQUdMLE1BQU07O0lBd0VSLHdCQUFDO0NBQUEsQUFsRkQsSUFrRkM7U0E3RVksaUJBQWlCOzs7SUFFN0IscUNBQWlDOztJQUdqQyw2Q0FBa0U7O0lBS2xFLG1DQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlZmluZXJCYXNlIH0gZnJvbSAnLi9JUmVmaW5lcic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3BvcmNlbGFpbi1yZWZpbmVycycsXG5cdHRlbXBsYXRlVXJsOiAnLi9yZWZpbmVycy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3JlZmluZXJzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVmaW5lcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHQvLyBJbnB1dHNcblx0QElucHV0KCkgcmVmaW5lcnM6IFJlZmluZXJCYXNlW107XG5cblx0Ly8gT3V0cHV0c1xuXHRAT3V0cHV0KCkgb25SZWZpbmVyc0NoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuXHQvLyBJY29uc1xuXG5cdC8vIFN0YXRlXG5cdHZhbHVlczogeyBbc2x1Zzogc3RyaW5nXTogc3RyaW5nW10gfSA9IHt9O1xuXG5cdGNvbnN0cnVjdG9yKCkge31cblxuXHRuZ09uSW5pdCgpIHtcblx0fVxuXG5cdGhhbmRsZVJlZmluZXJDaGFuZ2UodXBkYXRlOiBbc3RyaW5nLCBhbnkgXSkge1xuXHRcdGxldCBbc2x1Zywgc2VsZWN0ZWRdID0gdXBkYXRlO1xuXHRcdGNvbnNvbGUubG9nKGAke3NsdWd9IHJlZmluZXIgdXBkYXRlZCB3aXRoIHZhbHVlYCwgc2VsZWN0ZWQpO1xuXG5cdFx0dGhpcy5zZXRWYWx1ZShzbHVnLCBzZWxlY3RlZCk7XG5cdH1cblxuXHRzZXRWYWx1ZShzbHVnOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcblx0XHR0aGlzLnZhbHVlc1tzbHVnXSA9IHZhbHVlO1xuXHRcdHRoaXMub25SZWZpbmVyc0NoYW5nZS5lbWl0KHRoaXMudmFsdWVzKVxuXHR9XG5cblx0dG9RdWVyeVN0cmluZygpOiBzdHJpbmcge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlcylcblx0XHRcdC5yZWR1Y2UoKHJlc3VsdCwgcGFyYW1LZXkpID0+IHtcblx0XHRcdFx0aWYgKCAvLyBOb25lIGFyZSBzZWxlY3RlZCwgcmV0dXJuIHJlc3VsdCBzbyBmYXJcblx0XHRcdFx0XHRBcnJheS5pc0FycmF5KHRoaXMudmFsdWVzW3BhcmFtS2V5XSkgJiZcblx0XHRcdFx0XHR0aGlzLnZhbHVlc1twYXJhbUtleV0ubGVuZ3RoID09PSAwXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIC8vIFNvbWUgYXJlIHNlbGVjdGVkLCByZXR1cm4gcmVzdWx0ICsgbmV3IG9wdGlvbnNcblx0XHRcdFx0XHRBcnJheS5pc0FycmF5KHRoaXMudmFsdWVzW3BhcmFtS2V5XSkgJiZcblx0XHRcdFx0XHR0aGlzLnZhbHVlc1twYXJhbUtleV0ubGVuZ3RoID4gMFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdFx0Li4ucmVzdWx0LFxuXHRcdFx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtS2V5KSArXG5cdFx0XHRcdFx0XHRcdCc9JyArXG5cdFx0XHRcdFx0XHRcdHRoaXMudmFsdWVzW3BhcmFtS2V5XVxuXHRcdFx0XHRcdFx0XHRcdC5tYXAodmFsID0+IGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKVxuXHRcdFx0XHRcdFx0XHRcdC5qb2luKCcsJylcblx0XHRcdFx0XHRdO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCAvLyBJcyBhbiBvYmplY3QsIGxpa2UgYSBkaWN0aW9uYXJ5IChzdGFydCwgZW5kIGRhdGUpXG5cdFx0XHRcdFx0dHlwZW9mIHRoaXMudmFsdWVzW3BhcmFtS2V5XSA9PT0gJ29iamVjdCdcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHRcdC4uLnJlc3VsdCxcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMudmFsdWVzW3BhcmFtS2V5XSlcblx0XHRcdFx0XHRcdFx0Lm1hcChuZXN0ZWRLZXkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGxldCB2YWx1ZVRvRW5jb2RlID1cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudmFsdWVzW3BhcmFtS2V5XVtuZXN0ZWRLZXldIGluc3RhbmNlb2Zcblx0XHRcdFx0XHRcdFx0XHRcdERhdGVcblx0XHRcdFx0XHRcdFx0XHRcdFx0PyB0aGlzLnZhbHVlc1twYXJhbUtleV1bXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRuZXN0ZWRLZXlcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICBdLnRvSlNPTigpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDogdGhpcy52YWx1ZXNbcGFyYW1LZXldW25lc3RlZEtleV07XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHRcdGAke2VuY29kZVVSSUNvbXBvbmVudChcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFyYW1LZXlcblx0XHRcdFx0XHRcdFx0XHRcdCl9WyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5lc3RlZEtleSl9XWAgK1xuXHRcdFx0XHRcdFx0XHRcdFx0Jz0nICtcblx0XHRcdFx0XHRcdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZVRvRW5jb2RlKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5qb2luKCcmJylcblx0XHRcdFx0XHRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBbXSlcblx0XHRcdC5qb2luKCcmJyk7XG5cdH1cbn1cbiJdfQ==