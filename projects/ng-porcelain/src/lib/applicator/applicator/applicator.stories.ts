import { APPLICATOR_DIRECTIVES } from '../applicator.module';
// Storybook
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';

import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';

// Moment
import * as _moment from 'moment';
const moment = _moment;

// Porcelain
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';
import { i18nDateOptions } from '../../shared/utilities/i18n/i18nDateOptions/i18nDateOptions';

import { APPLICATOR_IMPORTS } from '../applicator.module';
import { ApplicatorComponent } from './applicator.component';
import { SimpleOption } from '../../shared/types/Options/SimpleOption';

const simpleRefiner = new SimpleRefinerDefinition({
	slug: 'simpleRefiner',
	title: 'Simple Refiner (all selected)',
	selected: ['al', 'ak', 'az'],
	options: {
		al: 'Alabama',
		ak: 'Alaska',
		az: 'Arizona'
	}
});

const anotherSimpleRefiner = new SimpleRefinerDefinition({
	slug: 'anotherSimpleRefiner',
	title: 'Another Simple Refiner',
	selected: ['al', 'az'],
	options: {
		al: 'Alabama',
		ak: 'Alaska',
		az: 'Arizona'
	}
});

const dateRefiner = new DateRefinerDefinition({
	slug: 'dateRefiner',
	title: 'Date Refiner',
	value: {
		to: moment(new Date())
			.utc()
			.endOf('year')
			.toDate(),
		optionSlug: 'custom',
		from: moment(new Date())
			.utc()
			.startOf('year')
			.toDate()
	},
	options: i18nDateOptions()
});
export default {
	title: 'Refiner System/Applicator',

	decorators: [
		moduleMetadata({
			declarations: APPLICATOR_DIRECTIVES,
			imports: APPLICATOR_IMPORTS
		})
	]
};
//us full options
const UnselectedUStates = {
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

const SomeSelectedFull = {
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

const fulloptionsCompleteNextVersionRefiner = new SimpleRefinerDefinition({
	slug: 'FullUsStateRefiner',
	title: 'Select Any US State',
	options: UnselectedUStates
});

const fulloptionsSemiSelectedVersionRefiner = new SimpleRefinerDefinition({
	slug: 'semiselected',
	title: 'US Selected State Refiners',
	selected: ['OR', 'MT', 'KA', 'IA'],
	options: SomeSelectedFull
});

export const DefaultNoProps = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			refiners: [dateRefiner, simpleRefiner, anotherSimpleRefiner]
		}
	};
};

DefaultNoProps.story = {
	name: 'Default (no props)'
};

export const ProvideDefaultValueBehavior = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			searchPlaceHolderLabel: 'type to search',
			refiners: [simpleRefiner, anotherSimpleRefiner, dateRefiner],
			defaultValues: {
				simpleRefiner: ['al', 'az'],
				anotherSimpleRefiner: ['ak'],
				dateRefiner: {
					optionSlug: 'custom',
					from: '1989-02-14',
					to: '1989-11-06'
				}
			}
		}
	};
};

ProvideDefaultValueBehavior.story = {
	name: 'Provide default value behavior'
};

export const ThrowsErrorsWithInvalidRefinersSeeConsole = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [{}, new Date(), new RegExp('invalid refiner')]
		}
	};
};

ThrowsErrorsWithInvalidRefinersSeeConsole.story = {
	name: 'Throws errors with invalid refiners (see console)'
};

export const SetApplyOnInitToFalse = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [simpleRefiner, dateRefiner, anotherSimpleRefiner],
			applyOnInit: false
		}
	};
};

SetApplyOnInitToFalse.story = {
	name: 'Set applyOnInit to false'
};

export const fulloOtionsRefinerNextVersion = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [
				fulloptionsCompleteNextVersionRefiner,
				dateRefiner,
				fulloptionsSemiSelectedVersionRefiner
			],
			applyOnInit: false,
			searchPlaceHolderLabel: text('searchPlaceHolderLabel', 'type to search in list')
		}
	};
};
