/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';
// Font Awesome 5
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
// Utilities
import moment from 'moment';
// Porcelain
import { DateRefiner } from '../refiners/IRefiner';
import { DateOption } from '../refiners/IOption';
import { generateSlideInOut } from '../shared/animations/slideInOut.trigger';
/**
 * @record
 */
export function DateRefinerValue() { }
if (false) {
    /** @type {?} */
    DateRefinerValue.prototype.from;
    /** @type {?} */
    DateRefinerValue.prototype.to;
}
/**
 * @record
 */
export function IDateRefinerProps() { }
if (false) {
    /** @type {?|undefined} */
    IDateRefinerProps.prototype.isOpen;
    /** @type {?} */
    IDateRefinerProps.prototype.refiner;
    /** @type {?} */
    IDateRefinerProps.prototype.onRefinerChange;
}
/** @type {?} */
var momentFloor = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
function (arg1, arg2) {
    return moment()
        .set('hours', 0)
        .set('minutes', 0)
        .set('seconds', 0);
});
var ɵ0 = momentFloor;
/** @type {?} */
var momentFloorSubtract = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
function (arg1, arg2) { return momentFloor().subtract(arg1, arg2); });
var ɵ1 = momentFloorSubtract;
/** @type {?} */
var momentFloorAdd = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
function (arg1, arg2) { return momentFloor().add(arg1, arg2); });
var ɵ2 = momentFloorAdd;
/** @type {?} */
export var defaultDateOptions = {
    // yields no range by default (unrestricted)
    '-1': new DateOption({
        slug: '-1',
        getTo: (/**
         * @return {?}
         */
        function () { return null; }),
        getFrom: (/**
         * @return {?}
         */
        function () { return null; }),
        label: 'View All'
    }),
    // select item where getFrom() <= date < getTo()
    '1': new DateOption({
        label: 'Today',
        slug: '1',
        getTo: (/**
         * @return {?}
         */
        function () { return momentFloorAdd(1, 'day').toDate(); }),
        getFrom: (/**
         * @return {?}
         */
        function () { return momentFloor().toDate(); })
    }),
    '7': new DateOption({
        label: 'Last 7 Days',
        slug: '7',
        getTo: (/**
         * @return {?}
         */
        function () { return momentFloorAdd(1, 'day').toDate(); }),
        getFrom: (/**
         * @return {?}
         */
        function () { return momentFloorSubtract(7, 'days').toDate(); })
    }),
    '30': new DateOption({
        label: 'Last 30 Days',
        slug: '30',
        getTo: (/**
         * @return {?}
         */
        function () { return momentFloorAdd(1, 'day').toDate(); }),
        getFrom: (/**
         * @return {?}
         */
        function () { return momentFloorSubtract(30, 'days').toDate(); })
    }),
    '90': new DateOption({
        label: 'Last 90 Days',
        slug: '90',
        getTo: (/**
         * @return {?}
         */
        function () { return momentFloorAdd(1, 'day').toDate(); }),
        getFrom: (/**
         * @return {?}
         */
        function () { return momentFloorSubtract(90, 'days').toDate(); })
    }),
    custom: new DateOption({
        isSelected: true,
        label: 'Date Range...',
        slug: 'custom',
        getTo: (/**
         * @param {?=} toString
         * @return {?}
         */
        function (toString) { return moment(toString).toDate(); }),
        getFrom: (/**
         * @param {?=} fromString
         * @return {?}
         */
        function (fromString) { return moment(fromString).toDate(); })
    })
};
/** @type {?} */
var animationOptionsInOut = generateSlideInOut('optionsInOut');
/** @type {?} */
var animationRangeInOut = generateSlideInOut('rangeInOut');
var DateRefinerComponent = /** @class */ (function () {
    function DateRefinerComponent() {
        // Inputs
        this.isOpen = true;
        // Outputs
        this.onRefinerChange = new EventEmitter();
        // Icons
        this.faChevronDown = faCaretDown;
        // Constants
        this.options = defaultDateOptions;
        // Angular
        this.objectKeys = Object.keys;
    }
    // Events
    // Events
    /**
     * @return {?}
     */
    DateRefinerComponent.prototype.onChange = 
    // Events
    /**
     * @return {?}
     */
    function () {
        this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);
    };
    // States
    // States
    /**
     * @param {?} dateOptionOrDate
     * @return {?}
     */
    DateRefinerComponent.prototype.optionHasBadge = 
    // States
    /**
     * @param {?} dateOptionOrDate
     * @return {?}
     */
    function (dateOptionOrDate) {
        return (dateOptionOrDate instanceof DateOption &&
            typeof dateOptionOrDate.badge !== 'undefined');
    };
    // Getters
    // Getters
    /**
     * @return {?}
     */
    DateRefinerComponent.prototype.getValue = 
    // Getters
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedOption = this.options[this.currentOptionSlug];
        return {
            from: selectedOption instanceof DateOption
                ? selectedOption.getFrom(this.startString)
                : selectedOption,
            to: selectedOption instanceof DateOption
                ? selectedOption.getTo(this.endString)
                : selectedOption
        };
    };
    /**
     * @param {?} option
     * @return {?}
     */
    DateRefinerComponent.prototype.getOptionLabel = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option instanceof DateOption) {
            if (option.label) {
                return option.label;
            }
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    DateRefinerComponent.prototype.getOptionBadge = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option instanceof DateOption) {
            if (option.badge) {
                if (typeof option.badge === 'number') {
                    return option.badge.toLocaleString();
                }
                else {
                    return option.badge;
                }
            }
        }
        else {
            return '';
        }
    };
    // Mutators
    // Mutators
    /**
     * @return {?}
     */
    DateRefinerComponent.prototype.toggleOpen = 
    // Mutators
    /**
     * @return {?}
     */
    function () {
        this.isOpen = !this.isOpen;
    };
    /**
     * @return {?}
     */
    DateRefinerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.options = this.refiner.options
            ? this.refiner.options
            : defaultDateOptions;
        for (var optionSlug in this.options) {
            /** @type {?} */
            var option = this.options[optionSlug];
            if (option instanceof DateOption) {
                if (option.isSelected === true) {
                    this.currentOptionSlug = optionSlug;
                }
            }
        }
        this.onChange();
    };
    DateRefinerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'porcelain-date-refiner',
                    template: "<div\n\tclass=\"refiner refiner--date\"\n\t[class.refiner--open]=\"isOpen\"\n\t[class.refiner--closed]=\"!isOpen\"\n>\n\t<div class=\"refiner__section refiner__header\" (click)=\"toggleOpen()\">\n\t\t<div class=\"media media--clickable\">\n\t\t\t<div class=\"media__body  media--align-center\">\n\t\t\t\t<h3 class=\"refiner__title\">{{ refiner.title }}</h3>\n\t\t\t</div>\n\t\t\t<div class=\"refiner__toggle | media__right media--align-center\">\n\t\t\t\t<fa-icon [icon]=\"faChevronDown\"></fa-icon>\n\t\t\t\t<span class=\"sr-only\">Expand {{ refiner.title }} refiner</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- /.refiner__header -->\n\n\t<!-- [@blockInitialAnimation] -->\n\t<div  class=\"refiner__section refiner__toggleable\">\n\t\t<!-- [@optionsInOut] -->\n\t\t<div *ngIf=\"isOpen\"  class=\"refiner__section  refiner__body\">\n\t\t\t<div class=\"refiner__section refiner__options\">\n\t\t\t\t<ul class=\"options\">\n\t\t\t\t\t<li\n\t\t\t\t\t\t*ngFor=\"let optionSlug of objectKeys(options)\"\n\t\t\t\t\t\tclass=\"option\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<label class=\"media media--align-items-center\">\n\t\t\t\t\t\t\t<div class=\"media__left\">\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"currentOptionSlug\"\n\t\t\t\t\t\t\t\t\tvalue=\"{{ optionSlug }}\"\n\t\t\t\t\t\t\t\t\t(change)=\"onChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"media__body\">\n\t\t\t\t\t\t\t\t<app-truncate\n\t\t\t\t\t\t\t\t\t[value]=\"getOptionLabel(options[optionSlug])\"\n\t\t\t\t\t\t\t\t></app-truncate>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\tclass=\"media__right media--align-center\"\n\t\t\t\t\t\t\t\t*ngIf=\"optionHasBadge(options[optionSlug])\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t{{ getOptionBadge(options[optionSlug]) }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__options -->\n\n\t\t\t<div class=\"refiner__section refiner__custom-range\">\n\t\t\t\t<!-- @blockInitialAnimation -->\n\t\t\t\t<ng-container>\n\t\t\t\t\t<!-- [@rangeInOut] -->\n\t\t\t\t\t<div *ngIf=\"currentOptionSlug === 'custom'\">\n\t\t\t\t\t\t<div class=\"range\">\n\t\t\t\t\t\t\t<label class=\"from\"\n\t\t\t\t\t\t\t\t>From\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\tclass=\"datepicker\"\n\t\t\t\t\t\t\t\t\ttype=\"date\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"startString\"\n\t\t\t\t\t\t\t\t\tplaceholder=\"Start Date\"\n\t\t\t\t\t\t\t\t\t(change)=\"onChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t<label class=\"to\">\n\t\t\t\t\t\t\t\tTo\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\tclass=\"datepicker\"\n\t\t\t\t\t\t\t\t\ttype=\"date\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"endString\"\n\t\t\t\t\t\t\t\t\tplaceholder=\"End Date\"\n\t\t\t\t\t\t\t\t\t(change)=\"onChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</ng-container>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__custom-range -->\n\t\t</div>\n\t\t<!-- /.refiner__body -->\n\t</div>\n</div>\n",
                    styles: ["a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}.media{display:flex;min-width:0;max-width:100%}.media__left,.media__right{flex:0}.media__left{margin-right:.75em}.media__body{flex:1}.media__right{margin-left:.75em}.media--align-items-center{align-items:center}.media--clickable{cursor:pointer}.media--align-center{-ms-grid-row-align:center;align-self:center}.toggleable.toggleable--closed>.toggleable__subject+.toggleable__subject{margin-top:0}.toggleable.toggleable--open>.toggleable__subject+.toggleable__subject{margin-top:1.5}.refiner{padding:1em}.refiner .refiner__head{cursor:pointer;background-color:red}.refiner .refiner__title{font-size:1em;font-weight:600}.refiner .refiner__section+.refiner__section:not(.refiner__toggleable){margin-top:1em}.refiner>.refiner__section+.refiner__section{transition:margin-top .2s linear;overflow:hidden}.refiner.refiner--closed>.refiner__section+.refiner__section.refiner__toggleable{margin-top:0}.refiner.refiner--open>.refiner__section+.refiner__section.refiner__toggleable{margin-top:1em}.refiner__select-all,.refiner__select-none{cursor:pointer;margin:0;padding:0;color:#23527c;text-decoration:underline;font-size:.85rem;border:none;background:0 0}.refiner__select-all:hover,.refiner__select-none:hover{color:#2e6ca4}.refiner__expand-toggle{margin:0;padding:.4em .8em;border:none;color:#333;font-size:.75em;background:#e0e0e0;border-radius:.2em;cursor:pointer}.refiner__expand-toggle[disabled]{color:#999;cursor:not-allowed}.refiner .refiner__toggle{transition:transform .2s ease-in-out;transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out}.refiner.refiner--closed .refiner__toggle{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.refiner .options{list-style:none;margin:0;padding:0}.refiner__expand-toggle+.refiner__expand-toggle,.refiner__expand-toggle+.refiner__select-all,.refiner__expand-toggle+.refiner__select-none,.refiner__select-all+.refiner__expand-toggle,.refiner__select-all+.refiner__select-all,.refiner__select-all+.refiner__select-none,.refiner__select-none+.refiner__expand-toggle,.refiner__select-none+.refiner__select-all,.refiner__select-none+.refiner__select-none{margin-left:.3em}.range .from,.range .to{display:block}.range .from input,.range .to input{margin-top:.3em;width:50%}.range .from+.to{margin-top:.6em}.datepicker{border-radius:.3em;border:1px solid silver;padding:.3em .6em;display:block}"]
                }] }
    ];
    DateRefinerComponent.ctorParameters = function () { return []; };
    DateRefinerComponent.propDecorators = {
        isOpen: [{ type: Input }],
        refiner: [{ type: Input }],
        onRefinerChange: [{ type: Output }]
    };
    return DateRefinerComponent;
}());
export { DateRefinerComponent };
if (false) {
    /** @type {?} */
    DateRefinerComponent.prototype.isOpen;
    /** @type {?} */
    DateRefinerComponent.prototype.refiner;
    /** @type {?} */
    DateRefinerComponent.prototype.onRefinerChange;
    /** @type {?} */
    DateRefinerComponent.prototype.faChevronDown;
    /** @type {?} */
    DateRefinerComponent.prototype.options;
    /** @type {?} */
    DateRefinerComponent.prototype.objectKeys;
    /** @type {?} */
    DateRefinerComponent.prototype.currentOptionSlug;
    /** @type {?} */
    DateRefinerComponent.prototype.startString;
    /** @type {?} */
    DateRefinerComponent.prototype.endString;
}
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yZWZpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BvcmNlbGFpbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXJlZmluZXIvZGF0ZS1yZWZpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFHaEUsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUc1QixPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7OztBQVE3RSxzQ0FHQzs7O0lBRkEsZ0NBQVc7O0lBQ1gsOEJBQVM7Ozs7O0FBR1YsdUNBSUM7OztJQUhBLG1DQUFpQjs7SUFDakIsb0NBQXNCOztJQUN0Qiw0Q0FBbUM7OztJQUc5QixXQUFXOzs7OztBQUFHLFVBQ25CLElBQStCLEVBQy9CLElBQStCO0lBRS9CLE9BQUEsTUFBTSxFQUFFO1NBQ04sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDZixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUNqQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUhuQixDQUdtQixDQUFBOzs7SUFFZCxtQkFBbUI7Ozs7O0FBQUcsVUFDM0IsSUFBK0IsRUFDL0IsSUFBK0IsSUFDM0IsT0FBQSxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFsQyxDQUFrQyxDQUFBOzs7SUFFakMsY0FBYzs7Ozs7QUFBRyxVQUN0QixJQUErQixFQUMvQixJQUErQixJQUMz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LENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO2dCQUNyQyxDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Z0JBekdELFNBQVMsU0FBQztvQkFDVixRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyx3K0ZBQTRDOztpQkFPNUM7Ozs7eUJBR0MsS0FBSzswQkFDTCxLQUFLO2tDQUdMLE1BQU07O0lBMEZSLDJCQUFDO0NBQUEsQUExR0QsSUEwR0M7U0FoR1ksb0JBQW9COzs7SUFFaEMsc0NBQWdDOztJQUNoQyx1Q0FBOEI7O0lBRzlCLCtDQUFrRTs7SUFHbEUsNkNBQTRCOztJQUc1Qix1Q0FBMEM7O0lBRzFDLDBDQUF5Qjs7SUFHekIsaURBQTBCOztJQUMxQiwyQ0FBb0I7O0lBQ3BCLHlDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gRm9udCBBd2Vzb21lIDVcbmltcG9ydCB7IGZhQ2FyZXREb3duIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbi8vIFBvcmNlbGFpblxuaW1wb3J0IHsgSURhdGVSZWZpbmVyLCBEYXRlUmVmaW5lciB9IGZyb20gJy4uL3JlZmluZXJzL0lSZWZpbmVyJztcbmltcG9ydCB7IERhdGVPcHRpb25zIH0gZnJvbSAnLi4vcmVmaW5lcnMvSU9wdGlvbnMnO1xuaW1wb3J0IHsgRGF0ZU9wdGlvbiB9IGZyb20gJy4uL3JlZmluZXJzL0lPcHRpb24nO1xuaW1wb3J0IHsgYmxvY2tJbml0aWFsQW5pbWF0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FuaW1hdGlvbnMvYmxvY2tJbml0aWFsQW5pbWF0aW9uLnRyaWdnZXInO1xuaW1wb3J0IHsgZ2VuZXJhdGVTbGlkZUluT3V0IH0gZnJvbSAnLi4vc2hhcmVkL2FuaW1hdGlvbnMvc2xpZGVJbk91dC50cmlnZ2VyJztcblxuLy8gaW1wb3J0IHsgRGF0ZU9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9saWIvcmVmaW5lcnMvSU9wdGlvbic7XG4vLyBpbXBvcnQgeyBEYXRlT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9saWIvcmVmaW5lcnMvSU9wdGlvbnMnO1xuLy8gaW1wb3J0IHsgRGF0ZVJlZmluZXIsIElEYXRlUmVmaW5lciB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9saWIvcmVmaW5lcnMvSVJlZmluZXInO1xuLy8gaW1wb3J0IHsgYmxvY2tJbml0aWFsQW5pbWF0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FuaW1hdGlvbnMvYmxvY2tJbml0aWFsQW5pbWF0aW9uLnRyaWdnZXInO1xuLy8gaW1wb3J0IHsgZ2VuZXJhdGVTbGlkZUluT3V0IH0gZnJvbSAnLi4vc2hhcmVkL2FuaW1hdGlvbnMvc2xpZGVJbk91dC50cmlnZ2VyJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRlUmVmaW5lclZhbHVlIHtcblx0ZnJvbTogRGF0ZTtcblx0dG86IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVSZWZpbmVyUHJvcHMge1xuXHRpc09wZW4/OiBib29sZWFuO1xuXHRyZWZpbmVyOiBJRGF0ZVJlZmluZXI7XG5cdG9uUmVmaW5lckNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT47XG59XG5cbmNvbnN0IG1vbWVudEZsb29yID0gKFxuXHRhcmcxPzogbW9tZW50LkR1cmF0aW9uSW5wdXRBcmcxLFxuXHRhcmcyPzogbW9tZW50LkR1cmF0aW9uSW5wdXRBcmcyXG4pID0+XG5cdG1vbWVudCgpXG5cdFx0LnNldCgnaG91cnMnLCAwKVxuXHRcdC5zZXQoJ21pbnV0ZXMnLCAwKVxuXHRcdC5zZXQoJ3NlY29uZHMnLCAwKTtcblxuY29uc3QgbW9tZW50Rmxvb3JTdWJ0cmFjdCA9IChcblx0YXJnMT86IG1vbWVudC5EdXJhdGlvbklucHV0QXJnMSxcblx0YXJnMj86IG1vbWVudC5EdXJhdGlvbklucHV0QXJnMlxuKSA9PiBtb21lbnRGbG9vcigpLnN1YnRyYWN0KGFyZzEsIGFyZzIpO1xuXG5jb25zdCBtb21lbnRGbG9vckFkZCA9IChcblx0YXJnMT86IG1vbWVudC5EdXJhdGlvbklucHV0QXJnMSxcblx0YXJnMj86IG1vbWVudC5EdXJhdGlvbklucHV0QXJnMlxuKSA9PiBtb21lbnRGbG9vcigpLmFkZChhcmcxLCBhcmcyKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHREYXRlT3B0aW9uczogRGF0ZU9wdGlvbnMgPSB7XG5cdC8vIHlpZWxkcyBubyByYW5nZSBieSBkZWZhdWx0ICh1bnJlc3RyaWN0ZWQpXG5cdCctMSc6IG5ldyBEYXRlT3B0aW9uKHtcblx0XHRzbHVnOiAnLTEnLFxuXHRcdGdldFRvOiAoKSA9PiBudWxsLFxuXHRcdGdldEZyb206ICgpID0+IG51bGwsXG5cdFx0bGFiZWw6ICdWaWV3IEFsbCdcblx0fSksXG5cblx0Ly8gc2VsZWN0IGl0ZW0gd2hlcmUgZ2V0RnJvbSgpIDw9IGRhdGUgPCBnZXRUbygpXG5cdCcxJzogbmV3IERhdGVPcHRpb24oe1xuXHRcdGxhYmVsOiAnVG9kYXknLFxuXHRcdHNsdWc6ICcxJyxcblx0XHRnZXRUbzogKCkgPT4gbW9tZW50Rmxvb3JBZGQoMSwgJ2RheScpLnRvRGF0ZSgpLFxuXHRcdGdldEZyb206ICgpID0+IG1vbWVudEZsb29yKCkudG9EYXRlKClcblx0fSksXG5cdCc3JzogbmV3IERhdGVPcHRpb24oe1xuXHRcdGxhYmVsOiAnTGFzdCA3IERheXMnLFxuXHRcdHNsdWc6ICc3Jyxcblx0XHRnZXRUbzogKCkgPT4gbW9tZW50Rmxvb3JBZGQoMSwgJ2RheScpLnRvRGF0ZSgpLFxuXHRcdGdldEZyb206ICgpID0+IG1vbWVudEZsb29yU3VidHJhY3QoNywgJ2RheXMnKS50b0RhdGUoKVxuXHR9KSxcblx0JzMwJzogbmV3IERhdGVPcHRpb24oe1xuXHRcdGxhYmVsOiAnTGFzdCAzMCBEYXlzJyxcblx0XHRzbHVnOiAnMzAnLFxuXHRcdGdldFRvOiAoKSA9PiBtb21lbnRGbG9vckFkZCgxLCAnZGF5JykudG9EYXRlKCksXG5cdFx0Z2V0RnJvbTogKCkgPT4gbW9tZW50Rmxvb3JTdWJ0cmFjdCgzMCwgJ2RheXMnKS50b0RhdGUoKVxuXHR9KSxcblx0JzkwJzogbmV3IERhdGVPcHRpb24oe1xuXHRcdGxhYmVsOiAnTGFzdCA5MCBEYXlzJyxcblx0XHRzbHVnOiAnOTAnLFxuXHRcdGdldFRvOiAoKSA9PiBtb21lbnRGbG9vckFkZCgxLCAnZGF5JykudG9EYXRlKCksXG5cdFx0Z2V0RnJvbTogKCkgPT4gbW9tZW50Rmxvb3JTdWJ0cmFjdCg5MCwgJ2RheXMnKS50b0RhdGUoKVxuXHR9KSxcblx0Y3VzdG9tOiBuZXcgRGF0ZU9wdGlvbih7XG5cdFx0aXNTZWxlY3RlZDogdHJ1ZSxcblx0XHRsYWJlbDogJ0RhdGUgUmFuZ2UuLi4nLFxuXHRcdHNsdWc6ICdjdXN0b20nLFxuXHRcdGdldFRvOiAodG9TdHJpbmc/OiBzdHJpbmcpID0+IG1vbWVudCh0b1N0cmluZykudG9EYXRlKCksXG5cdFx0Z2V0RnJvbTogKGZyb21TdHJpbmc/OiBzdHJpbmcpID0+IG1vbWVudChmcm9tU3RyaW5nKS50b0RhdGUoKVxuXHR9KVxufTtcblxuY29uc3QgYW5pbWF0aW9uT3B0aW9uc0luT3V0ID0gZ2VuZXJhdGVTbGlkZUluT3V0KCdvcHRpb25zSW5PdXQnKSxcblx0YW5pbWF0aW9uUmFuZ2VJbk91dCA9IGdlbmVyYXRlU2xpZGVJbk91dCgncmFuZ2VJbk91dCcpO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdwb3JjZWxhaW4tZGF0ZS1yZWZpbmVyJyxcblx0dGVtcGxhdGVVcmw6ICcuL2RhdGUtcmVmaW5lci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2RhdGUtcmVmaW5lci5jb21wb25lbnQuc2NzcyddLFxuXHQvLyBhbmltYXRpb25zOiBbXG5cdC8vIFx0YmxvY2tJbml0aWFsQW5pbWF0aW9uLFxuXHQvLyBcdGFuaW1hdGlvbk9wdGlvbnNJbk91dCxcblx0Ly8gXHRhbmltYXRpb25SYW5nZUluT3V0XG5cdC8vIF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVJlZmluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIElEYXRlUmVmaW5lclByb3BzIHtcblx0Ly8gSW5wdXRzXG5cdEBJbnB1dCgpIGlzT3BlbjogYm9vbGVhbiA9IHRydWU7XG5cdEBJbnB1dCgpIHJlZmluZXI6IERhdGVSZWZpbmVyO1xuXG5cdC8vIE91dHB1dHNcblx0QE91dHB1dCgpIG9uUmVmaW5lckNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0Ly8gSWNvbnNcblx0ZmFDaGV2cm9uRG93biA9IGZhQ2FyZXREb3duO1xuXG5cdC8vIENvbnN0YW50c1xuXHRvcHRpb25zOiBEYXRlT3B0aW9ucyA9IGRlZmF1bHREYXRlT3B0aW9ucztcblxuXHQvLyBBbmd1bGFyXG5cdG9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcblxuXHQvLyBTdGF0ZVxuXHRjdXJyZW50T3B0aW9uU2x1Zzogc3RyaW5nO1xuXHRzdGFydFN0cmluZzogc3RyaW5nO1xuXHRlbmRTdHJpbmc6IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcigpIHt9XG5cblx0Ly8gRXZlbnRzXG5cdG9uQ2hhbmdlKCkge1xuXHRcdHRoaXMub25SZWZpbmVyQ2hhbmdlLmVtaXQoW3RoaXMucmVmaW5lci5zbHVnLCB0aGlzLmdldFZhbHVlKCldKTtcblx0fVxuXG5cdC8vIFN0YXRlc1xuXHRvcHRpb25IYXNCYWRnZShkYXRlT3B0aW9uT3JEYXRlOiBEYXRlT3B0aW9uIHwgRGF0ZSk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAoXG5cdFx0XHRkYXRlT3B0aW9uT3JEYXRlIGluc3RhbmNlb2YgRGF0ZU9wdGlvbiAmJlxuXHRcdFx0dHlwZW9mIGRhdGVPcHRpb25PckRhdGUuYmFkZ2UgIT09ICd1bmRlZmluZWQnXG5cdFx0KTtcblx0fVxuXG5cdC8vIEdldHRlcnNcblx0Z2V0VmFsdWUoKTogRGF0ZVJlZmluZXJWYWx1ZSB7XG5cdFx0Y29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLm9wdGlvbnNbdGhpcy5jdXJyZW50T3B0aW9uU2x1Z107XG5cdFx0cmV0dXJuIHtcblx0XHRcdGZyb206XG5cdFx0XHRcdHNlbGVjdGVkT3B0aW9uIGluc3RhbmNlb2YgRGF0ZU9wdGlvblxuXHRcdFx0XHRcdD8gc2VsZWN0ZWRPcHRpb24uZ2V0RnJvbSh0aGlzLnN0YXJ0U3RyaW5nKVxuXHRcdFx0XHRcdDogc2VsZWN0ZWRPcHRpb24sXG5cdFx0XHR0bzpcblx0XHRcdFx0c2VsZWN0ZWRPcHRpb24gaW5zdGFuY2VvZiBEYXRlT3B0aW9uXG5cdFx0XHRcdFx0PyBzZWxlY3RlZE9wdGlvbi5nZXRUbyh0aGlzLmVuZFN0cmluZylcblx0XHRcdFx0XHQ6IHNlbGVjdGVkT3B0aW9uXG5cdFx0fTtcblx0fVxuXG5cdGdldE9wdGlvbkxhYmVsKG9wdGlvbjogRGF0ZU9wdGlvbik6IHN0cmluZyB7XG5cdFx0aWYoIG9wdGlvbiBpbnN0YW5jZW9mIERhdGVPcHRpb24gKSB7XG5cdFx0XHRpZiggb3B0aW9uLmxhYmVsICkge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9uLmxhYmVsXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9uQmFkZ2Uob3B0aW9uOiBEYXRlT3B0aW9uIHwgRGF0ZSk6IHN0cmluZyB7XG5cdFx0aWYgKG9wdGlvbiBpbnN0YW5jZW9mIERhdGVPcHRpb24pIHtcblx0XHRcdGlmIChvcHRpb24uYmFkZ2UpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBvcHRpb24uYmFkZ2UgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wdGlvbi5iYWRnZS50b0xvY2FsZVN0cmluZygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBvcHRpb24uYmFkZ2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0fVxuXG5cdC8vIE11dGF0b3JzXG5cdHRvZ2dsZU9wZW4oKSB7XG5cdFx0dGhpcy5pc09wZW4gPSAhdGhpcy5pc09wZW47XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblxuXHRcdHRoaXMub3B0aW9ucyA9IHRoaXMucmVmaW5lci5vcHRpb25zXG5cdFx0XHQ/IHRoaXMucmVmaW5lci5vcHRpb25zXG5cdFx0XHQ6IGRlZmF1bHREYXRlT3B0aW9ucztcblxuXHRcdGZvciAobGV0IG9wdGlvblNsdWcgaW4gdGhpcy5vcHRpb25zKSB7XG5cdFx0XHRsZXQgb3B0aW9uID0gdGhpcy5vcHRpb25zW29wdGlvblNsdWddO1xuXHRcdFx0aWYgKG9wdGlvbiBpbnN0YW5jZW9mIERhdGVPcHRpb24pIHtcblx0XHRcdFx0aWYgKG9wdGlvbi5pc1NlbGVjdGVkID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50T3B0aW9uU2x1ZyA9IG9wdGlvblNsdWc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLm9uQ2hhbmdlKCk7XG5cdH1cbn1cbiJdfQ==