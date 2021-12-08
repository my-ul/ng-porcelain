import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Loggable } from '../../Loggable';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, group, animate } from '@angular/animations';

export type ExpandoIconPosition = 'before' | 'after';

const expandoRestrictInitialAnimation = trigger('restrictInitialAnimation', [transition(':enter', [])]);

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
		'[class.expando--closed]': '!isOpen',
		'[class.expando--disabled]': '!isOpen && isDisabled && toDisable'
	},
	animations: [expandoRestrictInitialAnimation, expandoSlideInOut]
})
export class ExpandoComponent extends Loggable implements OnInit {
	readonly name = 'ExpandoComponent';

	@Input() title: string = '';

	@Input() iconPosition: ExpandoIconPosition = 'after';

	@Input() icon: any = faCaretDown;

	@Input() isDisabled: boolean;
	@Input() toDisable: boolean = false; /*Sets the toDisable flag to disable refiners in required apps*/

	private _isOpen: boolean;

	@Input()
	get isOpen(): boolean {
		return this._isOpen;
	}

	set isOpen(isOpen: boolean) {
		if (this.toDisable && this.isDisabled) {
			this._isOpen = !this.isDisabled;
		} else {
			this._isOpen = isOpen;
		}

		this.isOpenChange.emit(this._isOpen);
	}

	@Output()
	public isOpenChange: EventEmitter<boolean> = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit(): void {}

	toggle(event) {
		this.debug(`Toggling isOpen ${this.isOpen} => ${!this.isOpen}`);
		this.isOpen = !this.isOpen;
	}
}
