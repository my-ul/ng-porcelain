import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { trigger, state, style, transition, group, animate, animation } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { __read, __spread, __values, __extends } from 'tslib';
import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
var  /**
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
    __extends(DateOption, _super);
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
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
var SimpleRefiner = /** @class */ (function (_super) {
    __extends(SimpleRefiner, _super);
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
var DateRefiner = /** @class */ (function (_super) {
    __extends(DateRefiner, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SimpleRefinerComponent = /** @class */ (function () {
    function SimpleRefinerComponent() {
        // Outputs
        this.onRefinerChange = new EventEmitter();
        // Icons
        this.faChevronDown = faCaretDown;
        this.contractIcon = faChevronUp;
        this.expandIcon = faChevronDown;
    }
    Object.defineProperty(SimpleRefinerComponent.prototype, "showCount", {
        // Getters
        get: 
        // Getters
        /**
         * @return {?}
         */
        function () {
            return this._showCount || this.refiner.showCount || 5;
        },
        set: /**
         * @param {?} newCount
         * @return {?}
         */
        function (newCount) {
            this._showCount = newCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleRefinerComponent.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen;
        },
        set: /**
         * @param {?} newIsOpenValue
         * @return {?}
         */
        function (newIsOpenValue) {
            this._isOpen = newIsOpenValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleRefinerComponent.prototype, "isExpanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isExpanded;
        },
        set: /**
         * @param {?} newIsExpandedValue
         * @return {?}
         */
        function (newIsExpandedValue) {
            this._isExpanded = newIsExpandedValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Pick the `isOpen` value;
        /** @type {?} */
        var isOpen = true;
        if (this.refiner && typeof this.refiner.isOpen === 'boolean') {
            isOpen = this.refiner.isOpen;
        }
        if (typeof this._isOpen === 'boolean') {
            isOpen = this._isOpen;
        }
        this.isOpen = !!isOpen;
        // Pick the `showCount` value
        /** @type {?} */
        var showCount = 5;
        if (this.refiner && typeof this.refiner.showCount === 'number') {
            showCount = this.refiner.showCount;
        }
        if (typeof this._showCount === 'number') {
            showCount = this._showCount;
        }
        this.showCount = showCount;
        // Pick the `isExpanded` value
        /** @type {?} */
        var isExpanded = false;
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
            for (var optionSlug in this.refiner.options) {
                /** @type {?} */
                var option = this.refiner.options[optionSlug];
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
            try {
                for (var _a = __values(this.refiner.selected), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var optionSlug = _b.value;
                    this.value[optionSlug] = true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _c;
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.toggleExpanded = /**
     * @return {?}
     */
    function () {
        this._isExpanded = !this._isExpanded;
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.toggleOpen = /**
     * @return {?}
     */
    function () {
        this._isOpen = !this._isOpen;
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.countTail = /**
     * @return {?}
     */
    function () {
        return Object.keys(this.refiner.options).length - this._showCount;
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.canExpand = /**
     * @return {?}
     */
    function () {
        return this.refiner.type === 'simple'
            ? Object.keys(this.refiner.options).length > this._showCount
            : false;
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.getExpandedOptionKeys = /**
     * @return {?}
     */
    function () {
        return this._isExpanded
            ? Object.keys(this.refiner.options)
            : Object.keys(this.refiner.options).slice(0, this._showCount);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SimpleRefinerComponent.prototype.optionHasBadge = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (typeof option === 'string') {
            return false;
        }
        else {
            return option.badge && option.badge !== '';
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SimpleRefinerComponent.prototype.getOptionLabel = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (typeof option === 'string') {
            return option;
        }
        else {
            return option.label;
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SimpleRefinerComponent.prototype.getOptionBadge = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (typeof option.badge === 'number')
            return option.badge.toLocaleString();
        else
            return option.badge;
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.getValue = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Object.keys(this.value).filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return _this.value[key]; }));
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.canSelectNone = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Object.keys(this.value).every((/**
         * @param {?} paramName
         * @return {?}
         */
        function (paramName) { return _this.value[paramName] === true; }));
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.selectNone = /**
     * @return {?}
     */
    function () {
        this.setAll(false);
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.canSelectAll = /**
     * @return {?}
     */
    function () {
        return !this.canSelectNone();
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        return this.setAll(true);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SimpleRefinerComponent.prototype.setAll = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.refiner.type === 'simple') {
            this.value = {};
            for (var optionKey in this.refiner.options) {
                this.value[optionKey] = value;
            }
        }
        else {
            this.value = value;
        }
        this.onSelectionChange();
    };
    /**
     * @return {?}
     */
    SimpleRefinerComponent.prototype.onSelectionChange = /**
     * @return {?}
     */
    function () {
        this.onRefinerChange.emit([this.refiner.slug, this.getValue()]);
    };
    SimpleRefinerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'porcelain-simple-refiner',
                    template: "<div\n\tclass=\"refiner refiner--simple\"\n\t[class.refiner--open]=\"isOpen\"\n\t[class.refiner--closed]=\"!isOpen\"\n>\n\t<div class=\"refiner__section refiner__header\" (click)=\"toggleOpen()\">\n\t\t<div class=\"media media--clickable\">\n\t\t\t<div class=\"media__body\">\n\t\t\t\t<h3 class=\"refiner__title\">{{ refiner.title }}</h3>\n\t\t\t</div>\n\t\t\t<div class=\"refiner__toggle | media__right media--align-center\">\n\t\t\t\t<fa-icon [icon]=\"faChevronDown\"></fa-icon>\n\t\t\t\t<span class=\"sr-only\">Expand {{ refiner.title }} refiner</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- ./refiner__section -->\n\n\t<!-- [@blockInitialAnimation -->\n\t<div class=\"refiner__section refiner__toggleable\">\n\t\t<!-- [@optionsInOut -->\n\t\t<div\n\t\t\t*ngIf=\"isOpen\"\n\t\t\tclass=\"refiner__section refiner__body\"\n\t\t>\n\t\t\t<div class=\"refiner__section refiner__selection-toggles\">\n\t\t\t\t<button\n\t\t\t\t\t(click)=\"selectNone()\"\n\t\t\t\t\t*ngIf=\"canSelectNone()\"\n\t\t\t\t\tclass=\"refiner__select-none\"\n\t\t\t\t>\n\t\t\t\t\tSelect None\n\t\t\t\t</button>\n\t\t\t\t<button\n\t\t\t\t\t(click)=\"selectAll()\"\n\t\t\t\t\t*ngIf=\"canSelectAll()\"\n\t\t\t\t\tclass=\"refiner__select-all\"\n\t\t\t\t>\n\t\t\t\t\tSelect All\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__selection-toggles -->\n\n\t\t\t<div class=\"refiner__section refiner__options\">\n\t\t\t\t<ul class=\"options\">\n\t\t\t\t\t<li\n\t\t\t\t\t\tclass=\"option\"\n\t\t\t\t\t\t*ngFor=\"let optionKey of getExpandedOptionKeys()\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<label class=\"media media--align-items-center\">\n\t\t\t\t\t\t\t<div class=\"media__left\">\n\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\ttype=\"checkbox\"\n\t\t\t\t\t\t\t\t\tname=\"refiner-{{ refiner.slug }}\"\n\t\t\t\t\t\t\t\t\tvalue=\"{{ optionKey }}\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"value[optionKey]\"\n\t\t\t\t\t\t\t\t\t(change)=\"onSelectionChange()\"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"media__body\">\n\t\t\t\t\t\t\t\t<app-truncate\n\t\t\t\t\t\t\t\t\t[value]=\"\n\t\t\t\t\t\t\t\t\t\tgetOptionLabel(\n\t\t\t\t\t\t\t\t\t\t\trefiner.options[optionKey]\n\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\"\n\t\t\t\t\t\t\t\t></app-truncate>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\tclass=\"media__right\"\n\t\t\t\t\t\t\t\t*ngIf=\"\n\t\t\t\t\t\t\t\t\toptionHasBadge(refiner.options[optionKey])\n\t\t\t\t\t\t\t\t\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<div class=\"badge\">\n\t\t\t\t\t\t\t\t\t{{\n\t\t\t\t\t\t\t\t\t\tgetOptionBadge(\n\t\t\t\t\t\t\t\t\t\t\trefiner.options[optionKey]\n\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<!-- ./refiner__options-->\n\n\t\t\t<div\n\t\t\t\tclass=\"refiner__section refiner__show-hide\"\n\t\t\t\t*ngIf=\"canExpand()\"\n\t\t\t>\n\t\t\t\t<button\n\t\t\t\t\t(click)=\"toggleExpanded()\"\n\t\t\t\t\tclass=\"refiner__expand-toggle\"\n\t\t\t\t>\n\t\t\t\t\t<span *ngIf=\"isExpanded\"\n\t\t\t\t\t\t>Hide {{ countTail() | number }} Options\n\t\t\t\t\t\t<fa-icon [icon]=\"contractIcon\"></fa-icon>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span *ngIf=\"!isExpanded\"\n\t\t\t\t\t\t>Show {{ countTail() | number }} More\n\t\t\t\t\t\t<fa-icon [icon]=\"expandIcon\"></fa-icon\n\t\t\t\t\t></span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<!-- /.refiner__show-hide -->\n\t\t</div>\n\t\t<!-- /.refiner__body -->\n\t</div>\n\t<!-- /ng-container -->\n</div>\n",
                    styles: ["a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}.media{display:flex;min-width:0;max-width:100%}.media__left,.media__right{flex:0}.media__left{margin-right:.75em}.media__body{flex:1}.media__right{margin-left:.75em}.media--align-items-center{align-items:center}.media--clickable{cursor:pointer}.media--align-center{-ms-grid-row-align:center;align-self:center}.toggleable.toggleable--closed>.toggleable__subject+.toggleable__subject{margin-top:0}.toggleable.toggleable--open>.toggleable__subject+.toggleable__subject{margin-top:1.5}.refiner{padding:1em}.refiner .refiner__head{cursor:pointer;background-color:red}.refiner .refiner__title{font-size:1em;font-weight:600}.refiner .refiner__section+.refiner__section:not(.refiner__toggleable){margin-top:1em}.refiner>.refiner__section+.refiner__section{transition:margin-top .2s linear;overflow:hidden}.refiner.refiner--closed>.refiner__section+.refiner__section.refiner__toggleable{margin-top:0}.refiner.refiner--open>.refiner__section+.refiner__section.refiner__toggleable{margin-top:1em}.refiner__select-all,.refiner__select-none{cursor:pointer;margin:0;padding:0;color:#23527c;text-decoration:underline;font-size:.85rem;border:none;background:0 0}.refiner__select-all:hover,.refiner__select-none:hover{color:#2e6ca4}.refiner__expand-toggle{margin:0;padding:.4em .8em;border:none;color:#333;font-size:.75em;background:#e0e0e0;border-radius:.2em;cursor:pointer}.refiner__expand-toggle[disabled]{color:#999;cursor:not-allowed}.refiner .refiner__toggle{transition:transform .2s ease-in-out;transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out}.refiner.refiner--closed .refiner__toggle{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.refiner .options{list-style:none;margin:0;padding:0}.refiner__expand-toggle+.refiner__expand-toggle,.refiner__expand-toggle+.refiner__select-all,.refiner__expand-toggle+.refiner__select-none,.refiner__select-all+.refiner__expand-toggle,.refiner__select-all+.refiner__select-all,.refiner__select-all+.refiner__select-none,.refiner__select-none+.refiner__expand-toggle,.refiner__select-none+.refiner__select-all,.refiner__select-none+.refiner__select-none{margin-left:.3em}"]
                }] }
    ];
    SimpleRefinerComponent.ctorParameters = function () { return []; };
    SimpleRefinerComponent.propDecorators = {
        refiner: [{ type: Input }],
        _showCount: [{ type: Input, args: ['showCount',] }],
        _isOpen: [{ type: Input, args: ['isOpen',] }],
        _isExpanded: [{ type: Input, args: ['isExpanded',] }],
        onRefinerChange: [{ type: Output }]
    };
    return SimpleRefinerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TruncateComponent = /** @class */ (function () {
    function TruncateComponent() {
    }
    /**
     * @return {?}
     */
    TruncateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    TruncateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-truncate',
                    template: "\n<div class=\"truncate\">\n\t<span class=\"truncate__value\" title=\"{{value}}\">\n\t\t{{value}}\n\t</span>\n</div>\n",
                    styles: [".truncate{display:flex}.truncate .truncate__value{flex:1 1 1px;padding:.2em 0;width:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
                }] }
    ];
    TruncateComponent.ctorParameters = function () { return []; };
    TruncateComponent.propDecorators = {
        value: [{ type: Input }]
    };
    return TruncateComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var TRUNCATE_DIRECTIVES = [TruncateComponent];
var TruncateModule = /** @class */ (function () {
    function TruncateModule() {
    }
    TruncateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: TRUNCATE_DIRECTIVES,
                    exports: TRUNCATE_DIRECTIVES,
                },] }
    ];
    return TruncateModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SIMPLE_REFINER_DIRECTIVES = [SimpleRefinerComponent];
/** @type {?} */
var SIMPLE_REFINER_IMPORTS = [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TruncateModule
];
var SimpleRefinerModule = /** @class */ (function () {
    function SimpleRefinerModule() {
    }
    SimpleRefinerModule.decorators = [
        { type: NgModule, args: [{
                    imports: SIMPLE_REFINER_IMPORTS,
                    declarations: SIMPLE_REFINER_DIRECTIVES,
                    exports: SIMPLE_REFINER_DIRECTIVES
                },] }
    ];
    return SimpleRefinerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var defaultTriggerName = 'slideInOut';
/** @type {?} */
var defaultAnimationDurationMs = 200;
/** @type {?} */
var defaultOpenStyle = {
    height: '*',
    overflow: 'hidden'
};
/** @type {?} */
var defaultClosedStyle = {
    height: '0',
    overflow: 'hidden'
};
/** @type {?} */
var generateSlideInOut = (/**
 * @param {?=} triggerName
 * @param {?=} openStyle
 * @param {?=} closedStyle
 * @param {?=} animationDurationMs
 * @return {?}
 */
function (triggerName, openStyle, closedStyle, animationDurationMs) {
    if (triggerName === void 0) { triggerName = defaultTriggerName; }
    if (openStyle === void 0) { openStyle = defaultOpenStyle; }
    if (closedStyle === void 0) { closedStyle = defaultClosedStyle; }
    if (animationDurationMs === void 0) { animationDurationMs = defaultAnimationDurationMs; }
    return trigger(triggerName, [
        state('in', style(openStyle)),
        transition(':leave', [
            style(openStyle),
            group([animate(animationDurationMs + "ms", style(closedStyle))])
        ]),
        transition(':enter', [
            style(closedStyle),
            group([animate(animationDurationMs + "ms", style(openStyle))])
        ])
    ]);
});
/** @type {?} */
var optionsInOut = animation([generateSlideInOut('optionsInOut')]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
var momentFloorSubtract = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
function (arg1, arg2) { return momentFloor().subtract(arg1, arg2); });
/** @type {?} */
var momentFloorAdd = (/**
 * @param {?=} arg1
 * @param {?=} arg2
 * @return {?}
 */
function (arg1, arg2) { return momentFloor().add(arg1, arg2); });
/** @type {?} */
var defaultDateOptions = {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DATE_REFINER_DIRECTIVES = [DateRefinerComponent];
/** @type {?} */
var DATE_REFINER_IMPORTS = [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    TruncateModule
];
var DateRefinerModule = /** @class */ (function () {
    function DateRefinerModule() {
    }
    DateRefinerModule.decorators = [
        { type: NgModule, args: [{
                    imports: DATE_REFINER_IMPORTS,
                    declarations: DATE_REFINER_DIRECTIVES,
                    exports: DATE_REFINER_DIRECTIVES
                },] }
    ];
    return DateRefinerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        var _a = __read(update, 2), slug = _a[0], selected = _a[1];
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
                return __spread(result, [
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
                return __spread(result, [
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var REFINERS_DIRECTIVES = [RefinersComponent];
/** @type {?} */
var REFINERS_IMPORTS = [
    CommonModule,
    FormsModule,
    DateRefinerModule,
    SimpleRefinerModule,
    BrowserAnimationsModule
];
var RefinersModule = /** @class */ (function () {
    function RefinersModule() {
    }
    RefinersModule.decorators = [
        { type: NgModule, args: [{
                    imports: REFINERS_IMPORTS,
                    exports: REFINERS_DIRECTIVES,
                    declarations: REFINERS_DIRECTIVES
                },] }
    ];
    return RefinersModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template OptionType, ValueType
 */
var  /**
 * @template OptionType, ValueType
 */
SimpleOptions = /** @class */ (function () {
    function SimpleOptions() {
    }
    return SimpleOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Class implementation of an IDateRefiner. Simple construction of a date
 */
var  /**
 * Class implementation of an IDateRefiner. Simple construction of a date
 */
DateRefinerValue$1 = /** @class */ (function () {
    function DateRefinerValue(from, to) {
        if (from) {
            this.from = from;
        }
        if (to) {
            this.to = to;
        }
    }
    return DateRefinerValue;
}());

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