import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-rack-docs',
	templateUrl: './rack-docs.component.html',
	styleUrls: ['./rack-docs.component.scss']
})
export class RackDocsComponent implements OnInit {
	inactiveFruits = [
		{
			label: 'Kiwi',
			value: 'kiwi',
			locked: true
		},
		{
			label: 'Cherry',
			value: 'cherry'
		},
		{
			label: 'Watermelon',
			value: 'watermelon'
		},
		{
			label: 'Mango',
			value: 'mango'
		}
	];

	activeFruits = [
		{
			label: 'Banana',
			value: 'banana'
		},
		{
			label: 'Apple',
			value: 'apple',
			locked: true
		},
		{
			label: 'Orange',
			value: 'orange'
		}
	];

	constructor() {}

	ngOnInit() {}
}
