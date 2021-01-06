import { Component, OnInit, Input } from '@angular/core';
import { Loggable } from '../../Loggable';

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

@Component({
	selector: 'porcelain-skeleton-word, p-skeleton-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	host: {
		'[style.width.em]': 'characters'
	}
})
export class SkeletonWordComponent extends Loggable implements OnInit {
	readonly name = 'WordComponent';

	@Input() characters: number;

	constructor() {
		super();
	}

	ngOnInit(): void {
		if (!this.characters) {
			this.characters = 2 + getRandomInt(7);
		}
	}
}
