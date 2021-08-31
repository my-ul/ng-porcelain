import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'p-tableview-list-item-cell',
	templateUrl: './tableview-list-item-cell.component.html',
	styleUrls: ['./tableview-list-item-cell.component.scss']
})
export class TableviewListItemCellComponent implements OnInit {
	@HostBinding('class')
	classes = ['list-item__cell'].join(' ');

	@HostBinding('class.list-item__cell--align-top')
	@Input()
	alignTop: boolean = false;

	@HostBinding('class.list-item__cell--align-bottom')
	@Input()
	alignBottom: boolean = false;

	@HostBinding('class.list-item__cell--pad-all')
	@Input()
	padAll: boolean = false;

	@HostBinding('class.list-item__cell--pad-left')
	@Input()
	padLeft: boolean = false;

	@HostBinding('class.list-item__cell--pad-right')
	@Input()
	padRight: boolean = false;

	@HostBinding('class.list-item__cell--pad-bottom')
	@Input()
	padBottom: boolean = false;

	@HostBinding('class.list-item__cell--pad-top')
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
