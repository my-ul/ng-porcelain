import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { trigger, state, style, transition, group, animate, animation } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SimpleOption {
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
class DateOption extends SimpleOption {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class RefinerBase {
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
class SimpleRefiner extends RefinerBase {
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
class DateRefiner extends RefinerBase {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SimpleRefinerComponent {
    constructor() {
        // Outputs
        this.onRefinerChange = new EventEmitter();
        // Icons
        this.faChevronDown = faCaretDown;
        this.contractIcon = faChevronUp;
        this.expandIcon = faChevronDown;
    }
    // Getters
    /**
     * @return {?}
     */
    get showCount() {
        return this._showCount || this.refiner.showCount || 5;
    }
    /**
     * @param {?} newCount
     * @return {?}
     */
    set showCount(newCount) {
        this._showCount = newCount;
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this._isOpen;
    }
    /**
     * @param {?} newIsOpenValue
     * @return {?}
     */
    set isOpen(newIsOpenValue) {
        this._isOpen = newIsOpenValue;
    }
    /**
     * @return {?}
     */
    get isExpanded() {
        return this._isExpanded;
    }
    /**
     * @param {?} newIsExpandedValue
     * @return {?}
     */
    set isExpanded(newIsExpandedValue) {
        this._isExpanded = newIsExpandedValue;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Pick the `isOpen` value;
        /** @type {?} */
        let isOpen = true;
        if (this.refiner && typeof this.refiner.isOpen === 'boolean') {
            isOpen = this.refiner.isOpen;
        }
        if (typeof this._isOpen === 'boolean') {
            isOpen = this._isOpen;
        }
        this.isOpen = !!isOpen;
        // Pick the `showCount` value
        /** @type {?} */
        let showCount = 5;
        if (this.refiner && typeof this.refiner.showCount === 'number') {
            showCount = this.refiner.showCount;
        }
        if (typeof this._showCount === 'number') {
            showCount = this._showCount;
        }
        this.showCount = showCount;
        // Pick the `isExpanded` value
        /** @type {?} */
        let isExpanded = false;
        if (this.refiner && typeof this.refiner.isExpanded === 'boolean') {
            isExpanded = this.refiner.isExpanded;
        }
        if (typeof this._isExpanded === 'boolean') {
            isExpanded = this._isExpanded;
        }
        this._isExpanded = !!isExpanded;
        // Sets up the dictionary used for value state
        this.selectNone();
        // Options can be selected on load through Option.isSelected boolean
        if (this.refiner.options) {
            for (let optionSlug in this.refiner.options) {
                /** @type {?} */
                let option = this.refiner.options[optionSlug];
                if (option instanceof SimpleOption ||
                    option.hasOwnProperty('isSelected')) {
                    if (option.slug !== optionSlug) {
                        console.error(option);
                    }
                    // !! ensures a boolean value
                    this.value[optionSlug] = !!option.isSelected;
                }
            }
        }
        // Options should be selected on load through the refiner.selected array of selected optionSlugs
        if (this.refiner.selected) {
            for (let optionSlug of this.refiner.selected) {
                this.value[optionSlug] = true;
            }
        }
    }
    /**
     * @return {?}
     */
    toggleExpanded() {
        this._isExpanded = !this._isExpanded;
    }
    /**
     * @return {?}
     */
    toggleOpen() {
        this._isOpen = !this._isOpen;
    }
    /**
     * @return {?}
     */
    countTail() {
        return Object.keys(this.refiner.options).length - this._showCount;
    }
    /**
     * @return {?}
     */
    canExpand() {
        return this.refiner.type === 'simple'
            ? Object.keys(this.refiner.options).length > this._showCount
            : false;
    }
    /**
     * @return {?}
     */
    getExpandedOptionKeys() {
        return this._isExpanded
            ? Object.keys(this.refiner.options)
            : Object.keys(this.refiner.options).slice(0, this._showCount);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    optionHasBadge(option) {
        if (typeof option === 'string') {
            return false;
        }
        else {
            return option.badge && option.badge !== '';
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    getOptionLabel(option) {
        if (typeof option === 'string') {
            return option;
        }
        else {
            return option.label;
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    getOptionBadge(option) {
        if (typeof option.badge === 'number')
            return option.badge.toLocaleString();
        else
            return option.badge;
    }
    /**
     * @return {?}
     */
    getValue() {
        return Object.keys(this.value).filter((/**
         * @param {?} key
         * @return {?}
         */
        key => this.value[key]));
    }
    /**
     * @return {?}
     */
    canSelectNone() {
        return Object.keys(this.value).every((/**
         * @param {?} paramName
         * @return {?}
         */
        paramName => this.value[paramName] === true));
    }
    /**
     * @return {?}
     */
    selectNone() {
        this.setAll(false);
    }
    /**
     * @return {?}
     */
    canSelectAll() {
        return !this.canSelectNone();
    }
    /**
     * @return {?}
     */
    selectAll() {
        return this.setAll(true);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setAll(value) {
        if (this.refiner.type === 'simple') {
            this.value = {};
            for (let optionKey in this.refiner.options) {
                this.value[optionKey] = value;
            }
        }
        else {
            this.value = value;
        }
        this.onSelectionChange();
    }
    /**
     * @return {?}
     */
    onSelectionChange() {
        this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);
    }
}
SimpleRefinerComponent.decorators = [
    { type: Component, args: [{
                selector: 'porcelain-simple-refiner',
                template: "<div\n\tclass=\"refiner refiner--simple\"\n\t[class.refiner--open]=\"isOpen\"\n\t[class.refiner--closed]=\"!isOpen\"\n>\n\t<div class=\"refiner__section refiner__header\" (click)=\"toggleOpen()\">\n\t\t<div class=\"media media--clickable\">\n\t\t\t<div class=\"media__body\">\n\t\t\t\t<h3 class=\"refiner__title\">{{ refiner.title }}</h3>\n\t\t\t</div>\n\t\t\t<div class=\"refiner__toggle | media__right media--align-center\">\n\t\t\t\t<fa-icon [icon]=\"faChevronDown\"></fa-icon>\n\t\t\t\t<span class=\"sr-only\">Expand {{ refiner.title }} refiner</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- ./refiner__section -->\n\n\t<!-- [@blockInitialAnimation -->\n\t<div class=\"refiner__section refiner__toggleable\">\n\t\t<!-- [@optionsInOut -->\n\t\t<div\n\t\t\t*ngIf=\"isOpen\"\n\t\t\tclass=\"refiner__section refiner__body\"\n\t\t>\n\t\t\t<div class=\"refiner__section refiner__selection-toggles\">\n\t\t\t\t<button\n\t\t\t\t\t(click)=\"selectNone()\"\n\t\t\t\t\t*ngIf=\"canSelectNone()\"\n\t\t\t\t\tclass=\"refiner__select-none\"\n\t\t\t\t>\n\t\t\t\t\tSelect None\n\t\t\t\t</button>\n\t\t\t\t<button\n\t\t\t\t\t(click)=\"selectAll()\"\n\t\t\t\t\t*ngIf=\"canSelectAll()\"\n\t\t\t\t\tclass=\"refiner__select-all\"\n\t\t\t\t>\n\t\t\t\t\tSelect All\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__selection-toggles -->\n\n\t\t\t<div class=\"refiner__section refiner__options\">\n\t\t\t\t<ul class=\"options\">\n\t\t\t\t\t<li\n\t\t\t\t\t\tclass=\"option\"\n\t\t\t\t\t\t*ngFor=\"let optionKey of getExpandedOptionKeys()\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<label class=\"media media--align-items-center\">\n\t\t\t\t\t\t\t<div class=\"media__left\">\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\ttype=\"checkbox\"\n\t\t\t\t\t\t\t\t\tname=\"refiner-{{ refiner.slug }}\"\n\t\t\t\t\t\t\t\t\tvalue=\"{{ optionKey }}\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"value[optionKey]\"\n\t\t\t\t\t\t\t\t\t(change)=\"onSelectionChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"media__body\">\n\t\t\t\t\t\t\t\t<app-truncate\n\t\t\t\t\t\t\t\t\t[value]=\"\n\t\t\t\t\t\t\t\t\t\tgetOptionLabel(\n\t\t\t\t\t\t\t\t\t\t\trefiner.options[optionKey]\n\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\"\n\t\t\t\t\t\t\t\t></app-truncate>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\tclass=\"media__right\"\n\t\t\t\t\t\t\t\t*ngIf=\"\n\t\t\t\t\t\t\t\t\toptionHasBadge(refiner.options[optionKey])\n\t\t\t\t\t\t\t\t\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<div class=\"badge\">\n\t\t\t\t\t\t\t\t\t{{\n\t\t\t\t\t\t\t\t\t\tgetOptionBadge(\n\t\t\t\t\t\t\t\t\t\t\trefiner.options[optionKey]\n\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<!-- ./refiner__options-->\n\n\t\t\t<div\n\t\t\t\tclass=\"refiner__section refiner__show-hide\"\n\t\t\t\t*ngIf=\"canExpand()\"\n\t\t\t>\n\t\t\t\t<button\n\t\t\t\t\t(click)=\"toggleExpanded()\"\n\t\t\t\t\tclass=\"refiner__expand-toggle\"\n\t\t\t\t>\n\t\t\t\t\t<span *ngIf=\"isExpanded\"\n\t\t\t\t\t\t>Hide {{ countTail() | number }} Options\n\t\t\t\t\t\t<fa-icon [icon]=\"contractIcon\"></fa-icon>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span *ngIf=\"!isExpanded\"\n\t\t\t\t\t\t>Show {{ countTail() | number }} More\n\t\t\t\t\t\t<fa-icon [icon]=\"expandIcon\"></fa-icon\n\t\t\t\t\t></span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__show-hide -->\n\t\t</div>\n\t\t<!-- /.refiner__body -->\n\t</div>\n\t<!-- /ng-container -->\n</div>\n",
                styles: ["a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}.media{display:flex;min-width:0;max-width:100%}.media__left,.media__right{flex:0}.media__left{margin-right:.75em}.media__body{flex:1}.media__right{margin-left:.75em}.media--align-items-center{align-items:center}.media--clickable{cursor:pointer}.media--align-center{-ms-grid-row-align:center;align-self:center}.toggleable.toggleable--closed>.toggleable__subject+.toggleable__subject{margin-top:0}.toggleable.toggleable--open>.toggleable__subject+.toggleable__subject{margin-top:1.5}.refiner{padding:1em}.refiner .refiner__head{cursor:pointer;background-color:red}.refiner .refiner__title{font-size:1em;font-weight:600}.refiner .refiner__section+.refiner__section:not(.refiner__toggleable){margin-top:1em}.refiner>.refiner__section+.refiner__section{transition:margin-top .2s linear;overflow:hidden}.refiner.refiner--closed>.refiner__section+.refiner__section.refiner__toggleable{margin-top:0}.refiner.refiner--open>.refiner__section+.refiner__section.refiner__toggleable{margin-top:1em}.refiner__select-all,.refiner__select-none{cursor:pointer;margin:0;padding:0;color:#23527c;text-decoration:underline;font-size:.85rem;border:none;background:0 0}.refiner__select-all:hover,.refiner__select-none:hover{color:#2e6ca4}.refiner__expand-toggle{margin:0;padding:.4em .8em;border:none;color:#333;font-size:.75em;background:#e0e0e0;border-radius:.2em;cursor:pointer}.refiner__expand-toggle[disabled]{color:#999;cursor:not-allowed}.refiner .refiner__toggle{transition:transform .2s ease-in-out;transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out}.refiner.refiner--closed .refiner__toggle{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.refiner .options{list-style:none;margin:0;padding:0}.refiner__expand-toggle+.refiner__expand-toggle,.refiner__expand-toggle+.refiner__select-all,.refiner__expand-toggle+.refiner__select-none,.refiner__select-all+.refiner__expand-toggle,.refiner__select-all+.refiner__select-all,.refiner__select-all+.refiner__select-none,.refiner__select-none+.refiner__expand-toggle,.refiner__select-none+.refiner__select-all,.refiner__select-none+.refiner__select-none{margin-left:.3em}"]
            }] }
];
SimpleRefinerComponent.ctorParameters = () => [];
SimpleRefinerComponent.propDecorators = {
    refiner: [{ type: Input }],
    _showCount: [{ type: Input, args: ['showCount',] }],
    _isOpen: [{ type: Input, args: ['isOpen',] }],
    _isExpanded: [{ type: Input, args: ['isExpanded',] }],
    onRefinerChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TruncateComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TruncateComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-truncate',
                template: "\n<div class=\"truncate\">\n\t<span class=\"truncate__value\" title=\"{{value}}\">\n\t\t{{value}}\n\t</span>\n</div>\n",
                styles: [".truncate{display:flex}.truncate .truncate__value{flex:1 1 1px;padding:.2em 0;width:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
            }] }
];
TruncateComponent.ctorParameters = () => [];
TruncateComponent.propDecorators = {
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRUNCATE_DIRECTIVES = [TruncateComponent];
class TruncateModule {
}
TruncateModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: TRUNCATE_DIRECTIVES,
                exports: TRUNCATE_DIRECTIVES,
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SIMPLE_REFINER_DIRECTIVES = [SimpleRefinerComponent];
/** @type {?} */
const SIMPLE_REFINER_IMPORTS = [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TruncateModule
];
class SimpleRefinerModule {
}
SimpleRefinerModule.decorators = [
    { type: NgModule, args: [{
                imports: SIMPLE_REFINER_IMPORTS,
                declarations: SIMPLE_REFINER_DIRECTIVES,
                exports: SIMPLE_REFINER_DIRECTIVES
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultTriggerName = 'slideInOut';
/** @type {?} */
const defaultAnimationDurationMs = 200;
/** @type {?} */
const defaultOpenStyle = {
    height: '*',
    overflow: 'hidden'
};
/** @type {?} */
const defaultClosedStyle = {
    height: '0',
    overflow: 'hidden'
};
/** @type {?} */
const generateSlideInOut = (/**
 * @param {?=} triggerName
 * @param {?=} openStyle
 * @param {?=} closedStyle
 * @param {?=} animationDurationMs
 * @return {?}
 */
(triggerName = defaultTriggerName, openStyle = defaultOpenStyle, closedStyle = defaultClosedStyle, animationDurationMs = defaultAnimationDurationMs) => trigger(triggerName, [
    state('in', style(openStyle)),
    transition(':leave', [
        style(openStyle),
        group([animate(`${animationDurationMs}ms`, style(closedStyle))])
    ]),
    transition(':enter', [
        style(closedStyle),
        group([animate(`${animationDurationMs}ms`, style(openStyle))])
    ])
]));
/** @type {?} */
const optionsInOut = animation([generateSlideInOut('optionsInOut')]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
const momentFloorSubtract = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
(arg1, arg2) => momentFloor().subtract(arg1, arg2));
/** @type {?} */
const momentFloorAdd = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
(arg1, arg2) => momentFloor().add(arg1, arg2));
/** @type {?} */
const defaultDateOptions = {
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
class DateRefinerComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DATE_REFINER_DIRECTIVES = [DateRefinerComponent];
/** @type {?} */
const DATE_REFINER_IMPORTS = [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    TruncateModule
];
class DateRefinerModule {
}
DateRefinerModule.decorators = [
    { type: NgModule, args: [{
                imports: DATE_REFINER_IMPORTS,
                declarations: DATE_REFINER_DIRECTIVES,
                exports: DATE_REFINER_DIRECTIVES
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RefinersComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const REFINERS_DIRECTIVES = [RefinersComponent];
/** @type {?} */
const REFINERS_IMPORTS = [
    CommonModule,
    FormsModule,
    DateRefinerModule,
    SimpleRefinerModule,
    BrowserAnimationsModule
];
class RefinersModule {
}
RefinersModule.decorators = [
    { type: NgModule, args: [{
                imports: REFINERS_IMPORTS,
                exports: REFINERS_DIRECTIVES,
                declarations: REFINERS_DIRECTIVES
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template OptionType, ValueType
 */
class SimpleOptions {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Class implementation of an IDateRefiner. Simple construction of a date
 */
class DateRefinerValue$1 {
    /**
     * @param {?=} from
     * @param {?=} to
     */
    constructor(from, to) {
        if (from) {
            this.from = from;
        }
        if (to) {
            this.to = to;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { SimpleRefinerModule, DateRefinerModule, RefinersModule, SimpleOption, DateOption, SimpleOptions, RefinerBase, SimpleRefiner, DateRefiner, DateRefinerValue$1 as DateRefinerValue, DateRefinerComponent as ɵg, DATE_REFINER_IMPORTS as ɵb, RefinersComponent as ɵh, REFINERS_IMPORTS as ɵc, SimpleRefinerComponent as ɵf, SIMPLE_REFINER_IMPORTS as ɵa, TruncateComponent as ɵe, TruncateModule as ɵd };

//# sourceMappingURL=porcelain.js.map