import { Component } from '@angular/core';
import {
	SimpleRefinerComponent,
	SimpleRadioRefinerComponent,
	SimpleRefinerDefinition,
	DateRefinerDefinition,
	i18nDateOptions,
	SimpleOption
} from '@my-ul/ng-porcelain';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ngPorcelain-src';

	refiners: any[];

	constructor() {
		this.refiners = [
			new SimpleRefinerDefinition({
				title: 'Common Allergies',
				slug: 'allergies',
				options: {
					shellfish: new SimpleOption({
						slug: 'shellfish',
						label: 'Shellfish'
					}),
					nut: new SimpleOption({
						slug: 'nut',
						label: 'Nut'
					}),
					egg: new SimpleOption({
						slug: 'egg',
						label: 'Eggs'
					}),
					dairy: new SimpleOption({
						slug: 'dairy',
						label: 'Dairy'
					}),
					soy: new SimpleOption({ slug: 'soy', label: 'Soy' })
				}
			}),

			new SimpleRefinerDefinition({
				title: 'Order Status',
				slug: 'status',
				options: {
					inProgress: 'In Progress',
					onHold: 'On Hold',
					slipping: 'Slipping'
				}
			}),

			new DateRefinerDefinition({
				title: 'Created on...',
				slug: 'createdOn',
				options: i18nDateOptions()
			}),

			new DateRefinerDefinition({
				title: 'Modified on...',
				slug: 'modifiedOn',
				options: i18nDateOptions()
			}),

			new SimpleRefinerDefinition({
				title: 'Favorite Sports',
				slug: 'favoriteSports',
				options: {
					soccer: 'Soccer',
					basketball: 'Basketball',
					football: 'American Football',
					bowling: 'Bowling',
					tennis: 'Tennis',
					boxing: 'Boxing',
					cycling: 'Cycling',
					karate: 'Karate',
					horsebackRiding: 'Horseback Riding'
				}
			})
		];
	}

	debug(...args: any[]) {
		console.log.apply(this, args);
	}
}
