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
	@Output() public clearIconClick: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Input string query
	 * */
	@Input() public query: string = '';

	/**
	 * controls whether to show showClearButton
	 * */
	@Input() public showClearButton: boolean = true;

	/**
	 * controls whether to show showClearButton
	 * */
	@Input() public showDropdownButton: boolean = true;

	/**
	 * event to emit input query
	 * */
	@Output() public queryChange: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Input box focus event, needs to be binded separately to hasfocus using viewchild
	 * */

	@Output() public focusState: EventEmitter<boolean> = new EventEmitter<boolean>(false);

	/**
	 *
	 *
	 * This is a separate event handler
	 */

	@Output() public submitHandler: EventEmitter<string> = new EventEmitter<string>();

	public labelClear: string = '';
	public labelSelect: string = '';
	@Input() public placeholder: string = '';
	@Input() public labelPlaceholder: string = '';

	public setFocus(focus: boolean) {
		this.focusState.emit(focus);
	}

	public clearEventHandler() {
		this.clearIconClick.emit('');
	}

	constructor() {}

	ngOnInit(): void {}

	ngOnDestroy(): void {}

	public submit(value: string) {
		this.submitHandler.emit(value);
	}

	public handleUserInput(value: string) {
		this.queryChange.emit(value);
	}
}
