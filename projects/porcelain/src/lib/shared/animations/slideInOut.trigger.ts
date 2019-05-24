import {
	trigger,
	state,
	style,
	transition,
	group,
	animate,
	query,
	animation
} from '@angular/animations';

const defaultTriggerName = 'slideInOut',
	defaultAnimationDurationMs = 200,
	defaultOpenStyle = {
		height: '*',
		overflow: 'hidden'
	},
	defaultClosedStyle = {
		height: '0',
		overflow: 'hidden'
	};

export const generateSlideInOut = (
	triggerName = defaultTriggerName,
	openStyle = defaultOpenStyle,
	closedStyle = defaultClosedStyle,
	animationDurationMs = defaultAnimationDurationMs
) =>
	trigger(triggerName, [
		state('in', style(openStyle)),
		transition(':leave', [
			style(openStyle),
			group([animate(`${animationDurationMs}ms`, style(closedStyle))])
		]),
		transition(':enter', [
			style(closedStyle),
			group([animate(`${animationDurationMs}ms`, style(openStyle))])
		])
	]);

export const optionsInOut = animation([generateSlideInOut('optionsInOut')]);
