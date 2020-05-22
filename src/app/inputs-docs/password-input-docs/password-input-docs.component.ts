import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-password-input-docs',
	templateUrl: './password-input-docs.component.html',
	styleUrls: ['./password-input-docs.component.scss']
})
export class PasswordInputDocsComponent implements OnInit {
	passwordValue: string = '';

	constructor() {}

	ngOnInit() {}
}
