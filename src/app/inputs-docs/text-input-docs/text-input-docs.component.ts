import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-text-input-docs',
	templateUrl: './text-input-docs.component.html',
	styleUrls: ['./text-input-docs.component.scss']
})
export class TextInputDocsComponent implements OnInit {
	textValue: string = '';

	constructor() {}

	ngOnInit() {}
}
