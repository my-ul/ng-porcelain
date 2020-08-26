// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { RefinersComponent } from './refiners.component';
import { REFINERS_IMPORTS } from '../refiners.module';
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { SimpleOption } from '../../shared/types/Options/SimpleOption';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';
import { i18nDateOptions } from '../../shared/utilities/i18n/i18nDateOptions/i18nDateOptions';

export default {
	title: 'Refiner System/Multi-Refiner',
	decorators: [withKnobs, withNotes]
};

export const MixAndMatchRefinersByTypeDiscriminator = () => {
	return {
		component: RefinersComponent,
		moduleMetadata: {
			imports: [REFINERS_IMPORTS]
		},
		props: {
			onRefinersChange: action('Refiners change'),
			allowIncompleteEmit: false,
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
			]
		}
	};
};

MixAndMatchRefinersByTypeDiscriminator.story = {
	name: 'Mix and Match refiners by `type` discriminator',
	parameters: {}
};
