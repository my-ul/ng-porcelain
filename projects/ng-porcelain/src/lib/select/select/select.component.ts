import {
	Component,
	OnInit,
	ContentChildren,
	QueryList,
	AfterViewInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { OptionComponent, IOptionParent } from '../option/option.component';

@Component({
	selector: 'porcelain-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements IOptionParent, OnInit, AfterViewInit {
	// #region Properties

	@ContentChildren(OptionComponent, { descendants: true }) options: QueryList<OptionComponent>;
	@Input() query: string = '';
	@Input() search: boolean = false;

	_highlightedIdx: number = -1;
	isOpen: boolean = false;

	// #endregion

	// #region Constructors

	constructor() {}

	// #endregion

	// #region Public Accessors

	get highlightedIdx(): number {
		return this._highlightedIdx;
	}

	set highlightedIdx(highlightedIdx: number) {
		this._highlightedIdx = highlightedIdx;
		this.options
			.toArray()
			// update all of the options to show the proper highlighted state.
			.forEach((option, optionIdx) => (option.isHighlighted = highlightedIdx === optionIdx));
	}

	// #endregion

	// #region Public Methods

	click(option: OptionComponent) {
		let optionIdx = this.options.toArray().indexOf(option);
		console.log('a child option has been clicked', { option, optionIdx });
	}

	highlight(option: OptionComponent) {
		let optionIdx = this.options.toArray().indexOf(option);
		this.highlightedIdx = optionIdx;
	}

	ngAfterViewInit(): void {
		this.options.changes.subscribe(changes => console.log('options changes observed', { changes }));
		this.options.forEach(option => {
			option.setParent(this);
		});
	}

	ngOnInit(): void {}

	setFocus(focus: boolean) {}

	setOpen(isOpen: boolean): this {
		this.isOpen = isOpen;
		return this;
	}

	// #endregion
}
