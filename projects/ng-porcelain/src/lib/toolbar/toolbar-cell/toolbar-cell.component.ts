import { Component, OnInit, Input, HostBinding, Host } from '@angular/core';
import { Loggable } from '../../Loggable';

@Component({
	selector: 'porcelain-toolbar-cell',
	templateUrl: './toolbar-cell.component.html',
	styleUrls: ['./toolbar-cell.component.scss']
})
export class ToolbarCellComponent extends Loggable implements OnInit {
	readonly name = 'ToolbarCellComponent';

	_flex = '0 0 auto';

	@HostBinding('style.flex')
	@Input()
	get flex() {
		return this._flex;
	}
	set flex(val: string | number) {
		if (val === 'shrink' || val === 0) {
			this._flex = '0 0 auto';
		} else if (val === 'grow' || val === -1) {
			this._flex = '1 1 auto';
		} else {
			this._flex = val.toString();
		}
	}

	@HostBinding('class.porcelain-toolbar__cell')
	init = true;

	constructor() {
		super();
		this.log('new ToolbarCellComponent()', { arguments });
	}

	ngOnInit() {}
}
