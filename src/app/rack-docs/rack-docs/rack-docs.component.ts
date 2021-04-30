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
			key: 'kiwi'
		},
		{
			label: 'Cherry',
			key: 'cherry'
		},
		{
			label: 'Watermelon',
			key: 'watermelon'
		},
		{
			label: 'Mango',
			key: 'mango'
		}
	];

	activeFruits = [
		{
			label: 'Banana',
			key: 'banana'
		},
		{
			label: 'Apple',
			key: 'apple'
		},
		{
			label: 'Orange',
			key: 'orange'
		}
	];

	constructor() {}

	ngOnInit() {}
}
