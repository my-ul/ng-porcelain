/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// Porcelain
import { SimpleOption } from '../refiners/IOption';
import { SimpleRefiner } from '../refiners/IRefiner';
/** @type {?} */
export const defaultOptionShowCount = 5;
export class SimpleRefinerComponent {
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
if (false) {
    /** @type {?} */
    SimpleRefinerComponent.prototype.refiner;
    /** @type {?} */
    SimpleRefinerComponent.prototype._showCount;
    /** @type {?} */
    SimpleRefinerComponent.prototype._isOpen;
    /** @type {?} */
    SimpleRefinerComponent.prototype._isExpanded;
    /** @type {?} */
    SimpleRefinerComponent.prototype.onRefinerChange;
    /** @type {?} */
    SimpleRefinerComponent.prototype.faChevronDown;
    /** @type {?} */
    SimpleRefinerComponent.prototype.contractIcon;
    /** @type {?} */
    SimpleRefinerComponent.prototype.expandIcon;
    /** @type {?} */
    SimpleRefinerComponent.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXJlZmluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcG9yY2VsYWluLyIsInNvdXJjZXMiOlsibGliL3NpbXBsZS1yZWZpbmVyL3NpbXBsZS1yZWZpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQ04sV0FBVyxFQUNYLGFBQWEsRUFDYixXQUFXLEVBQ1gsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFHM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFJckQsTUFBTSxPQUFPLHNCQUFzQixHQUFHLENBQUM7QUFTdkMsTUFBTTtJQTJDTDtRQVhBLFVBQVU7UUFDQSxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLFFBQVE7UUFDUixrQkFBYSxHQUFHLFdBQVcsQ0FBQztRQUM1QixpQkFBWSxHQUFHLFdBQVcsQ0FBQztRQUMzQixlQUFVLEdBQUcsYUFBYSxDQUFDO0lBS1osQ0FBQzs7Ozs7SUFuQ2hCLElBQUksU0FBUztRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELElBQUksU0FBUyxDQUFDLFFBQWdCO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxJQUFJLE1BQU07UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQUksTUFBTSxDQUFDLGNBQXVCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFD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Q2hDLDRDQUF1Qzs7SUFDdkMseUNBQWtDOztJQUNsQyw2Q0FBMEM7O0lBNEIxQyxpREFBa0U7O0lBR2xFLCtDQUE0Qjs7SUFDNUIsOENBQTJCOztJQUMzQiw0Q0FBMkI7O0lBRzNCLHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG5cdGZhQ2FyZXREb3duLFxuXHRmYUNoZXZyb25Eb3duLFxuXHRmYUNoZXZyb25VcFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuXG4vLyBQb3JjZWxhaW5cbmltcG9ydCB7IFNpbXBsZU9wdGlvbiB9IGZyb20gJy4uL3JlZmluZXJzL0lPcHRpb24nO1xuaW1wb3J0IHsgU2ltcGxlUmVmaW5lciB9IGZyb20gJy4uL3JlZmluZXJzL0lSZWZpbmVyJztcbmltcG9ydCB7IGJsb2NrSW5pdGlhbEFuaW1hdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9hbmltYXRpb25zL2Jsb2NrSW5pdGlhbEFuaW1hdGlvbi50cmlnZ2VyJztcbmltcG9ydCB7IG9wdGlvbnNJbk91dCB9IGZyb20gJy4uL3NoYXJlZC9hbmltYXRpb25zL3NsaWRlSW5PdXQudHJpZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uU2hvd0NvdW50ID0gNTtcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdwb3JjZWxhaW4tc2ltcGxlLXJlZmluZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vc2ltcGxlLXJlZmluZXIuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9zaW1wbGUtcmVmaW5lci5jb21wb25lbnQuc2NzcyddLFxuXHQvL2FuaW1hdGlvbnM6IFtibG9ja0luaXRpYWxBbmltYXRpb24sIG9wdGlvbnNJbk91dF1cbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlUmVmaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdC8vIElucHV0c1xuXHRASW5wdXQoKSByZWZpbmVyOiBTaW1wbGVSZWZpbmVyO1xuXHRASW5wdXQoJ3Nob3dDb3VudCcpIF9zaG93Q291bnQ6IG51bWJlcjtcblx0QElucHV0KCdpc09wZW4nKSBfaXNPcGVuOiBib29sZWFuO1xuXHRASW5wdXQoJ2lzRXhwYW5kZWQnKSBfaXNFeHBhbmRlZDogYm9vbGVhbjtcblxuXHQvLyBHZXR0ZXJzXG5cdGdldCBzaG93Q291bnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3Nob3dDb3VudCB8fCB0aGlzLnJlZmluZXIuc2hvd0NvdW50IHx8IDU7XG5cdH1cblxuXHRzZXQgc2hvd0NvdW50KG5ld0NvdW50OiBudW1iZXIpIHtcblx0XHR0aGlzLl9zaG93Q291bnQgPSBuZXdDb3VudDtcblx0fVxuXG5cdGdldCBpc09wZW4oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzT3Blbjtcblx0fVxuXG5cdHNldCBpc09wZW4obmV3SXNPcGVuVmFsdWU6IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9pc09wZW4gPSBuZXdJc09wZW5WYWx1ZTtcblx0fVxuXG5cdGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9pc0V4cGFuZGVkO1xuXHR9XG5cblx0c2V0IGlzRXhwYW5kZWQobmV3SXNFeHBhbmRlZFZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5faXNFeHBhbmRlZCA9IG5ld0lzRXhwYW5kZWRWYWx1ZTtcblx0fVxuXG5cdC8vIE91dHB1dHNcblx0QE91dHB1dCgpIG9uUmVmaW5lckNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0Ly8gSWNvbnNcblx0ZmFDaGV2cm9uRG93biA9IGZhQ2FyZXREb3duO1xuXHRjb250cmFjdEljb24gPSBmYUNoZXZyb25VcDtcblx0ZXhwYW5kSWNvbiA9IGZhQ2hldnJvbkRvd247XG5cblx0Ly8gU3RhdGVcblx0dmFsdWU6IG9iamVjdCB8IFNpbXBsZU9wdGlvbjtcblxuXHRjb25zdHJ1Y3RvcigpIHt9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0Ly8gUGljayB0aGUgYGlzT3BlbmAgdmFsdWU7XG5cdFx0bGV0IGlzT3BlbiA9IHRydWU7XG5cblx0XHRpZiAodGhpcy5yZWZpbmVyICYmIHR5cGVvZiB0aGlzLnJlZmluZXIuaXNPcGVuID09PSAnYm9vbGVhbicpIHtcblx0XHRcdGlzT3BlbiA9IHRoaXMucmVmaW5lci5pc09wZW47XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLl9pc09wZW4gPT09ICdib29sZWFuJykge1xuXHRcdFx0aXNPcGVuID0gdGhpcy5faXNPcGVuO1xuXHRcdH1cblxuXHRcdHRoaXMuaXNPcGVuID0gISFpc09wZW47XG5cblx0XHQvLyBQaWNrIHRoZSBgc2hvd0NvdW50YCB2YWx1ZVxuXHRcdGxldCBzaG93Q291bnQgPSA1O1xuXG5cdFx0aWYgKHRoaXMucmVmaW5lciAmJiB0eXBlb2YgdGhpcy5yZWZpbmVyLnNob3dDb3VudCA9PT0gJ251bWJlcicpIHtcblx0XHRcdHNob3dDb3VudCA9IHRoaXMucmVmaW5lci5zaG93Q291bnQ7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLl9zaG93Q291bnQgPT09ICdudW1iZXInKSB7XG5cdFx0XHRzaG93Q291bnQgPSB0aGlzLl9zaG93Q291bnQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5zaG93Q291bnQgPSBzaG93Q291bnQ7XG5cblx0XHQvLyBQaWNrIHRoZSBgaXNFeHBhbmRlZGAgdmFsdWVcblx0XHRsZXQgaXNFeHBhbmRlZCA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMucmVmaW5lciAmJiB0eXBlb2YgdGhpcy5yZWZpbmVyLmlzRXhwYW5kZWQgPT09ICdib29sZWFuJykge1xuXHRcdFx0aXNFeHBhbmRlZCA9IHRoaXMucmVmaW5lci5pc0V4cGFuZGVkO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdGhpcy5faXNFeHBhbmRlZCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRpc0V4cGFuZGVkID0gdGhpcy5faXNFeHBhbmRlZDtcblx0XHR9XG5cblx0XHR0aGlzLl9pc0V4cGFuZGVkID0gISFpc0V4cGFuZGVkO1xuXG5cdFx0Ly8gU2V0cyB1cCB0aGUgZGljdGlvbmFyeSB1c2VkIGZvciB2YWx1ZSBzdGF0ZVxuXHRcdHRoaXMuc2VsZWN0Tm9uZSgpO1xuXG5cdFx0Ly8gT3B0aW9ucyBjYW4gYmUgc2VsZWN0ZWQgb24gbG9hZCB0aHJvdWdoIE9wdGlvbi5pc1NlbGVjdGVkIGJvb2xlYW5cblx0XHRpZiAodGhpcy5yZWZpbmVyLm9wdGlvbnMpIHtcblx0XHRcdGZvciAobGV0IG9wdGlvblNsdWcgaW4gdGhpcy5yZWZpbmVyLm9wdGlvbnMpIHtcblx0XHRcdFx0bGV0IG9wdGlvbiA9IHRoaXMucmVmaW5lci5vcHRpb25zW29wdGlvblNsdWddO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRvcHRpb24gaW5zdGFuY2VvZiBTaW1wbGVPcHRpb24gfHxcblx0XHRcdFx0XHRvcHRpb24uaGFzT3duUHJvcGVydHkoJ2lzU2VsZWN0ZWQnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRpZiAob3B0aW9uLnNsdWcgIT09IG9wdGlvblNsdWcpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3Iob3B0aW9uKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyAhISBlbnN1cmVzIGEgYm9vbGVhbiB2YWx1ZVxuXHRcdFx0XHRcdHRoaXMudmFsdWVbb3B0aW9uU2x1Z10gPSAhIW9wdGlvbi5pc1NlbGVjdGVkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gT3B0aW9ucyBzaG91bGQgYmUgc2VsZWN0ZWQgb24gbG9hZCB0aHJvdWdoIHRoZSByZWZpbmVyLnNlbGVjdGVkIGFycmF5IG9mIHNlbGVjdGVkIG9wdGlvblNsdWdzXG5cdFx0aWYgKHRoaXMucmVmaW5lci5zZWxlY3RlZCkge1xuXHRcdFx0Zm9yIChsZXQgb3B0aW9uU2x1ZyBvZiB0aGlzLnJlZmluZXIuc2VsZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy52YWx1ZVtvcHRpb25TbHVnXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dG9nZ2xlRXhwYW5kZWQoKTogdm9pZCB7XG5cdFx0dGhpcy5faXNFeHBhbmRlZCA9ICF0aGlzLl9pc0V4cGFuZGVkO1xuXHR9XG5cblx0dG9nZ2xlT3BlbigpOiB2b2lkIHtcblx0XHR0aGlzLl9pc09wZW4gPSAhdGhpcy5faXNPcGVuO1xuXHR9XG5cblx0Y291bnRUYWlsKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucmVmaW5lci5vcHRpb25zKS5sZW5ndGggLSB0aGlzLl9zaG93Q291bnQ7XG5cdH1cblxuXHRjYW5FeHBhbmQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMucmVmaW5lci50eXBlID09PSAnc2ltcGxlJ1xuXHRcdFx0PyBPYmplY3Qua2V5cyh0aGlzLnJlZmluZXIub3B0aW9ucykubGVuZ3RoID4gdGhpcy5fc2hvd0NvdW50XG5cdFx0XHQ6IGZhbHNlO1xuXHR9XG5cblx0Z2V0RXhwYW5kZWRPcHRpb25LZXlzKCk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gdGhpcy5faXNFeHBhbmRlZFxuXHRcdFx0PyBPYmplY3Qua2V5cyh0aGlzLnJlZmluZXIub3B0aW9ucylcblx0XHRcdDogT2JqZWN0LmtleXModGhpcy5yZWZpbmVyLm9wdGlvbnMpLnNsaWNlKDAsIHRoaXMuX3Nob3dDb3VudCk7XG5cdH1cblxuXHRvcHRpb25IYXNCYWRnZShvcHRpb246IHN0cmluZyB8IFNpbXBsZU9wdGlvbik6IGJvb2xlYW4ge1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9uLmJhZGdlICYmIG9wdGlvbi5iYWRnZSAhPT0gJyc7XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9uTGFiZWwob3B0aW9uOiBzdHJpbmcgfCBTaW1wbGVPcHRpb24pOiBzdHJpbmcge1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIG9wdGlvbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG9wdGlvbi5sYWJlbDtcblx0XHR9XG5cdH1cblx0Z2V0T3B0aW9uQmFkZ2Uob3B0aW9uOiBTaW1wbGVPcHRpb24pIHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbi5iYWRnZSA9PT0gJ251bWJlcicpXG5cdFx0XHRyZXR1cm4gb3B0aW9uLmJhZGdlLnRvTG9jYWxlU3RyaW5nKCk7XG5cdFx0ZWxzZSByZXR1cm4gb3B0aW9uLmJhZGdlO1xuXHR9XG5cblx0Z2V0VmFsdWUoKTogc3RyaW5nW10ge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlKS5maWx0ZXIoa2V5ID0+IHRoaXMudmFsdWVba2V5XSk7XG5cdH1cblxuXHRjYW5TZWxlY3ROb25lKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZhbHVlKS5ldmVyeShcblx0XHRcdHBhcmFtTmFtZSA9PiB0aGlzLnZhbHVlW3BhcmFtTmFtZV0gPT09IHRydWVcblx0XHQpO1xuXHR9XG5cblx0c2VsZWN0Tm9uZSgpIHtcblx0XHR0aGlzLnNldEFsbChmYWxzZSk7XG5cdH1cblxuXHRjYW5TZWxlY3RBbGwoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICF0aGlzLmNhblNlbGVjdE5vbmUoKTtcblx0fVxuXG5cdHNlbGVjdEFsbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRBbGwodHJ1ZSk7XG5cdH1cblxuXHRzZXRBbGwodmFsdWU6IGFueSkge1xuXHRcdGlmICh0aGlzLnJlZmluZXIudHlwZSA9PT0gJ3NpbXBsZScpIHtcblx0XHRcdHRoaXMudmFsdWUgPSB7fTtcblx0XHRcdGZvciAobGV0IG9wdGlvbktleSBpbiB0aGlzLnJlZmluZXIub3B0aW9ucykge1xuXHRcdFx0XHR0aGlzLnZhbHVlW29wdGlvbktleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHRcdH1cblx0XHR0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG5cdH1cblxuXHRvblNlbGVjdGlvbkNoYW5nZSgpIHtcblx0XHR0aGlzLm9uUmVmaW5lckNoYW5nZS5lbWl0KFt0aGlzLnJlZmluZXIuc2x1ZywgdGhpcy5nZXRWYWx1ZSgpXSk7XG5cdH1cbn1cbiJdfQ==