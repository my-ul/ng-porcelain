/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
// Porcelain/truncate
import { TruncateModule } from "../truncate/truncate.module";
// DateRefiner
import { DateRefinerComponent } from "./date-refiner.component";
/** @type {?} */
var DATE_REFINER_DIRECTIVES = [DateRefinerComponent];
/** @type {?} */
export var DATE_REFINER_IMPORTS = [
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
export { DateRefinerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yZWZpbmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BvcmNlbGFpbi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXJlZmluZXIvZGF0ZS1yZWZpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztBQUdyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBRzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUkxRCx1QkFBdUIsR0FBRyxDQUFDLG9CQUFvQixDQUFDOztBQUV0RCxNQUFNLEtBQU8sb0JBQW9CLEdBQUc7SUFDbkMsWUFBWTtJQUNaLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLGNBQWM7Q0FDZDtBQUVEO0lBQUE7SUFLZ0MsQ0FBQzs7Z0JBTGhDLFFBQVEsU0FBQztvQkFDVCxPQUFPLEVBQUUsb0JBQW9CO29CQUM3QixZQUFZLEVBQUUsdUJBQXVCO29CQUNyQyxPQUFPLEVBQUUsdUJBQXVCO2lCQUNoQzs7SUFDK0Isd0JBQUM7Q0FBQSxBQUxqQyxJQUtpQztTQUFwQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zXCI7XHJcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSBcIkBmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lXCI7XHJcblxyXG4vLyBQb3JjZWxhaW4vdHJ1bmNhdGVcclxuaW1wb3J0IHsgVHJ1bmNhdGVNb2R1bGUgfSBmcm9tIFwiLi4vdHJ1bmNhdGUvdHJ1bmNhdGUubW9kdWxlXCI7XHJcblxyXG4vLyBEYXRlUmVmaW5lclxyXG5pbXBvcnQgeyBEYXRlUmVmaW5lckNvbXBvbmVudCB9IGZyb20gXCIuL2RhdGUtcmVmaW5lci5jb21wb25lbnRcIjtcclxuXHJcblxyXG5cclxuY29uc3QgREFURV9SRUZJTkVSX0RJUkVDVElWRVMgPSBbRGF0ZVJlZmluZXJDb21wb25lbnRdO1xyXG5cclxuZXhwb3J0IGNvbnN0IERBVEVfUkVGSU5FUl9JTVBPUlRTID0gW1xyXG5cdENvbW1vbk1vZHVsZSxcclxuXHRGb3Jtc01vZHVsZSxcclxuXHRGb250QXdlc29tZU1vZHVsZSxcclxuXHRCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuXHRUcnVuY2F0ZU1vZHVsZVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBEQVRFX1JFRklORVJfSU1QT1JUUyxcclxuXHRkZWNsYXJhdGlvbnM6IERBVEVfUkVGSU5FUl9ESVJFQ1RJVkVTLFxyXG5cdGV4cG9ydHM6IERBVEVfUkVGSU5FUl9ESVJFQ1RJVkVTXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlUmVmaW5lck1vZHVsZSB7fVxyXG4iXX0=