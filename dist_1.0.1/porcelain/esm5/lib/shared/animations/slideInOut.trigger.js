/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, state, style, transition, group, animate, animation } from '@angular/animations';
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
export var generateSlideInOut = (/**
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
export var optionsInOut = animation([generateSlideInOut('optionsInOut')]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVJbk91dC50cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcG9yY2VsYWluLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9hbmltYXRpb25zL3NsaWRlSW5PdXQudHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNOLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixLQUFLLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxNQUFNLHFCQUFxQixDQUFDOztJQUV2QixrQkFBa0IsR0FBRyxZQUFZOztJQUN0QywwQkFBMEIsR0FBRyxHQUFHOztJQUNoQyxnQkFBZ0IsR0FBRztJQUNsQixNQUFNLEVBQUUsR0FBRztJQUNYLFFBQVEsRUFBRSxRQUFRO0NBQ2xCOztJQUNELGtCQUFrQixHQUFHO0lBQ3BCLE1BQU0sRUFBRSxHQUFHO0lBQ1gsUUFBUSxFQUFFLFFBQVE7Q0FDbEI7O0FBRUYsTUFBTSxLQUFPLGtCQUFrQjs7Ozs7OztBQUFHLFVBQ2pDLFdBQWdDLEVBQ2hDLFNBQTRCLEVBQzVCLFdBQWdDLEVBQ2hDLG1CQUFnRDtJQUhoRCw0QkFBQSxFQUFBLGdDQUFnQztJQUNoQywwQkFBQSxFQUFBLDRCQUE0QjtJQUM1Qiw0QkFBQSxFQUFBLGdDQUFnQztJQUNoQyxvQ0FBQSxFQUFBLGdEQUFnRDtJQUVoRCxPQUFBLE9BQU8sQ0FBQyxXQUFXLEVBQUU7UUFDcEIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsVUFBVSxDQUFDLFFBQVEsRUFBRTtZQUNwQixLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ2hCLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBSSxtQkFBbUIsT0FBSSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEUsQ0FBQztRQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNsQixLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUksbUJBQW1CLE9BQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlELENBQUM7S0FDRixDQUFDO0FBVkYsQ0FVRSxDQUFBOztBQUVILE1BQU0sS0FBTyxZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0dHJpZ2dlcixcclxuXHRzdGF0ZSxcclxuXHRzdHlsZSxcclxuXHR0cmFuc2l0aW9uLFxyXG5cdGdyb3VwLFxyXG5cdGFuaW1hdGUsXHJcblx0cXVlcnksXHJcblx0YW5pbWF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG5jb25zdCBkZWZhdWx0VHJpZ2dlck5hbWUgPSAnc2xpZGVJbk91dCcsXHJcblx0ZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uTXMgPSAyMDAsXHJcblx0ZGVmYXVsdE9wZW5TdHlsZSA9IHtcclxuXHRcdGhlaWdodDogJyonLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nXHJcblx0fSxcclxuXHRkZWZhdWx0Q2xvc2VkU3R5bGUgPSB7XHJcblx0XHRoZWlnaHQ6ICcwJyxcclxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJ1xyXG5cdH07XHJcblxyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTbGlkZUluT3V0ID0gKFxyXG5cdHRyaWdnZXJOYW1lID0gZGVmYXVsdFRyaWdnZXJOYW1lLFxyXG5cdG9wZW5TdHlsZSA9IGRlZmF1bHRPcGVuU3R5bGUsXHJcblx0Y2xvc2VkU3R5bGUgPSBkZWZhdWx0Q2xvc2VkU3R5bGUsXHJcblx0YW5pbWF0aW9uRHVyYXRpb25NcyA9IGRlZmF1bHRBbmltYXRpb25EdXJhdGlvbk1zXHJcbikgPT5cclxuXHR0cmlnZ2VyKHRyaWdnZXJOYW1lLCBbXHJcblx0XHRzdGF0ZSgnaW4nLCBzdHlsZShvcGVuU3R5bGUpKSxcclxuXHRcdHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuXHRcdFx0c3R5bGUob3BlblN0eWxlKSxcclxuXHRcdFx0Z3JvdXAoW2FuaW1hdGUoYCR7YW5pbWF0aW9uRHVyYXRpb25Nc31tc2AsIHN0eWxlKGNsb3NlZFN0eWxlKSldKVxyXG5cdFx0XSksXHJcblx0XHR0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcblx0XHRcdHN0eWxlKGNsb3NlZFN0eWxlKSxcclxuXHRcdFx0Z3JvdXAoW2FuaW1hdGUoYCR7YW5pbWF0aW9uRHVyYXRpb25Nc31tc2AsIHN0eWxlKG9wZW5TdHlsZSkpXSlcclxuXHRcdF0pXHJcblx0XSk7XHJcblxyXG5leHBvcnQgY29uc3Qgb3B0aW9uc0luT3V0ID0gYW5pbWF0aW9uKFtnZW5lcmF0ZVNsaWRlSW5PdXQoJ29wdGlvbnNJbk91dCcpXSk7XHJcbiJdfQ==