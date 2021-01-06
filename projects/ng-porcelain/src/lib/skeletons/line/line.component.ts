import { Component, OnInit, ElementRef, Input } from '@angular/core';

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
	selector: 'porcelain-skeleton-line, p-skeleton-line',
	templateUrl: './line.component.html',
	styleUrls: ['./line.component.scss']
})
export class SkeletonLineComponent implements OnInit {
	constructor(public host: ElementRef<HTMLDivElement>) {}

	wordLengths: number[] = [];

	@Input() minLength: number = 7;

	@Input() maxLength: number = 13;

	ngOnInit(): void {
		let budgetPx = this.host.nativeElement.clientWidth;
		let emWidthPx = parseFloat(getComputedStyle(this.host.nativeElement).fontSize) || 14;

		while (budgetPx > 0) {
			let wordsCount = this.wordLengths.length;

			let wordLength = getRandomInt(this.minLength, this.maxLength);
			let wordPx = wordLength * emWidthPx;
			let gapPx = wordsCount === 0 ? 0 : emWidthPx;
			let proposedWidth = wordPx + gapPx;
			if (budgetPx > proposedWidth) {
				this.wordLengths.push(wordLength);
				budgetPx -= proposedWidth;
			} else {
				budgetPx = 0;
			}
		}
	}
}
