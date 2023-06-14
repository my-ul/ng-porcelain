import { APPLICATOR_DIRECTIVES } from '../applicator.module';
// Storybook
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';

// Porcelain
import { SimpleRefinerDefinition } from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { DateRefinerDefinition } from '../../shared/types/Refiners/DateRefinerDefinition';
import { i18nDateOptions } from '../../shared/utilities/i18n/i18nDateOptions/i18nDateOptions';

import { APPLICATOR_IMPORTS } from '../applicator.module';
import { ApplicatorComponent } from './applicator.component';
import { toSimpleOptionDictionary } from '../../shared/utilities/toSimpleOptionDictionary';
import {
	usStatesFull,
	usStatesRadioFull
} from '../../simple-refiner/simple-refiner/simple-refiner.stories';
import { DateTime } from 'luxon';
import { SimpleOption } from '../../shared/types/Options/SimpleOption';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const vegetables = {
	tomato: new SimpleOption({ badge: 15, label: 'tomato', slug: 'tomato' }),
	potatoes: new SimpleOption({ badge: 20, label: 'potatoes', slug: 'potatoes' }),
	onion: new SimpleOption({ badge: 30, label: 'onion', slug: 'onion' }),
	peas: new SimpleOption({ badge: 45, label: 'peas', slug: 'peas' }),
	cabbage: new SimpleOption({ badge: 7, label: 'cabbage', slug: 'cabbage' }),
	beetroot: new SimpleOption({ badge: 17, label: 'beetroot', slug: 'beetroot' }),
	spinach: new SimpleOption({ badge: 5, label: 'spinach', slug: 'spinach' }),
	carrot: new SimpleOption({ badge: 5, label: 'carrot', slug: 'carrot' })
};

const fruits = {
	apple: new SimpleOption({ badge: 25, label: 'apple', slug: 'apple' }),
	mango: new SimpleOption({ badge: 12, label: 'mango', slug: 'mango' }),
	grapes: new SimpleOption({ badge: 13, label: 'grapes', slug: 'grapes' }),
	fig: new SimpleOption({ badge: 35, label: 'fig', slug: 'fig' }),
	banana: new SimpleOption({ badge: 27, label: 'banana', slug: 'banana' }),
	watermelon: new SimpleOption({ badge: 11, label: 'watermelon', slug: 'watermelon' }),
	orange: new SimpleOption({ badge: 8, label: 'orange', slug: 'orange' }),
	apricot: new SimpleOption({ badge: 9, label: 'apricot', slug: 'apricot' })
};

const vegetablesRefinersDefaultSelected = new SimpleRefinerDefinition({
	slug: 'vegetables',
	title: 'Vegetables Default Enabled',
	type: 'simple',
	preSelectedValues: ['tomato', 'potatoes'],
	options: vegetables
});

const fruitsRefinersDefaultSelected = new SimpleRefinerDefinition({
	slug: 'fruits',
	title: 'Vegetables Default Enabled',
	type: 'search',
	preSelectedValues: ['apple', 'mango'],
	options: fruits
});

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
	type: 'search',
	selected: ['al', 'az'],
	options: toSimpleOptionDictionary({
		al: 'Alabama',
		ak: 'Alaska',
		az: 'Arizona'
	})
});

const usStatesFullrefiner = {
	AL: new SimpleOption({ badge: 4888949, label: 'Alabama', slug: 'AL', isSelected: true }),
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

const ReportsOptions = {
	DES: new SimpleOption({ badge: 4888949, label: 'Description', slug: 'DES' }),
	DNA: new SimpleOption({ badge: 738068, label: 'Description DNA', slug: 'DNA' }),
	IP: new SimpleOption({ badge: 7123898, label: 'Description IP', slug: 'IP' }),
	IPM: new SimpleOption({ badge: 3020321, label: 'Description IPM', slug: 'IPM' }),
	IPT: new SimpleOption({ badge: 3020322, label: 'Description IPT', slug: 'IPT' }),
	IR: new SimpleOption({ badge: 3020323, label: 'Description IR', slug: 'IR' }),
	UL: new SimpleOption({ badge: 3020324, label: 'Description UL', slug: 'UL' }),
	ML: new SimpleOption({ badge: 3020325, label: 'ML Correlation Sheet', slug: 'ML' })
};
const TestRecordsOptions = {
	TR: new SimpleOption({ badge: 4888949, label: 'Test Record', slug: 'TR' }),
	TRDNA: new SimpleOption({ badge: 738068, label: 'Test Record DNA', slug: 'TRDNA' })
};
const CertificatesofComplianceOptions = {
	CC: new SimpleOption({ badge: 4888949, label: 'Certificate of Compliance', slug: 'CC' }),
	MLCC: new SimpleOption({ badge: 738068, label: 'ML Certificate of Compliance ', slug: 'MLCC' })
};

const collpase = {
	CR1: new SimpleRefinerDefinition({
		slug: 'Reports',
		title: 'Reports',
		tooltipText: 'This grouping includes Descriptions and Reports',
		badge: 8,
		isOpen: false,
		options: ReportsOptions,
		selected: ['DES', 'DNA']
	}),
	CR2: new SimpleRefinerDefinition({
		slug: 'Test Records',
		title: 'Test Records',
		badge: 2,
		isOpen: false,
		options: TestRecordsOptions
	}),
	CR3: new SimpleRefinerDefinition({
		slug: 'Certificates of Compliance',
		title: 'Certificates of Compliance',
		badge: 5,
		isOpen: false,
		options: CertificatesofComplianceOptions
	})
};

const collapserefiner = {
	refiner: new SimpleRefinerDefinition({
		slug: 'states',
		title: 'Estados de los EE.UU.',
		options: usStatesFullrefiner
	}),
	collapse: new SimpleRefinerDefinition({
		slug: 'Most commonly used',
		title: 'Most commonly used',
		options: collpase
	})
};

const CollapsableRefiner = new SimpleRefinerDefinition({
	slug: 'collapserefiner',
	title: 'Collapsable Refiner',
	type: 'collapse',
	options: collapserefiner,
	selected: [
		'CR1',
		'CR2',
		'CR3',
		'DES',
		'DNA',
		'IP',
		'IPM',
		'IPT',
		'IR',
		'UL',
		'ML',
		'TR',
		'TRDNA',
		'CC',
		'MLCC'
	],
	preSelectedValues: [
		'CR1',
		'CR2',
		'CR3',
		'DES',
		'DNA',
		'IP',
		'IPM',
		'IPT',
		'IR',
		'UL',
		'ML',
		'TR',
		'TRDNA',
		'CC',
		'MLCC'
	]
});

const searchRefinerStates = new SimpleRefinerDefinition({
	slug: 'searchRefinerStates',
	title: 'search Refiner States',
	type: 'search',
	options: usStatesFull
});
const searchRadioRefinerStates = new SimpleRefinerDefinition({
	slug: 'searchRadioRefinerStates',
	title: 'Select view',
	type: 'radio',
	options: usStatesRadioFull,
	selected: ['AL']
});

const searchRefinerSecondStates = new SimpleRefinerDefinition({
	slug: 'searchRefinerStatesSecond',
	title: 'search Refiner States second Rack',
	type: 'search',

	options: usStatesFull
});

const dateRefiner = new DateRefinerDefinition({
	enableCustomDateRange: false,
	slug: 'dateRefiner',
	title: 'Date Refiner',
	value: {
		from: DateTime.utc()
			.startOf('year')
			.toJSDate(),
		to: DateTime.utc()
			.endOf('year')
			.toJSDate(),
		optionSlug: 'custom'
	},
	options: i18nDateOptions()
});

const anotherDateRefiner = new DateRefinerDefinition({
	enableCustomDateRange: false,
	slug: 'anotherDateRefiner',
	title: 'another DateRefiner',
	value: {
		from: DateTime.utc()
			.startOf('year')
			.toJSDate(),
		to: DateTime.utc()
			.endOf('year')
			.toJSDate(),
		optionSlug: 'custom'
	},
	options: i18nDateOptions()
});

const customDateRefiner = new DateRefinerDefinition({
	enableCustomDateRange: false,
	slug: 'customDateRefiner',
	title: 'custom DateRefiner',
	value: {
		from: DateTime.utc()
			.startOf('year')
			.toJSDate(),
		to: DateTime.utc()
			.endOf('year')
			.toJSDate(),
		optionSlug: 'custom'
	},
	options: i18nDateOptions()
});

export default {
	title: 'Refiner System/Applicator',

	decorators: [
		moduleMetadata({
			declarations: APPLICATOR_DIRECTIVES,
			imports: [BrowserAnimationsModule, ...APPLICATOR_IMPORTS]
		})
	]
};

export const DefaultNoProps = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			onReset: action('Applicators reset'),
			refiners: [dateRefiner, simpleRefiner, anotherSimpleRefiner, CollapsableRefiner]
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

export const SearchRefinerStack = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			refiners: [searchRefinerStates, searchRefinerSecondStates, searchRadioRefinerStates]
		}
	};
};

SearchRefinerStack.story = {
	name: 'search refiner stack'
};

export const ProvideCustomDateRange = () => {
	return {
		component: ApplicatorComponent,
		props: {
			enableCustomDateRange: true,
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			refiners: [dateRefiner, simpleRefiner, searchRefinerStates],
			defaultValues: {
				dateRefiner: {
					optionSlug: 'custom'
				}
			}
		}
	};
};

ProvideCustomDateRange.story = {
	name: 'Provide custom date range'
};

export const defaultSelectedOptions = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [vegetablesRefinersDefaultSelected, fruitsRefinersDefaultSelected]
		}
	};
};

defaultSelectedOptions.story = {
	name: 'Options Selected By Default On Reset'
};

export const selectedOptionsOnInitialLoad = () => {
	return {
		component: ApplicatorComponent,
		props: {
			onApply: action('Applicators update'),
			refiners: [
				new SimpleRefinerDefinition({
					slug: 'vegetables',
					title: 'Vegetables Default Enabled',
					type: 'simple',
					selected: ['tomato', 'potatoes'],
					options: vegetables
				}),
				new SimpleRefinerDefinition({
					slug: 'fruits',
					title: 'Vegetables Default Enabled',
					type: 'search',
					selected: ['apple', 'mango'],
					options: fruits
				})
			]
		}
	};
};

selectedOptionsOnInitialLoad.story = {
	name: 'Options Selected By Default On Inital Load'
};

export const multipleDateRefinersInputValidation = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			onReset: action('Applicators reset'),
			refiners: [
				dateRefiner,
				simpleRefiner,
				anotherSimpleRefiner,
				anotherDateRefiner,
				customDateRefiner
			]
		}
	};
};

multipleDateRefinersInputValidation.story = {
	name: 'multiple Date Refiners Input Validation'
};

// Collapse refiner with No Most commonly Used
const collapserefinernocommon = {
	refiner: new SimpleRefinerDefinition({
		slug: 'states',
		title: 'Estados de los EE.UU.',
		options: usStatesFullrefiner
	}),
	collapse: new SimpleRefinerDefinition({
		slug: 'Collapse Refiner',
		title: 'Collapse Refiner',
		options: {}
	})
};

const CollapsableRefinerNoCommon = new SimpleRefinerDefinition({
	slug: 'collapserefiner',
	title: 'Collapsable Refiner',
	type: 'collapse',
	options: collapserefinernocommon
});

export const CollapseRefinerWithNoCommonlyUsed = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			onReset: action('Applicators reset'),
			refiners: [CollapsableRefinerNoCommon]
		}
	};
};

CollapseRefinerWithNoCommonlyUsed.story = {
	name: 'Collapse Refiner With No Commonly Used'
};

//Collapse Refiner with only commonly used
const collapserefinernoothers = {
	refiner: new SimpleRefinerDefinition({
		slug: 'states',
		title: 'Estados de los EE.UU.',
		options: {}
	}),
	collapse: new SimpleRefinerDefinition({
		slug: 'Collapse Refiner',
		title: 'Collapse Refiner',
		options: collpase
	})
};

const CollapsableRefinerNoOthers = new SimpleRefinerDefinition({
	slug: 'collapserefiner',
	title: 'Collapsable Refiner',
	type: 'collapse',
	options: collapserefinernoothers
});

export const CollapseRefinerWithNoOthers = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			onReset: action('Applicators reset'),
			refiners: [CollapsableRefinerNoOthers]
		}
	};
};

CollapseRefinerWithNoOthers.story = {
	name: 'Collapse Refiner With No Others'
};

//Collapse refiner with only single option(Child)
const TestRecordsOptionsWithOnerecod = {
	AL1: new SimpleOption({ badge: 4888949, label: 'Test Record', slug: 'TR', isSelected: true })
};
const CertificatesofComplianceOptionsWithOneRecord = {
	AL2: new SimpleOption({
		badge: 4888949,
		label: 'Certificate of Compliance',
		slug: 'CC',
		isSelected: true
	})
};
const collpasewithchild = {
	CR1: new SimpleRefinerDefinition({
		slug: 'Reports',
		title: 'Reports',
		badge: 7,
		options: ReportsOptions
	}),
	CR2: new SimpleRefinerDefinition({
		slug: 'Test Records',
		title: 'Test Records',
		badge: 6,
		options: TestRecordsOptionsWithOnerecod
	}),
	CR3: new SimpleRefinerDefinition({
		slug: 'Certificates of Compliance',
		title: 'Certificates of Compliance',
		badge: 1,
		options: CertificatesofComplianceOptionsWithOneRecord
	})
};

const collapserefinerwithChild = {
	refiner: new SimpleRefinerDefinition({
		slug: 'states',
		title: 'Estados de los EE.UU.',
		options: usStatesFullrefiner
	}),
	collapse: new SimpleRefinerDefinition({
		slug: 'Collapse Refiner',
		title: 'Collapse Refiner',
		options: collpasewithchild
	})
};

const CollapsableRefinerWithChild = new SimpleRefinerDefinition({
	slug: 'collapserefiner',
	title: 'Collapsable Refiner',
	type: 'collapse',
	options: collapserefinerwithChild
});

export const CollapseRefinerWithChild = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			onReset: action('Applicators reset'),
			refiners: [CollapsableRefinerWithChild]
		}
	};
};

CollapseRefinerWithChild.story = {
	name: 'Collapse Refiner With One Child'
};

//Collapse refiner with only single option(Child)
const TestRecordsOptionsWithZerorecord = {
	AL1: new SimpleOption({ badge: 4888949, label: 'Test Record', slug: 'TR', isSelected: true })
};
const CertificatesofComplianceOptionsWithZeroRecord = {};
const collpasewithZerochild = {
	CR1: new SimpleRefinerDefinition({
		slug: 'Reports',
		title: 'Reports',
		badge: 10,
		options: ReportsOptions
	}),
	CR2: new SimpleRefinerDefinition({
		slug: 'Test Records',
		title: 'Test Records',
		badge: 2,
		options: TestRecordsOptionsWithZerorecord
	}),
	CR3: new SimpleRefinerDefinition({
		slug: 'Certificates of Compliance',
		title: 'Certificates of Compliance',
		badge: 0,
		options: CertificatesofComplianceOptionsWithZeroRecord
	})
};

const collapserefinerwithZeroChild = {
	refiner: new SimpleRefinerDefinition({
		slug: 'states',
		title: 'Estados de los EE.UU.',
		options: usStatesFullrefiner
	}),
	collapse: new SimpleRefinerDefinition({
		slug: 'Collapse Refiner',
		title: 'Collapse Refiner',
		options: collpasewithZerochild
	})
};

const CollapsableRefinerWitZerohChild = new SimpleRefinerDefinition({
	slug: 'collapserefiner',
	title: 'Collapsable Refiner',
	type: 'collapse',
	options: collapserefinerwithZeroChild
});

export const CollapseRefinerWithZeroChild = () => {
	return {
		component: ApplicatorComponent,
		props: {
			allowIncompleteEmit: false,
			onApply: action('Applicators update'),
			onReset: action('Applicators reset'),
			refiners: [CollapsableRefinerWitZerohChild]
		}
	};
};

CollapseRefinerWithZeroChild.story = {
	name: 'Collapse Refiner With Zero Child'
};
