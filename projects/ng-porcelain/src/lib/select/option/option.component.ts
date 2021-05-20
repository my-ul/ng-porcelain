import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

export interface IOptionParent {
	click(option: OptionComponent);
	highlight(option: OptionComponent);
}

@Component({
	selector: 'porcelain-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	host: {
		'[class.porcelain-option--is-highlighted]': 'isHighlighted'
	}
})
export class OptionComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	parent: IOptionParent = null;

	setParent(parent: IOptionParent) {
		this.parent = parent;
	}

	isHighlighted: boolean = false;

	@HostListener('mouseover', ['$event'])
	highlight($event: MouseEvent) {
		this.parent.highlight(this);
	}

	@HostListener('click', ['$event'])
	click($event: MouseEvent) {
		this.parent.click(this);
	}
}
