import { Component, OnInit, Input } from '@angular/core';
import { Loggable } from '../../Loggable';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, group, animate } from '@angular/animations';

export type ExpandoIconPosition = 'before' | 'after';

const expandoSlideInOut = trigger('slideInOut', [
	state('in', style({ height: '*' })),
	transition(':leave', [style({ height: '*' }), group([animate(300, style({ height: '0px' }))])]),
	transition(':enter', [style({ height: '0px' }), group([animate(300, style({ height: '*' }))])])
]);

@Component({
	selector: 'porcelain-expando, p-expando',
	templateUrl: './expando.component.html',
	styleUrls: ['./expando.component.scss'],
	host: {
		'[class.expando--open]': 'isOpen',
		'[class.expando--closed]': '!isOpen'
	},
	animations: [expandoSlideInOut]
})
export class ExpandoComponent extends Loggable implements OnInit {
	readonly name = 'ExpandoComponent';

	@Input() title: string = '';

	@Input() iconPosition: ExpandoIconPosition = 'after';

	@Input() icon: any = faCaretDown;

	@Input() isOpen: boolean = true;

	constructor() {
		super();
	}

	ngOnInit(): void {}

	toggle(event) {
		this.debug(`Toggling isOpen ${this.isOpen} => ${!this.isOpen}`);
		this.isOpen = !this.isOpen;
	}
}
