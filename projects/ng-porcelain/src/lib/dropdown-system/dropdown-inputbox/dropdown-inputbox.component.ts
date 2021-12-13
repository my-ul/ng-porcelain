import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { faChevronDown, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'porcelain-dropdown-inputbox',
	templateUrl: './dropdown-inputbox.component.html',
	styleUrls: ['./dropdown-inputbox.component.scss']
})
export class DropdownInputboxComponent implements OnInit, OnDestroy {
	/**
	 * Icon of chevron pointing down, used for the dropdown toggle.
	 */
	@Input() public dropdownToggleIcon = faChevronDown;

	/**
	 * Icon for the clear button
	 */
	@Input() public clearIcon = faTimesCircle;

	/**
	 * Color for the clear icon.  By default, #9dacba
	 */
	@Input() public clearIconColor: string = '#9dacba';

	/**
	 * event emitter to detech clear icon click
	 * */
	@Output() public clearIconClick: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**
	 * Input string query
	 * */
	@Input() public query: string = '';

	/**
	 * event to emit input query
	 * */
	@Output() public queryChange: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Input box focus event
	 * */

	@Output() public focusState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

	public setFocus(focus: boolean) {
		this.focusState.next(focus);
	}

	constructor() {}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.focusState.unsubscribe();
	}
}
