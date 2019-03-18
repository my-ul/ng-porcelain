/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class RefinersComponent {
    constructor() {
        // Outputs
        this.onRefinersChange = new EventEmitter();
        // Icons
        // State
        this.values = {};
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} update
     * @return {?}
     */
    handleRefinerChange(update) {
        let [slug, selected] = update;
        console.log(`${slug} refiner updated with value`, selected);
        this.setValue(slug, selected);
    }
    /**
     * @param {?} slug
     * @param {?} value
     * @return {?}
     */
    setValue(slug, value) {
        this.values[slug] = value;
        this.onRefinersChange.emit(this.values);
    }
    /**
     * @return {?}
     */
    toQueryString() {
        return Object.keys(this.values)
            .reduce((/**
         * @param {?} result
         * @param {?} paramKey
         * @return {?}
         */
        (result, paramKey) => {
            if (Array.isArray(this.values[paramKey]) &&
                this.values[paramKey].length === 0) {
                return result;
            }
            else if (Array.isArray(this.values[paramKey]) &&
                this.values[paramKey].length > 0) {
                return [
                    ...result,
                    encodeURIComponent(paramKey) +
                        '=' +
                        this.values[paramKey]
                            .map((/**
                         * @param {?} val
                         * @return {?}
                         */
                        val => encodeURIComponent(val)))
                            .join(',')
                ];
            }
            else if (typeof this.values[paramKey] === 'object') {
                return [
                    ...result,
                    Object.keys(this.values[paramKey])
                        .map((/**
                     * @param {?} nestedKey
                     * @return {?}
                     */
                    nestedKey => {
                        /** @type {?} */
                        let valueToEncode = this.values[paramKey][nestedKey] instanceof
                            Date
                            ? this.values[paramKey][nestedKey].toJSON()
                            : this.values[paramKey][nestedKey];
                        return (`${encodeURIComponent(paramKey)}[${encodeURIComponent(nestedKey)}]` +
                            '=' +
                            encodeURIComponent(valueToEncode));
                    }))
                        .join('&')
                ];
            }
        }), [])
            .join('&');
    }
}
RefinersComponent.decorators = [
    { type: Component, args: [{
                selector: 'porcelain-refiners',
                template: "<ul class=\"refiners\" @[blockInitialAnimation]>\n\t<li *ngFor=\"let refiner of refiners\" class=\"refiner\">\n\t\t<ng-container *ngIf=\"refiner.type === 'date'\">\n\t\t\t<porcelain-date-refiner\n\t\t\t\t(onRefinerChange)=\"handleRefinerChange($event)\"\n\t\t\t\t[refiner]=\"refiner\"\n\t\t\t></porcelain-date-refiner>\n\t\t</ng-container>\n\n\t\t<ng-container *ngIf=\"refiner.type === 'simple'\">\n\t\t\t<porcelain-simple-refiner\n\t\t\t\t(onRefinerChange)=\"handleRefinerChange($event)\"\n\t\t\t\t[refiner]=\"refiner\"\n\t\t\t></porcelain-simple-refiner>\n\t\t</ng-container>\n\t</li>\n</ul>\n",
                styles: ["a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}.media{display:flex;min-width:0;max-width:100%}.media__left,.media__right{flex:0}.media__left{margin-right:.75em}.media__body{flex:1}.media__right{margin-left:.75em}.media--align-items-center{align-items:center}.media--clickable{cursor:pointer}.media--align-center{-ms-grid-row-align:center;align-self:center}.refiners>.refiner+.refiner{border-top:1px solid #ccc}"]
            }] }
];
RefinersComponent.ctorParameters = () => [];
RefinersComponent.propDecorators = {
    refiners: [{ type: Input }],
    onRefinersChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    RefinersComponent.prototype.refiners;
    /** @type {?} */
    RefinersComponent.prototype.onRefinersChange;
    /** @type {?} */
    RefinersComponent.prototype.values;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmaW5lcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcG9yY2VsYWluLyIsInNvdXJjZXMiOlsibGliL3JlZmluZXJzL3JlZmluZXJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEvRSxNQUFNO0lBWUw7UUFSQSxVQUFVO1FBQ0EscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUE7UUFFbEUsUUFBUTtRQUVSLFFBQVE7UUFDUixXQUFNLEdBQWlDLEVBQUUsQ0FBQztJQUUzQixDQUFDOzs7O0lBRWhCLFFBQVE7SUFDUixDQUFDOzs7OztJQUVELG1CQUFtQixDQUFDLE1BQXNCO1lBQ3JDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLE1BQU07UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksNkJBQTZCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQVksRUFBRSxLQUFVO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUM3QixNQUFNOzs7OztRQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxDQUNGLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FDbEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ1QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDRixNQUFNLENBQUM7b0JBQ04sR0FBRyxNQUFNO29CQUNULGtCQUFrQixDQUFDLFFBQVEsQ0FBQzt3QkFDM0IsR0FBRzt3QkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs2QkFDbkIsR0FBRzs7Ozt3QkFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxFQUFDOzZCQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNaLENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxRQUNsQyxDQUFDLENBQUMsQ0FBQztnQkFDRixNQUFNLENBQUM7b0JBQ04sR0FBRyxNQUFNO29CQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDaEMsR0FBRzs7OztvQkFBQyxTQUFTLENBQUMsRUFBRTs7NEJBQ1osYUFBYSxHQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs0QkFDaEMsSUFBSTs0QkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FDckIsU0FBUyxDQUNSLENBQUMsTUFBTSxFQUFFOzRCQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDcEMsTUFBTSxDQUFDLENBQ04sR0FBRyxrQkFBa0IsQ0FDcEIsUUFBUSxDQUNSLElBQUksa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUc7NEJBQ3JDLEdBQUc7NEJBQ0gsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQ2pDLENBQUM7b0JBQ0gsQ0FBQyxFQUFDO3lCQUNELElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1gsQ0FBQztZQUNILENBQUM7UUFDRixDQUFDLEdBQUUsRUFBRSxDQUFDO2FBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7O1lBakZELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QiwrbEJBQXdDOzthQUV4Qzs7Ozt1QkFHQyxLQUFLOytCQUdMLE1BQU07Ozs7SUFIUCxxQ0FBaUM7O0lBR2pDLDZDQUFrRTs7SUFLbEUsbUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVmaW5lckJhc2UgfSBmcm9tICcuL0lSZWZpbmVyJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAncG9yY2VsYWluLXJlZmluZXJzJyxcblx0dGVtcGxhdGVVcmw6ICcuL3JlZmluZXJzLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcmVmaW5lcnMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZWZpbmVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdC8vIElucHV0c1xuXHRASW5wdXQoKSByZWZpbmVyczogUmVmaW5lckJhc2VbXTtcblxuXHQvLyBPdXRwdXRzXG5cdEBPdXRwdXQoKSBvblJlZmluZXJzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG5cdC8vIEljb25zXG5cblx0Ly8gU3RhdGVcblx0dmFsdWVzOiB7IFtzbHVnOiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge307XG5cblx0Y29uc3RydWN0b3IoKSB7fVxuXG5cdG5nT25Jbml0KCkge1xuXHR9XG5cblx0aGFuZGxlUmVmaW5lckNoYW5nZSh1cGRhdGU6IFtzdHJpbmcsIGFueSBdKSB7XG5cdFx0bGV0IFtzbHVnLCBzZWxlY3RlZF0gPSB1cGRhdGU7XG5cdFx0Y29uc29sZS5sb2coYCR7c2x1Z30gcmVmaW5lciB1cGRhdGVkIHdpdGggdmFsdWVgLCBzZWxlY3RlZCk7XG5cblx0XHR0aGlzLnNldFZhbHVlKHNsdWcsIHNlbGVjdGVkKTtcblx0fVxuXG5cdHNldFZhbHVlKHNsdWc6IHN0cmluZywgdmFsdWU6IGFueSkge1xuXHRcdHRoaXMudmFsdWVzW3NsdWddID0gdmFsdWU7XG5cdFx0dGhpcy5vblJlZmluZXJzQ2hhbmdlLmVtaXQodGhpcy52YWx1ZXMpXG5cdH1cblxuXHR0b1F1ZXJ5U3RyaW5nKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKVxuXHRcdFx0LnJlZHVjZSgocmVzdWx0LCBwYXJhbUtleSkgPT4ge1xuXHRcdFx0XHRpZiAoIC8vIE5vbmUgYXJlIHNlbGVjdGVkLCByZXR1cm4gcmVzdWx0IHNvIGZhclxuXHRcdFx0XHRcdEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZXNbcGFyYW1LZXldKSAmJlxuXHRcdFx0XHRcdHRoaXMudmFsdWVzW3BhcmFtS2V5XS5sZW5ndGggPT09IDBcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fSBlbHNlIGlmICggLy8gU29tZSBhcmUgc2VsZWN0ZWQsIHJldHVybiByZXN1bHQgKyBuZXcgb3B0aW9uc1xuXHRcdFx0XHRcdEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZXNbcGFyYW1LZXldKSAmJlxuXHRcdFx0XHRcdHRoaXMudmFsdWVzW3BhcmFtS2V5XS5sZW5ndGggPiAwXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0XHQuLi5yZXN1bHQsXG5cdFx0XHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQocGFyYW1LZXkpICtcblx0XHRcdFx0XHRcdFx0Jz0nICtcblx0XHRcdFx0XHRcdFx0dGhpcy52YWx1ZXNbcGFyYW1LZXldXG5cdFx0XHRcdFx0XHRcdFx0Lm1hcCh2YWwgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpXG5cdFx0XHRcdFx0XHRcdFx0LmpvaW4oJywnKVxuXHRcdFx0XHRcdF07XG5cdFx0XHRcdH0gZWxzZSBpZiAoIC8vIElzIGFuIG9iamVjdCwgbGlrZSBhIGRpY3Rpb25hcnkgKHN0YXJ0LCBlbmQgZGF0ZSlcblx0XHRcdFx0XHR0eXBlb2YgdGhpcy52YWx1ZXNbcGFyYW1LZXldID09PSAnb2JqZWN0J1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdFx0Li4ucmVzdWx0LFxuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy52YWx1ZXNbcGFyYW1LZXldKVxuXHRcdFx0XHRcdFx0XHQubWFwKG5lc3RlZEtleSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IHZhbHVlVG9FbmNvZGUgPVxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy52YWx1ZXNbcGFyYW1LZXldW25lc3RlZEtleV0gaW5zdGFuY2VvZlxuXHRcdFx0XHRcdFx0XHRcdFx0RGF0ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ/IHRoaXMudmFsdWVzW3BhcmFtS2V5XVtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5lc3RlZEtleVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgIF0udG9KU09OKClcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiB0aGlzLnZhbHVlc1twYXJhbUtleV1bbmVzdGVkS2V5XTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdFx0YCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYXJhbUtleVxuXHRcdFx0XHRcdFx0XHRcdFx0KX1bJHtlbmNvZGVVUklDb21wb25lbnQobmVzdGVkS2V5KX1dYCArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPScgK1xuXHRcdFx0XHRcdFx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlVG9FbmNvZGUpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LmpvaW4oJyYnKVxuXHRcdFx0XHRcdF07XG5cdFx0XHRcdH1cblx0XHRcdH0sIFtdKVxuXHRcdFx0LmpvaW4oJyYnKTtcblx0fVxufVxuIl19