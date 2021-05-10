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
			key: 'kiwi',
			value: 'kiwi'
		},
		{
			label: 'Cherry',
			key: 'cherry',
			value: 'cherry'
		},
		{
			label: 'Watermelon',
			key: 'watermelon',
			value: 'watermelon'
		},
		{
			label: 'Mango',
			key: 'mango',
			value: 'mango'
		}
	];

	activeFruits = [
		{
			label: 'Banana',
			key: 'banana',
			value: 'banana'
		},
		{
			label: 'Apple',
			key: 'apple',
			value: 'apple'
		},
		{
			label: 'Orange',
			key: 'orange',
			value: 'orange'
		}
	];

	constructor() {}

	ngOnInit() {}
}
