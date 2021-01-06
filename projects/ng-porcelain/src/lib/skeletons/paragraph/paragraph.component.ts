import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'porcelain-skeleton-paragraph, p-skeleton-paragraph',
	templateUrl: './paragraph.component.html',
	styleUrls: ['./paragraph.component.scss']
})
export class SkeletonParagraphComponent {
	@Input() lines = 4;

	get range(): number[] {
		const range = [];
		for (let i = 0; i < this.lines; i++) {
			range.push(i);
		}
		return range;
	}

	constructor() {}
}
