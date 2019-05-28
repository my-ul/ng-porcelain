// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { storiesOf } from '@storybook/angular';
// Porcelain Imports
import {
	DateRefinerDefinition,
	SimpleOption,
	SimpleRefinerDefinition
} from 'projects/ng-porcelain/src/lib/shared';
import { REFINERS_IMPORTS } from '../../../projects/ng-porcelain/src/lib/refiners/refiners.module';
import { RefinersComponent } from '../../../projects/ng-porcelain/src/lib/refiners/refiners/refiners.component';

storiesOf('Refiners Component', module)
	.addDecorator(withKnobs)
	.addDecorator(withNotes)
	.add(
		'Mix and Match refiners by `type` discriminator',
		() => ({
			component: RefinersComponent,
			moduleMetadata: {
				imports: [REFINERS_IMPORTS]
			},
			props: {
				onRefinersChange: action('Refiners change'),
				refiners: [
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
						title: 'Created within...',
						slug: 'createdOn',
						options: null
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
				]
			}
		}),
		{
			notes: { markdown: require('./mix-and-match.md') },
			info: {}
		}
	);
