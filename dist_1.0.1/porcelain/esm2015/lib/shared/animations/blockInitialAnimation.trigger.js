/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, transition } from "@angular/animations";
/**
 * Generates a container that will stop child animations from occurring on load.
 *
 * \@param name Name for the animation block, such as blockInitialAnimation
 * \@example
 * 	```typescript
 * 		## Component class
 * \@Component({
 * 			animations: [ generateAnimationBlock('blockInitialAnimation') ]
 * 		})
 * 		class MyComponent {
 * 			// ... component implementation
 * 		}
 * 		```
 *
 * 		## Component template
 * 		```
 * 			<ng-container [\@blockInitialAnimation]>
 * 				... animated template items ...
 * 			</ng-container>
 * 		```
 * @type {?}
 */
export let generateAnimationBlocker = (/**
 * @param {?} name
 * @return {?}
 */
name => trigger(name, [
    transition(':enter', [])
]));
/** @type {?} */
export let blockInitialAnimation = generateAnimationBlocker('blockInitialAnimation');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tJbml0aWFsQW5pbWF0aW9uLnRyaWdnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wb3JjZWxhaW4vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL2FuaW1hdGlvbnMvYmxvY2tJbml0aWFsQW5pbWF0aW9uLnRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCMUQsTUFBTSxLQUFLLHdCQUF3Qjs7OztBQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtJQUMzRCxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztDQUN4QixDQUFDLENBQUE7O0FBRUYsTUFBTSxLQUFLLHFCQUFxQixHQUFHLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHJpZ2dlciwgdHJhbnNpdGlvbiB9IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgY29udGFpbmVyIHRoYXQgd2lsbCBzdG9wIGNoaWxkIGFuaW1hdGlvbnMgZnJvbSBvY2N1cnJpbmcgb24gbG9hZC5cclxuICpcclxuICogQHBhcmFtIG5hbWUgTmFtZSBmb3IgdGhlIGFuaW1hdGlvbiBibG9jaywgc3VjaCBhcyBibG9ja0luaXRpYWxBbmltYXRpb25cclxuICogQGV4YW1wbGVcclxuICogXHRgYGB0eXBlc2NyaXB0XHJcbiAqIFx0XHQjIyBDb21wb25lbnQgY2xhc3NcclxuICogXHRcdEBDb21wb25lbnQoe1xyXG4gKiBcdFx0XHRhbmltYXRpb25zOiBbIGdlbmVyYXRlQW5pbWF0aW9uQmxvY2soJ2Jsb2NrSW5pdGlhbEFuaW1hdGlvbicpIF1cclxuICogXHRcdH0pXHJcbiAqIFx0XHRjbGFzcyBNeUNvbXBvbmVudCB7XHJcbiAqIFx0XHRcdC8vIC4uLiBjb21wb25lbnQgaW1wbGVtZW50YXRpb25cclxuICogXHRcdH1cclxuICogXHRcdGBgYFxyXG4gKlxyXG4gKiBcdFx0IyMgQ29tcG9uZW50IHRlbXBsYXRlXHJcbiAqIFx0XHRgYGBcclxuICogXHRcdFx0PG5nLWNvbnRhaW5lciBbQGJsb2NrSW5pdGlhbEFuaW1hdGlvbl0+XHJcbiAqIFx0XHRcdFx0Li4uIGFuaW1hdGVkIHRlbXBsYXRlIGl0ZW1zIC4uLlxyXG4gKiBcdFx0XHQ8L25nLWNvbnRhaW5lcj5cclxuICogXHRcdGBgYFxyXG4gKi9cclxuZXhwb3J0IGxldCBnZW5lcmF0ZUFuaW1hdGlvbkJsb2NrZXIgPSBuYW1lID0+IHRyaWdnZXIobmFtZSwgW1xyXG5cdHRyYW5zaXRpb24oJzplbnRlcicsIFtdKVxyXG5dKVxyXG5cclxuZXhwb3J0IGxldCBibG9ja0luaXRpYWxBbmltYXRpb24gPSBnZW5lcmF0ZUFuaW1hdGlvbkJsb2NrZXIoJ2Jsb2NrSW5pdGlhbEFuaW1hdGlvbicpO1xyXG4iXX0=