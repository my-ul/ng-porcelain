// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

// Utilities
import * as _ from 'underscore';
import * as lipsum from 'fast-lorem-ipsum';

// Porcelain
import { SimpleOption } from '../../shared/types/Options/SimpleOption';
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';

// Subject of tests
import { SimpleRefinerComponent } from './simple-refiner.component';
import { SIMPLE_REFINER_IMPORTS } from '../simple-refiner.module';

export const usStatesHash = {
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

export const usStatesFull = {
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

export default {
	title: 'Refiner System/Simple Refiner',
	decorators: [withNotes],

	parameters: {
		info: {
			inline: true
		}
	},

	excludeStories: ['usStatesHash', 'usStatesFull']
};

export const SimpleOptionDictionary = () => ({
	component: SimpleRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_REFINER_IMPORTS
	},
	props: {
		refiner: new SimpleRefinerDefinition({
			slug: 'simple',
			title: 'United States of America (simple definitions)',
			options: usStatesHash
		}),

		onRefinerChange: action('Refiner changed')
	}
});

SimpleOptionDictionary.story = {
	name: 'Simple `Option` dictionary',
	parameters: {}
};

export const FullOptionDefinitions = () => ({
	component: SimpleRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_REFINER_IMPORTS
	},
	props: {
		refiner: new SimpleRefinerDefinition({
			slug: 'simple',
			title: 'United States of America (full definitions; see notes)',
			options: usStatesFull
		}),
		onRefinerChange: action('Refiner changed')
	}
});

FullOptionDefinitions.story = {
	name: 'Full `Option` definitions',
	parameters: {}
};

export const CustomLabels = () => ({
	component: SimpleRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_REFINER_IMPORTS
	},
	props: {
		showMoreLabel: 'Mostrar %u más',
		showLessLabel: 'Muestra menos %u',
		selectAllLabel: 'Seleccionar todo',
		selectNoneLabel: 'Seleccione Ninguno',
		refiner: new SimpleRefinerDefinition({
			slug: 'states',
			title: 'Estados de los EE.UU.',
			options: usStatesFull
		}),
		onRefinerChange: action('Refiner (Custom Labels)')
	}
});

CustomLabels.story = {
	parameters: {}
};

export const SearchScrollButtonTypeRefiner = () => ({
	component: SimpleRefinerComponent,
	moduleMetadata: {
		imports: SIMPLE_REFINER_IMPORTS
	},
	props: {
		refiner: new SimpleRefinerDefinition({
			slug: 'simple',
			title: 'United States of America (simple definitions) with search',
			options: usStatesHash
		}),
		isRefinerButtonDisplay: false,
		onRefinerChange: action('Refiner changed')
	}
});

SearchScrollButtonTypeRefiner.story = {
	name: `refiner with search and scroll`
};
