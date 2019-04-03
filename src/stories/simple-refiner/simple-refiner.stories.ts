// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { storiesOf } from '@storybook/angular';

// Utilities
import * as _ from 'underscore';
import * as lipsum from 'fast-lorem-ipsum';

// Porcelain
import {
	SimpleOption,
	SimpleRefiner
} from '../../../projects/ng-porcelain/src/lib/shared/types';
import { SIMPLE_REFINER_IMPORTS } from '../../../projects/ng-porcelain/src/lib/simple-refiner/simple-refiner.module';
import { SimpleRefinerComponent } from 'projects/ng-porcelain/src/lib/simple-refiner/simple-refiner/simple-refiner.component';

const usStatesHash = {
	AL: 'Alabama',
	AK: 'Alaska',
	AZ: 'Arizona',
	AR: 'Arkansas',
	CA: 'California',
	CO: 'Colorado',
	CT: 'Connecticut',
	DE: 'Delaware',
	DC: 'District Of Columbia',
	FL: 'Florida',
	GA: 'Georgia',
	GU: 'Guam',
	HI: 'Hawaii',
	ID: 'Idaho',
	IL: 'Illinois',
	IN: 'Indiana',
	IA: 'Iowa',
	KS: 'Kansas',
	KY: 'Kentucky',
	LA: 'Louisiana',
	ME: 'Maine',
	MD: 'Maryland',
	MA: 'Massachusetts',
	MI: 'Michigan',
	MN: 'Minnesota',
	MS: 'Mississippi',
	MO: 'Missouri',
	MT: 'Montana',
	NE: 'Nebraska',
	NV: 'Nevada',
	NH: 'New Hampshire',
	NJ: 'New Jersey',
	NM: 'New Mexico',
	NY: 'New York',
	NC: 'North Carolina',
	ND: 'North Dakota',
	OH: 'Ohio',
	OK: 'Oklahoma',
	OR: 'Oregon',
	PA: 'Pennsylvania',
	RI: 'Rhode Island',
	SC: 'South Carolina',
	SD: 'South Dakota',
	TN: 'Tennessee',
	TX: 'Texas',
	UT: 'Utah',
	VT: 'Vermont',
	VA: 'Virginia',
	WA: 'Washington',
	WV: 'West Virginia',
	WI: 'Wisconsin',
	WY: 'Wyoming'
};

let usStatesFull = {
	AL: new SimpleOption({ badge: 4888949, label: 'Alabama', slug: 'AL' }),
	AK: new SimpleOption({ badge: 738068, label: 'Alaska', slug: 'AK' }),
	AZ: new SimpleOption({ badge: 7123898, label: 'Arizona', slug: 'AZ' }),
	AR: new SimpleOption({ badge: 3020327, label: 'Arkansas', slug: 'AR' }),
	CA: new SimpleOption({ badge: 39776830, label: 'California', slug: 'CA' }),
	CO: new SimpleOption({ badge: 5684203, label: 'Colorado', slug: 'CO' }),
	CN: new SimpleOption({ badge: 3588683, label: 'Connecticut', slug: 'CN' }),
	DE: new SimpleOption({ badge: 971180, label: 'Delaware', slug: 'DE' }),
	DC: new SimpleOption({
		badge: 703608,
		label: 'District of Columbia',
		slug: 'DC'
	}),
	FL: new SimpleOption({ badge: 21312211, label: 'Florida', slug: 'FL' }),
	GE: new SimpleOption({ badge: 10545138, label: 'Georgia', slug: 'GE' }),
	HI: new SimpleOption({ badge: 1426393, label: 'Hawaii', slug: 'HI' }),
	ID: new SimpleOption({ badge: 1753860, label: 'Idaho', slug: 'ID' }),
	IL: new SimpleOption({ badge: 12768320, label: 'Illinois', slug: 'IL' }),
	IN: new SimpleOption({ badge: 6699629, label: 'Indiana', slug: 'IN' }),
	IA: new SimpleOption({ badge: 3160553, label: 'Iowa', slug: 'IA' }),
	KA: new SimpleOption({ badge: 2918515, label: 'Kansas', slug: 'KA' }),
	KY: new SimpleOption({ badge: 4472265, label: 'Kentucky', slug: 'KY' }),
	LA: new SimpleOption({ badge: 4682509, label: 'Louisiana', slug: 'LA' }),
	ME: new SimpleOption({ badge: 1341582, label: 'Maine', slug: 'ME' }),
	MD: new SimpleOption({ badge: 6079602, label: 'Maryland', slug: 'MD' }),
	MA: new SimpleOption({ badge: 6895917, label: 'Massachusetts', slug: 'MA' }),
	MI: new SimpleOption({ badge: 9991177, label: 'Michigan', slug: 'MI' }),
	MN: new SimpleOption({ badge: 5628162, label: 'Minnesota', slug: 'MN' }),
	MS: new SimpleOption({ badge: 2982785, label: 'Mississippi', slug: 'MS' }),
	MO: new SimpleOption({ badge: 6135888, label: 'Missouri', slug: 'MO' }),
	MT: new SimpleOption({ badge: 1062330, label: 'Montana', slug: 'MT' }),
	NE: new SimpleOption({ badge: 1932549, label: 'Nebraska', slug: 'NE' }),
	NV: new SimpleOption({ badge: 3056824, label: 'Nevada', slug: 'NV' }),
	NH: new SimpleOption({ badge: 1350575, label: 'New Hampshire', slug: 'NH' }),
	NJ: new SimpleOption({ badge: 9032872, label: 'New Jersey', slug: 'NJ' }),
	NM: new SimpleOption({ badge: 2090708, label: 'New Mexico', slug: 'NM' }),
	NY: new SimpleOption({ badge: 19862512, label: 'New York', slug: 'NY' }),
	NC: new SimpleOption({ badge: 10390149, label: 'North Carolina', slug: 'NC' }),
	ND: new SimpleOption({ badge: 755238, label: 'North Dakota', slug: 'ND' }),
	OH: new SimpleOption({ badge: 11694664, label: 'Ohio', slug: 'OH' }),
	OK: new SimpleOption({ badge: 3940521, label: 'Oklahoma', slug: 'OK' }),
	OR: new SimpleOption({ badge: 4199563, label: 'Oregon', slug: 'OR' }),
	PA: new SimpleOption({ badge: 12823989, label: 'Pennsylvania', slug: 'PA' }),
	RI: new SimpleOption({ badge: 1061712, label: 'Rhode Island', slug: 'RI' }),
	SC: new SimpleOption({ badge: 5088916, label: 'South Carolina', slug: 'SC' }),
	SD: new SimpleOption({ badge: 877790, label: 'South Dakota', slug: 'SD' }),
	TN: new SimpleOption({ badge: 6782564, label: 'Tennessee', slug: 'TN' }),
	TX: new SimpleOption({ badge: 28704330, label: 'Texas', slug: 'TX' }),
	UT: new SimpleOption({ badge: 3159345, label: 'Utah', slug: 'UT' }),
	VT: new SimpleOption({ badge: 623960, label: 'Vermont', slug: 'VT' }),
	VA: new SimpleOption({ badge: 8525660, label: 'Virginia', slug: 'VA' }),
	WA: new SimpleOption({ badge: 7530552, label: 'Washington', slug: 'WA' }),
	WV: new SimpleOption({ badge: 1803077, label: 'West Virginia', slug: 'WV' }),
	WI: new SimpleOption({ badge: 5818049, label: 'Wisconsin', slug: 'WI' }),
	WY: new SimpleOption({ badge: 573720, label: 'Wyoming', slug: 'WY' })
};

storiesOf('Option Refiner Component', module)
	.addDecorator(withNotes)
	.addDecorator(withKnobs)
	.addDecorator(withNotes)
	.addParameters({
		info: {
			inline: true
		}
	})
	.add(
		'Simple `Option` definitions',
		() => ({
			component: SimpleRefinerComponent,
			moduleMetadata: {
				imports: SIMPLE_REFINER_IMPORTS
			},
			props: {
				refiner: new SimpleRefiner({
					slug: 'simple',
					title: 'United States of America (simple definitions)',
					options: usStatesHash
				}),

				onRefinerChange: action('Refiner changed')
			}
		}),
		{
			notes: { markdown: require('./options-definitions.md') }
		}
	)
	.add(
		'Full `Option` definitions',
		() => ({
			component: SimpleRefinerComponent,
			moduleMetadata: {
				imports: SIMPLE_REFINER_IMPORTS
			},
			props: {
				refiner: new SimpleRefiner({
					slug: 'simple',
					title: 'United States of America (full definitions; see notes)',
					options: usStatesFull
				}),
				onRefinerChange: action('Refiner changed')
			}
		}),
		{
			notes: { markdown: require('./options-definitions.md') }
		}
	)
	.add(
		'Custom Labels',
		() => ({
			component: SimpleRefinerComponent,
			moduleMetadata: {
				imports: SIMPLE_REFINER_IMPORTS
			},
			props: {
				showMoreLabel: 'Mostrar %u más',
				showLessLabel: 'Muestra menos %u',
				selectAllLabel: 'Seleccionar todo',
				selectNoneLabel: 'Seleccione Ninguno',
				refiner: new SimpleRefiner({
					slug: 'states',
					title: 'Estados de los EE.UU.',
					options: usStatesFull
				}),
				onRefinerChange: action('Refiner (Custom Labels)')
			}
		}),
		{
			keywords: ['i18n'],
			notes: { markdown: require('./custom-labels.md') }
		}
	);

storiesOf('Option Refiner Component/Badges', module)
	.addDecorator(withNotes)
	.addDecorator(withKnobs)
	.addDecorator(withNotes)
	.add(
		'Options with long `label` values and numeric badges',
		() => ({
			component: SimpleRefinerComponent,
			moduleMetadata: {
				imports: SIMPLE_REFINER_IMPORTS
			},
			props: {
				isOpen: true,
				onRefinerChange: action('Refiner onRefinerChange fired'),
				refiner: new SimpleRefiner({
					slug: 'optionsWithBadges',
					title: 'Options with Badges',
					options: {
						option1: new SimpleOption({
							label: `Option 1. ${lipsum('50w')}`,
							slug: 'option1',
							badge: 1234
						}),
						option2: new SimpleOption({
							label: `Option 2. ${lipsum('50w')}`,
							slug: 'option2',
							badge: 2341
						}),
						option3: new SimpleOption({
							label: `Option 3. ${lipsum('50w')}`,
							slug: 'option3',
							badge: 3412
						}),
						option4: new SimpleOption({
							label: `Option 4. ${lipsum('50w')}`,
							slug: 'option4',
							badge: 4123
						})
					}
				})
			}
		}),
		{
			info: {
				markdown: `Options can have very long labels.  They will be truncated when the line is too long.`
			}
		}
	)
	.add('Text Badges', () => ({
		component: SimpleRefinerComponent,
		moduleMetadata: {
			imports: SIMPLE_REFINER_IMPORTS
		},
		props: {
			isOpen: true,
			onRefinerChange: action('Refiner onRefinerChange fired'),
			refiner: new SimpleRefiner({
				slug: 'optionsWithBadges',
				title: 'Options with Badges',
				options: {
					option1: new SimpleOption({
						label: `Velma D. Talbot`,
						slug: 'option1',
						badge: 'UL'
					}),
					option2: new SimpleOption({
						label: `Anthony Halls`,
						slug: 'option2',
						badge: 'IKEA'
					}),
					option3: new SimpleOption({
						label: `Pam Hastings`,
						slug: 'option3',
						badge: 'IBM'
					}),
					option4: new SimpleOption({
						label: `Latoya Sanders`,
						slug: 'option4',
						badge: 'AT&T'
					})
				}
			})
		}
	}));

storiesOf('Option Refiner Component/showCount', module)
	.addDecorator(withNotes)
	.addDecorator(withKnobs)
	.addDecorator(withNotes)
	.add(
		'Set default shown options by `showCount` component property.',
		() => ({
			component: SimpleRefinerComponent,
			moduleMetadata: {
				imports: SIMPLE_REFINER_IMPORTS
			},
			props: {
				refiner: new SimpleRefiner({
					slug: 'customShowCount',
					title: 'United States (showing 15 on load)',
					options: usStatesHash
				}),
				showCount: 15,
				onRefinerChange: action('Option Refiner change')
			}
		}),
		{
			notes: { markdown: require('./custom-show-count.md') }
		}
	)
	.add(
		'Set default shown options by `showCount` refiner property.',
		() => ({
			component: SimpleRefinerComponent,
			moduleMetadata: {
				imports: SIMPLE_REFINER_IMPORTS
			},
			props: {
				refiner: new SimpleRefiner({
					slug: 'customShowCount',
					title: 'United States (showing 15 on load)',
					options: usStatesHash,
					showCount: 15
				}),
				onRefinerChange: action('Option Refiner change')
			}
		}),
		{
			notes: { markdown: require('./custom-show-count.md') }
		}
	);

storiesOf('Option Refiner Component/selected and isSelected', module)
	.addDecorator(withNotes)
	.addDecorator(withKnobs)
	.addDecorator(withNotes)
	.add('Pre-select with `Refiner.selected`', () => ({
		component: SimpleRefinerComponent,
		moduleMetadata: {
			imports: SIMPLE_REFINER_IMPORTS
		},
		props: {
			onRefinerChange: action('Refiner changed'),
			refiner: new SimpleRefiner({
				slug: 'visitedStates',
				title:
					"States I've Visited (default selections by refiner definition)",
				selected: ['AL', 'AK', 'AZ', 'UT', 'WA', 'MT', 'ID', 'WY', 'IL'],
				options: usStatesFull
			})
		}
	}))
	.add('Pre-select with `option.isSelected`', () => ({
		component: SimpleRefinerComponent,
		moduleMetadata: {
			imports: SIMPLE_REFINER_IMPORTS
		},
		props: {
			onRefinerChange: action('Refiner changed'),
			refiner: new SimpleRefiner({
				slug: 'visitedStates',
				title:
					"States I've Visited (default selections by option.isSelected properties)",
				options: _.mapObject(usStatesFull, state => {
					state.isSelected = _.contains(
						['AL', 'AK', 'AZ', 'UT', 'WA', 'MT', 'ID', 'WY', 'IL'],
						state.slug
					);
					return state;
				})
			})
		}
	}));

storiesOf('Option Refiner Component/isOpen', module)
	.addDecorator(withNotes)
	.addDecorator(withKnobs)
	.addDecorator(withNotes)
	.add('Close with `component.isOpen` property', () => ({
		component: SimpleRefinerComponent,
		moduleMetadata: {
			imports: SIMPLE_REFINER_IMPORTS
		},
		props: {
			isOpen: false,
			onRefinerChange: action('Refiner changed'),
			refiner: new SimpleRefiner({
				slug: 'closedByDefault',
				title: 'Closed by component.isOpen property (click to open)',
				options: usStatesFull
			})
		}
	}))
	.add('Close with `OptionRefiner.isOpen` property', () => ({
		component: SimpleRefinerComponent,
		moduleMetadata: {
			imports: SIMPLE_REFINER_IMPORTS
		},
		props: {
			onRefinerChange: action('Refiner changed'),
			refiner: new SimpleRefiner({
				slug: 'closedByDefault',
				title: 'Closed by refiner.isOpen property (click to open)',
				options: usStatesFull,
				isOpen: false
			})
		}
	}));
