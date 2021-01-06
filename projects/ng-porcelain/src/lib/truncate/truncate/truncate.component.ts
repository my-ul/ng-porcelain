import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'porcelain-truncate, p-truncate',
	templateUrl: './truncate.component.html',
	styleUrls: ['./truncate.component.scss']
})
export class TruncateComponent implements OnInit {
	@Input() value: string;

	constructor() {}

	ngOnInit() {}
}
