/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { trigger, state, style, transition, group, animate, animation } from '@angular/animations';
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
export const generateSlideInOut = (/**
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
export const optionsInOut = animation([generateSlideInOut('optionsInOut')]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVJbk91dC50cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcG9yY2VsYWluLyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9hbmltYXRpb25zL3NsaWRlSW5PdXQudHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNOLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixLQUFLLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxNQUFNLHFCQUFxQixDQUFDOztNQUV2QixrQkFBa0IsR0FBRyxZQUFZOztNQUN0QywwQkFBMEIsR0FBRyxHQUFHOztNQUNoQyxnQkFBZ0IsR0FBRztJQUNsQixNQUFNLEVBQUUsR0FBRztJQUNYLFFBQVEsRUFBRSxRQUFRO0NBQ2xCOztNQUNELGtCQUFrQixHQUFHO0lBQ3BCLE1BQU0sRUFBRSxHQUFHO0lBQ1gsUUFBUSxFQUFFLFFBQVE7Q0FDbEI7O0FBRUYsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7OztBQUFHLENBQ2pDLFdBQVcsR0FBRyxrQkFBa0IsRUFDaEMsU0FBUyxHQUFHLGdCQUFnQixFQUM1QixXQUFXLEdBQUcsa0JBQWtCLEVBQ2hDLG1CQUFtQixHQUFHLDBCQUEwQixFQUMvQyxFQUFFLENBQ0gsT0FBTyxDQUFDLFdBQVcsRUFBRTtJQUNwQixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixVQUFVLENBQUMsUUFBUSxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDaEIsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hFLENBQUM7SUFDRixVQUFVLENBQUMsUUFBUSxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDbEIsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlELENBQUM7Q0FDRixDQUFDLENBQUE7O0FBRUgsTUFBTSxPQUFPLFlBQVksR0FBRyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuXHR0cmlnZ2VyLFxyXG5cdHN0YXRlLFxyXG5cdHN0eWxlLFxyXG5cdHRyYW5zaXRpb24sXHJcblx0Z3JvdXAsXHJcblx0YW5pbWF0ZSxcclxuXHRxdWVyeSxcclxuXHRhbmltYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmNvbnN0IGRlZmF1bHRUcmlnZ2VyTmFtZSA9ICdzbGlkZUluT3V0JyxcclxuXHRkZWZhdWx0QW5pbWF0aW9uRHVyYXRpb25NcyA9IDIwMCxcclxuXHRkZWZhdWx0T3BlblN0eWxlID0ge1xyXG5cdFx0aGVpZ2h0OiAnKicsXHJcblx0XHRvdmVyZmxvdzogJ2hpZGRlbidcclxuXHR9LFxyXG5cdGRlZmF1bHRDbG9zZWRTdHlsZSA9IHtcclxuXHRcdGhlaWdodDogJzAnLFxyXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nXHJcblx0fTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVNsaWRlSW5PdXQgPSAoXHJcblx0dHJpZ2dlck5hbWUgPSBkZWZhdWx0VHJpZ2dlck5hbWUsXHJcblx0b3BlblN0eWxlID0gZGVmYXVsdE9wZW5TdHlsZSxcclxuXHRjbG9zZWRTdHlsZSA9IGRlZmF1bHRDbG9zZWRTdHlsZSxcclxuXHRhbmltYXRpb25EdXJhdGlvbk1zID0gZGVmYXVsdEFuaW1hdGlvbkR1cmF0aW9uTXNcclxuKSA9PlxyXG5cdHRyaWdnZXIodHJpZ2dlck5hbWUsIFtcclxuXHRcdHN0YXRlKCdpbicsIHN0eWxlKG9wZW5TdHlsZSkpLFxyXG5cdFx0dHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG5cdFx0XHRzdHlsZShvcGVuU3R5bGUpLFxyXG5cdFx0XHRncm91cChbYW5pbWF0ZShgJHthbmltYXRpb25EdXJhdGlvbk1zfW1zYCwgc3R5bGUoY2xvc2VkU3R5bGUpKV0pXHJcblx0XHRdKSxcclxuXHRcdHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuXHRcdFx0c3R5bGUoY2xvc2VkU3R5bGUpLFxyXG5cdFx0XHRncm91cChbYW5pbWF0ZShgJHthbmltYXRpb25EdXJhdGlvbk1zfW1zYCwgc3R5bGUob3BlblN0eWxlKSldKVxyXG5cdFx0XSlcclxuXHRdKTtcclxuXHJcbmV4cG9ydCBjb25zdCBvcHRpb25zSW5PdXQgPSBhbmltYXRpb24oW2dlbmVyYXRlU2xpZGVJbk91dCgnb3B0aW9uc0luT3V0JyldKTtcclxuIl19