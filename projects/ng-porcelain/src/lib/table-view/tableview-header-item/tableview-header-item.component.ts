import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'tableview-header-item',
	templateUrl: './tableview-header-item.component.html',
	styleUrls: ['./tableview-header-item.component.scss']
})
export class TableviewHeaderItemComponent implements OnInit {
	@HostBinding('class')
	classes = ['list-header__cell'].join(' ');

	@HostBinding('class.list-header__cell--pad-all')
	@Input()
	padAll: boolean = false;

	@HostBinding('class.list-header__cell--pad-left')
	@Input()
	padLeft: boolean = false;

	@HostBinding('class.list-header__cell--pad-right')
	@Input()
	padRight: boolean = false;

	@HostBinding('class.list-header__cell--pad-bottom')
	@Input()
	padBottom: boolean = false;

	@HostBinding('class.list-header__cell--pad-top')
	@Input()
	padTop: boolean = false;

	private _width: number = 1 / 1;

	@Input('width')
	get width(): number {
		return this._width;
	}
	set width(width: number) {
		this._width = width;
	}

	@HostBinding('style.width')
	get widthStyle(): string {
		return `${this.width * 100}%`;
	}
	constructor() {}

	ngOnInit(): void {}
}
