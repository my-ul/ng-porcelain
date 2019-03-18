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
const momentFloor = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
(arg1, arg2) => moment()
    .set('hours', 0)
    .set('minutes', 0)
    .set('seconds', 0));
const ɵ0 = momentFloor;
/** @type {?} */
const momentFloorSubtract = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
(arg1, arg2) => momentFloor().subtract(arg1, arg2));
const ɵ1 = momentFloorSubtract;
/** @type {?} */
const momentFloorAdd = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
(arg1, arg2) => momentFloor().add(arg1, arg2));
const ɵ2 = momentFloorAdd;
/** @type {?} */
export const defaultDateOptions = {
    // yields no range by default (unrestricted)
    '-1': new DateOption({
        slug: '-1',
        getTo: (/**
         * @return {?}
         */
        () => null),
        getFrom: (/**
         * @return {?}
         */
        () => null),
        label: 'View All'
    }),
    // select item where getFrom() <= date < getTo()
    '1': new DateOption({
        label: 'Today',
        slug: '1',
        getTo: (/**
         * @return {?}
         */
        () => momentFloorAdd(1, 'day').toDate()),
        getFrom: (/**
         * @return {?}
         */
        () => momentFloor().toDate())
    }),
    '7': new DateOption({
        label: 'Last 7 Days',
        slug: '7',
        getTo: (/**
         * @return {?}
         */
        () => momentFloorAdd(1, 'day').toDate()),
        getFrom: (/**
         * @return {?}
         */
        () => momentFloorSubtract(7, 'days').toDate())
    }),
    '30': new DateOption({
        label: 'Last 30 Days',
        slug: '30',
        getTo: (/**
         * @return {?}
         */
        () => momentFloorAdd(1, 'day').toDate()),
        getFrom: (/**
         * @return {?}
         */
        () => momentFloorSubtract(30, 'days').toDate())
    }),
    '90': new DateOption({
        label: 'Last 90 Days',
        slug: '90',
        getTo: (/**
         * @return {?}
         */
        () => momentFloorAdd(1, 'day').toDate()),
        getFrom: (/**
         * @return {?}
         */
        () => momentFloorSubtract(90, 'days').toDate())
    }),
    custom: new DateOption({
        isSelected: true,
        label: 'Date Range...',
        slug: 'custom',
        getTo: (/**
         * @param {?=} toString
         * @return {?}
         */
        (toString) => moment(toString).toDate()),
        getFrom: (/**
         * @param {?=} fromString
         * @return {?}
         */
        (fromString) => moment(fromString).toDate())
    })
};
/** @type {?} */
const animationOptionsInOut = generateSlideInOut('optionsInOut');
/** @type {?} */
const animationRangeInOut = generateSlideInOut('rangeInOut');
export class DateRefinerComponent {
    constructor() {
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
    /**
     * @return {?}
     */
    onChange() {
        this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);
    }
    // States
    /**
     * @param {?} dateOptionOrDate
     * @return {?}
     */
    optionHasBadge(dateOptionOrDate) {
        return (dateOptionOrDate instanceof DateOption &&
            typeof dateOptionOrDate.badge !== 'undefined');
    }
    // Getters
    /**
     * @return {?}
     */
    getValue() {
        /** @type {?} */
        const selectedOption = this.options[this.currentOptionSlug];
        return {
            from: selectedOption instanceof DateOption
                ? selectedOption.getFrom(this.startString)
                : selectedOption,
            to: selectedOption instanceof DateOption
                ? selectedOption.getTo(this.endString)
                : selectedOption
        };
    }
    /**
     * @param {?} option
     * @return {?}
     */
    getOptionLabel(option) {
        if (option instanceof DateOption) {
            if (option.label) {
                return option.label;
            }
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    getOptionBadge(option) {
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
    }
    // Mutators
    /**
     * @return {?}
     */
    toggleOpen() {
        this.isOpen = !this.isOpen;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.refiner.options
            ? this.refiner.options
            : defaultDateOptions;
        for (let optionSlug in this.options) {
            /** @type {?} */
            let option = this.options[optionSlug];
            if (option instanceof DateOption) {
                if (option.isSelected === true) {
                    this.currentOptionSlug = optionSlug;
                }
            }
        }
        this.onChange();
    }
}
DateRefinerComponent.decorators = [
    { type: Component, args: [{
                selector: 'porcelain-date-refiner',
                template: "<div\n\tclass=\"refiner refiner--date\"\n\t[class.refiner--open]=\"isOpen\"\n\t[class.refiner--closed]=\"!isOpen\"\n>\n\t<div class=\"refiner__section refiner__header\" (click)=\"toggleOpen()\">\n\t\t<div class=\"media media--clickable\">\n\t\t\t<div class=\"media__body  media--align-center\">\n\t\t\t\t<h3 class=\"refiner__title\">{{ refiner.title }}</h3>\n\t\t\t</div>\n\t\t\t<div class=\"refiner__toggle | media__right media--align-center\">\n\t\t\t\t<fa-icon [icon]=\"faChevronDown\"></fa-icon>\n\t\t\t\t<span class=\"sr-only\">Expand {{ refiner.title }} refiner</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- /.refiner__header -->\n\n\t<!-- [@blockInitialAnimation] -->\n\t<div  class=\"refiner__section refiner__toggleable\">\n\t\t<!-- [@optionsInOut] -->\n\t\t<div *ngIf=\"isOpen\"  class=\"refiner__section  refiner__body\">\n\t\t\t<div class=\"refiner__section refiner__options\">\n\t\t\t\t<ul class=\"options\">\n\t\t\t\t\t<li\n\t\t\t\t\t\t*ngFor=\"let optionSlug of objectKeys(options)\"\n\t\t\t\t\t\tclass=\"option\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<label class=\"media media--align-items-center\">\n\t\t\t\t\t\t\t<div class=\"media__left\">\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"currentOptionSlug\"\n\t\t\t\t\t\t\t\t\tvalue=\"{{ optionSlug }}\"\n\t\t\t\t\t\t\t\t\t(change)=\"onChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"media__body\">\n\t\t\t\t\t\t\t\t<app-truncate\n\t\t\t\t\t\t\t\t\t[value]=\"getOptionLabel(options[optionSlug])\"\n\t\t\t\t\t\t\t\t></app-truncate>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\tclass=\"media__right media--align-center\"\n\t\t\t\t\t\t\t\t*ngIf=\"optionHasBadge(options[optionSlug])\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t{{ getOptionBadge(options[optionSlug]) }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__options -->\n\n\t\t\t<div class=\"refiner__section refiner__custom-range\">\n\t\t\t\t<!-- @blockInitialAnimation -->\n\t\t\t\t<ng-container>\n\t\t\t\t\t<!-- [@rangeInOut] -->\n\t\t\t\t\t<div *ngIf=\"currentOptionSlug === 'custom'\">\n\t\t\t\t\t\t<div class=\"range\">\n\t\t\t\t\t\t\t<label class=\"from\"\n\t\t\t\t\t\t\t\t>From\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\tclass=\"datepicker\"\n\t\t\t\t\t\t\t\t\ttype=\"date\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"startString\"\n\t\t\t\t\t\t\t\t\tplaceholder=\"Start Date\"\n\t\t\t\t\t\t\t\t\t(change)=\"onChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t<label class=\"to\">\n\t\t\t\t\t\t\t\tTo\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\tclass=\"datepicker\"\n\t\t\t\t\t\t\t\t\ttype=\"date\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"endString\"\n\t\t\t\t\t\t\t\t\tplaceholder=\"End Date\"\n\t\t\t\t\t\t\t\t\t(change)=\"onChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</ng-container>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__custom-range -->\n\t\t</div>\n\t\t<!-- /.refiner__body -->\n\t</div>\n</div>\n",
                styles: ["a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}.media{display:flex;min-width:0;max-width:100%}.media__left,.media__right{flex:0}.media__left{margin-right:.75em}.media__body{flex:1}.media__right{margin-left:.75em}.media--align-items-center{align-items:center}.media--clickable{cursor:pointer}.media--align-center{-ms-grid-row-align:center;align-self:center}.toggleable.toggleable--closed>.toggleable__subject+.toggleable__subject{margin-top:0}.toggleable.toggleable--open>.toggleable__subject+.toggleable__subject{margin-top:1.5}.refiner{padding:1em}.refiner .refiner__head{cursor:pointer;background-color:red}.refiner .refiner__title{font-size:1em;font-weight:600}.refiner .refiner__section+.refiner__section:not(.refiner__toggleable){margin-top:1em}.refiner>.refiner__section+.refiner__section{transition:margin-top .2s linear;overflow:hidden}.refiner.refiner--closed>.refiner__section+.refiner__section.refiner__toggleable{margin-top:0}.refiner.refiner--open>.refiner__section+.refiner__section.refiner__toggleable{margin-top:1em}.refiner__select-all,.refiner__select-none{cursor:pointer;margin:0;padding:0;color:#23527c;text-decoration:underline;font-size:.85rem;border:none;background:0 0}.refiner__select-all:hover,.refiner__select-none:hover{color:#2e6ca4}.refiner__expand-toggle{margin:0;padding:.4em .8em;border:none;color:#333;font-size:.75em;background:#e0e0e0;border-radius:.2em;cursor:pointer}.refiner__expand-toggle[disabled]{color:#999;cursor:not-allowed}.refiner .refiner__toggle{transition:transform .2s ease-in-out;transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out}.refiner.refiner--closed .refiner__toggle{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.refiner .options{list-style:none;margin:0;padding:0}.refiner__expand-toggle+.refiner__expand-toggle,.refiner__expand-toggle+.refiner__select-all,.refiner__expand-toggle+.refiner__select-none,.refiner__select-all+.refiner__expand-toggle,.refiner__select-all+.refiner__select-all,.refiner__select-all+.refiner__select-none,.refiner__select-none+.refiner__expand-toggle,.refiner__select-none+.refiner__select-all,.refiner__select-none+.refiner__select-none{margin-left:.3em}.range .from,.range .to{display:block}.range .from input,.range .to input{margin-top:.3em;width:50%}.range .from+.to{margin-top:.6em}.datepicker{border-radius:.3em;border:1px solid silver;padding:.3em .6em;display:block}"]
            }] }
];
DateRefinerComponent.ctorParameters = () => [];
DateRefinerComponent.propDecorators = {
    isOpen: [{ type: Input }],
    refiner: [{ type: Input }],
    onRefinerChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yZWZpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BvcmNlbGFpbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXJlZmluZXIvZGF0ZS1yZWZpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFHaEUsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUc1QixPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7OztBQVE3RSxzQ0FHQzs7O0lBRkEsZ0NBQVc7O0lBQ1gsOEJBQVM7Ozs7O0FBR1YsdUNBSUM7OztJQUhBLG1DQUFpQjs7SUFDakIsb0NBQXNCOztJQUN0Qiw0Q0FBbUM7OztNQUc5QixXQUFXOzs7OztBQUFHLENBQ25CLElBQStCLEVBQy9CLElBQStCLEVBQzlCLEVBQUUsQ0FDSCxNQUFNLEVBQUU7S0FDTixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUNmLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0tBQ2pCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7OztNQUVkLG1CQUFtQjs7Ozs7QUFBRyxDQUMzQixJQUErQixFQUMvQixJQUErQixFQUM5QixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTs7O01BRWpDLGNBQWM7Ozs7O0FBQUcsQ0FDdEIsSUFBK0IsRUFDL0IsSUFBK0IsRUFDOUIsRUFBRSxDQUFDLFdB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bEMsdytGQUE0Qzs7YUFPNUM7Ozs7cUJBR0MsS0FBSztzQkFDTCxLQUFLOzhCQUdMLE1BQU07Ozs7SUFKUCxzQ0FBZ0M7O0lBQ2hDLHVDQUE4Qjs7SUFHOUIsK0NBQWtFOztJQUdsRSw2Q0FBNEI7O0lBRzVCLHVDQUEwQzs7SUFHMUMsMENBQXlCOztJQUd6QixpREFBMEI7O0lBQzFCLDJDQUFvQjs7SUFDcEIseUNBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBGb250IEF3ZXNvbWUgNVxuaW1wb3J0IHsgZmFDYXJldERvd24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuLy8gUG9yY2VsYWluXG5pbXBvcnQgeyBJRGF0ZVJlZmluZXIsIERhdGVSZWZpbmVyIH0gZnJvbSAnLi4vcmVmaW5lcnMvSVJlZmluZXInO1xuaW1wb3J0IHsgRGF0ZU9wdGlvbnMgfSBmcm9tICcuLi9yZWZpbmVycy9JT3B0aW9ucyc7XG5pbXBvcnQgeyBEYXRlT3B0aW9uIH0gZnJvbSAnLi4vcmVmaW5lcnMvSU9wdGlvbic7XG5pbXBvcnQgeyBibG9ja0luaXRpYWxBbmltYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvYW5pbWF0aW9ucy9ibG9ja0luaXRpYWxBbmltYXRpb24udHJpZ2dlcic7XG5pbXBvcnQgeyBnZW5lcmF0ZVNsaWRlSW5PdXQgfSBmcm9tICcuLi9zaGFyZWQvYW5pbWF0aW9ucy9zbGlkZUluT3V0LnRyaWdnZXInO1xuXG4vLyBpbXBvcnQgeyBEYXRlT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL2xpYi9yZWZpbmVycy9JT3B0aW9uJztcbi8vIGltcG9ydCB7IERhdGVPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL2xpYi9yZWZpbmVycy9JT3B0aW9ucyc7XG4vLyBpbXBvcnQgeyBEYXRlUmVmaW5lciwgSURhdGVSZWZpbmVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL2xpYi9yZWZpbmVycy9JUmVmaW5lcic7XG4vLyBpbXBvcnQgeyBibG9ja0luaXRpYWxBbmltYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvYW5pbWF0aW9ucy9ibG9ja0luaXRpYWxBbmltYXRpb24udHJpZ2dlcic7XG4vLyBpbXBvcnQgeyBnZW5lcmF0ZVNsaWRlSW5PdXQgfSBmcm9tICcuLi9zaGFyZWQvYW5pbWF0aW9ucy9zbGlkZUluT3V0LnRyaWdnZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVSZWZpbmVyVmFsdWUge1xuXHRmcm9tOiBEYXRlO1xuXHR0bzogRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVJlZmluZXJQcm9wcyB7XG5cdGlzT3Blbj86IGJvb2xlYW47XG5cdHJlZmluZXI6IElEYXRlUmVmaW5lcjtcblx0b25SZWZpbmVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55Pjtcbn1cblxuY29uc3QgbW9tZW50Rmxvb3IgPSAoXG5cdGFyZzE/OiBtb21lbnQuRHVyYXRpb25JbnB1dEFyZzEsXG5cdGFyZzI/OiBtb21lbnQuRHVyYXRpb25JbnB1dEFyZzJcbikgPT5cblx0bW9tZW50KClcblx0XHQuc2V0KCdob3VycycsIDApXG5cdFx0LnNldCgnbWludXRlcycsIDApXG5cdFx0LnNldCgnc2Vjb25kcycsIDApO1xuXG5jb25zdCBtb21lbnRGbG9vclN1YnRyYWN0ID0gKFxuXHRhcmcxPzogbW9tZW50LkR1cmF0aW9uSW5wdXRBcmcxLFxuXHRhcmcyPzogbW9tZW50LkR1cmF0aW9uSW5wdXRBcmcyXG4pID0+IG1vbWVudEZsb29yKCkuc3VidHJhY3QoYXJnMSwgYXJnMik7XG5cbmNvbnN0IG1vbWVudEZsb29yQWRkID0gKFxuXHRhcmcxPzogbW9tZW50LkR1cmF0aW9uSW5wdXRBcmcxLFxuXHRhcmcyPzogbW9tZW50LkR1cmF0aW9uSW5wdXRBcmcyXG4pID0+IG1vbWVudEZsb29yKCkuYWRkKGFyZzEsIGFyZzIpO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdERhdGVPcHRpb25zOiBEYXRlT3B0aW9ucyA9IHtcblx0Ly8geWllbGRzIG5vIHJhbmdlIGJ5IGRlZmF1bHQgKHVucmVzdHJpY3RlZClcblx0Jy0xJzogbmV3IERhdGVPcHRpb24oe1xuXHRcdHNsdWc6ICctMScsXG5cdFx0Z2V0VG86ICgpID0+IG51bGwsXG5cdFx0Z2V0RnJvbTogKCkgPT4gbnVsbCxcblx0XHRsYWJlbDogJ1ZpZXcgQWxsJ1xuXHR9KSxcblxuXHQvLyBzZWxlY3QgaXRlbSB3aGVyZSBnZXRGcm9tKCkgPD0gZGF0ZSA8IGdldFRvKClcblx0JzEnOiBuZXcgRGF0ZU9wdGlvbih7XG5cdFx0bGFiZWw6ICdUb2RheScsXG5cdFx0c2x1ZzogJzEnLFxuXHRcdGdldFRvOiAoKSA9PiBtb21lbnRGbG9vckFkZCgxLCAnZGF5JykudG9EYXRlKCksXG5cdFx0Z2V0RnJvbTogKCkgPT4gbW9tZW50Rmxvb3IoKS50b0RhdGUoKVxuXHR9KSxcblx0JzcnOiBuZXcgRGF0ZU9wdGlvbih7XG5cdFx0bGFiZWw6ICdMYXN0IDcgRGF5cycsXG5cdFx0c2x1ZzogJzcnLFxuXHRcdGdldFRvOiAoKSA9PiBtb21lbnRGbG9vckFkZCgxLCAnZGF5JykudG9EYXRlKCksXG5cdFx0Z2V0RnJvbTogKCkgPT4gbW9tZW50Rmxvb3JTdWJ0cmFjdCg3LCAnZGF5cycpLnRvRGF0ZSgpXG5cdH0pLFxuXHQnMzAnOiBuZXcgRGF0ZU9wdGlvbih7XG5cdFx0bGFiZWw6ICdMYXN0IDMwIERheXMnLFxuXHRcdHNsdWc6ICczMCcsXG5cdFx0Z2V0VG86ICgpID0+IG1vbWVudEZsb29yQWRkKDEsICdkYXknKS50b0RhdGUoKSxcblx0XHRnZXRGcm9tOiAoKSA9PiBtb21lbnRGbG9vclN1YnRyYWN0KDMwLCAnZGF5cycpLnRvRGF0ZSgpXG5cdH0pLFxuXHQnOTAnOiBuZXcgRGF0ZU9wdGlvbih7XG5cdFx0bGFiZWw6ICdMYXN0IDkwIERheXMnLFxuXHRcdHNsdWc6ICc5MCcsXG5cdFx0Z2V0VG86ICgpID0+IG1vbWVudEZsb29yQWRkKDEsICdkYXknKS50b0RhdGUoKSxcblx0XHRnZXRGcm9tOiAoKSA9PiBtb21lbnRGbG9vclN1YnRyYWN0KDkwLCAnZGF5cycpLnRvRGF0ZSgpXG5cdH0pLFxuXHRjdXN0b206IG5ldyBEYXRlT3B0aW9uKHtcblx0XHRpc1NlbGVjdGVkOiB0cnVlLFxuXHRcdGxhYmVsOiAnRGF0ZSBSYW5nZS4uLicsXG5cdFx0c2x1ZzogJ2N1c3RvbScsXG5cdFx0Z2V0VG86ICh0b1N0cmluZz86IHN0cmluZykgPT4gbW9tZW50KHRvU3RyaW5nKS50b0RhdGUoKSxcblx0XHRnZXRGcm9tOiAoZnJvbVN0cmluZz86IHN0cmluZykgPT4gbW9tZW50KGZyb21TdHJpbmcpLnRvRGF0ZSgpXG5cdH0pXG59O1xuXG5jb25zdCBhbmltYXRpb25PcHRpb25zSW5PdXQgPSBnZW5lcmF0ZVNsaWRlSW5PdXQoJ29wdGlvbnNJbk91dCcpLFxuXHRhbmltYXRpb25SYW5nZUluT3V0ID0gZ2VuZXJhdGVTbGlkZUluT3V0KCdyYW5nZUluT3V0Jyk7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3BvcmNlbGFpbi1kYXRlLXJlZmluZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vZGF0ZS1yZWZpbmVyLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vZGF0ZS1yZWZpbmVyLmNvbXBvbmVudC5zY3NzJ10sXG5cdC8vIGFuaW1hdGlvbnM6IFtcblx0Ly8gXHRibG9ja0luaXRpYWxBbmltYXRpb24sXG5cdC8vIFx0YW5pbWF0aW9uT3B0aW9uc0luT3V0LFxuXHQvLyBcdGFuaW1hdGlvblJhbmdlSW5PdXRcblx0Ly8gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlUmVmaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgSURhdGVSZWZpbmVyUHJvcHMge1xuXHQvLyBJbnB1dHNcblx0QElucHV0KCkgaXNPcGVuOiBib29sZWFuID0gdHJ1ZTtcblx0QElucHV0KCkgcmVmaW5lcjogRGF0ZVJlZmluZXI7XG5cblx0Ly8gT3V0cHV0c1xuXHRAT3V0cHV0KCkgb25SZWZpbmVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvLyBJY29uc1xuXHRmYUNoZXZyb25Eb3duID0gZmFDYXJldERvd247XG5cblx0Ly8gQ29uc3RhbnRzXG5cdG9wdGlvbnM6IERhdGVPcHRpb25zID0gZGVmYXVsdERhdGVPcHRpb25zO1xuXG5cdC8vIEFuZ3VsYXJcblx0b2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuXG5cdC8vIFN0YXRlXG5cdGN1cnJlbnRPcHRpb25TbHVnOiBzdHJpbmc7XG5cdHN0YXJ0U3RyaW5nOiBzdHJpbmc7XG5cdGVuZFN0cmluZzogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKCkge31cblxuXHQvLyBFdmVudHNcblx0b25DaGFuZ2UoKSB7XG5cdFx0dGhpcy5vblJlZmluZXJDaGFuZ2UuZW1pdChbdGhpcy5yZWZpbmVyLnNsdWcsIHRoaXMuZ2V0VmFsdWUoKV0pO1xuXHR9XG5cblx0Ly8gU3RhdGVzXG5cdG9wdGlvbkhhc0JhZGdlKGRhdGVPcHRpb25PckRhdGU6IERhdGVPcHRpb24gfCBEYXRlKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGRhdGVPcHRpb25PckRhdGUgaW5zdGFuY2VvZiBEYXRlT3B0aW9uICYmXG5cdFx0XHR0eXBlb2YgZGF0ZU9wdGlvbk9yRGF0ZS5iYWRnZSAhPT0gJ3VuZGVmaW5lZCdcblx0XHQpO1xuXHR9XG5cblx0Ly8gR2V0dGVyc1xuXHRnZXRWYWx1ZSgpOiBEYXRlUmVmaW5lclZhbHVlIHtcblx0XHRjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHRoaXMub3B0aW9uc1t0aGlzLmN1cnJlbnRPcHRpb25TbHVnXTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZnJvbTpcblx0XHRcdFx0c2VsZWN0ZWRPcHRpb24gaW5zdGFuY2VvZiBEYXRlT3B0aW9uXG5cdFx0XHRcdFx0PyBzZWxlY3RlZE9wdGlvbi5nZXRGcm9tKHRoaXMuc3RhcnRTdHJpbmcpXG5cdFx0XHRcdFx0OiBzZWxlY3RlZE9wdGlvbixcblx0XHRcdHRvOlxuXHRcdFx0XHRzZWxlY3RlZE9wdGlvbiBpbnN0YW5jZW9mIERhdGVPcHRpb25cblx0XHRcdFx0XHQ/IHNlbGVjdGVkT3B0aW9uLmdldFRvKHRoaXMuZW5kU3RyaW5nKVxuXHRcdFx0XHRcdDogc2VsZWN0ZWRPcHRpb25cblx0XHR9O1xuXHR9XG5cblx0Z2V0T3B0aW9uTGFiZWwob3B0aW9uOiBEYXRlT3B0aW9uKTogc3RyaW5nIHtcblx0XHRpZiggb3B0aW9uIGluc3RhbmNlb2YgRGF0ZU9wdGlvbiApIHtcblx0XHRcdGlmKCBvcHRpb24ubGFiZWwgKSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb24ubGFiZWxcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRPcHRpb25CYWRnZShvcHRpb246IERhdGVPcHRpb24gfCBEYXRlKTogc3RyaW5nIHtcblx0XHRpZiAob3B0aW9uIGluc3RhbmNlb2YgRGF0ZU9wdGlvbikge1xuXHRcdFx0aWYgKG9wdGlvbi5iYWRnZSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIG9wdGlvbi5iYWRnZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uLmJhZGdlLnRvTG9jYWxlU3RyaW5nKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wdGlvbi5iYWRnZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHR9XG5cblx0Ly8gTXV0YXRvcnNcblx0dG9nZ2xlT3BlbigpIHtcblx0XHR0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3Blbjtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXG5cdFx0dGhpcy5vcHRpb25zID0gdGhpcy5yZWZpbmVyLm9wdGlvbnNcblx0XHRcdD8gdGhpcy5yZWZpbmVyLm9wdGlvbnNcblx0XHRcdDogZGVmYXVsdERhdGVPcHRpb25zO1xuXG5cdFx0Zm9yIChsZXQgb3B0aW9uU2x1ZyBpbiB0aGlzLm9wdGlvbnMpIHtcblx0XHRcdGxldCBvcHRpb24gPSB0aGlzLm9wdGlvbnNbb3B0aW9uU2x1Z107XG5cdFx0XHRpZiAob3B0aW9uIGluc3RhbmNlb2YgRGF0ZU9wdGlvbikge1xuXHRcdFx0XHRpZiAob3B0aW9uLmlzU2VsZWN0ZWQgPT09IHRydWUpIHtcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRPcHRpb25TbHVnID0gb3B0aW9uU2x1Zztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMub25DaGFuZ2UoKTtcblx0fVxufVxuIl19