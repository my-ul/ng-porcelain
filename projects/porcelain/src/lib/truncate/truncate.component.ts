import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-truncate',
	templateUrl: './truncate.component.html',
	styleUrls: ['./truncate.component.scss']
})
export class TruncateComponent implements OnInit {
	@Input() value: string;

	constructor() {}

	ngOnInit() {
	}
}
