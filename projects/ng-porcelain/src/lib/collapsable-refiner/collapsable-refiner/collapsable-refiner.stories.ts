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
import { CollapsableRefinerComponent } from './collapsable-refiner.component';
import { COLLAPSABLEREFINER_IMPORTS } from '../collapsable-refiner/collapsable-refiner.module';

export default {
	title: 'Refiner System/Collapse Refiner',
	decorators: [withNotes, withKnobs],

	parameters: {
		info: {
			inline: true
		}
	}
};

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
	AL0: new SimpleOption({ badge: 4888949, label: 'Description', slug: 'DES' }),
	AK0: new SimpleOption({ badge: 738068, label: 'Description DNA', slug: 'DNA' }),
	AZ0: new SimpleOption({ badge: 7123898, label: 'Description IP', slug: 'IP' }),
	AR0: new SimpleOption({ badge: 3020321, label: 'Description IPM', slug: 'IPM' }),
	AB0: new SimpleOption({ badge: 3020322, label: 'Description IPT', slug: 'IPT' }),
	AC0: new SimpleOption({ badge: 3020323, label: 'Description IR', slug: 'IR' }),
	AD0: new SimpleOption({ badge: 3020324, label: 'Description UL', slug: 'UL' }),
	AE0: new SimpleOption({ badge: 3020325, label: 'ML Correlation Sheet', slug: 'ML' })
};
const TestRecordsOptions = {
	AL1: new SimpleOption({ badge: 4888949, label: 'Test Record', slug: 'TR', isSelected: true }),
	AK1: new SimpleOption({ badge: 738068, label: 'Test Record DNA', slug: 'TRDNA' })
};
const CertificatesofComplianceOptions = {
	AL2: new SimpleOption({
		badge: 4888949,
		label: 'Certificate of Compliance',
		slug: 'CC',
		isSelected: true
	}),
	AK2: new SimpleOption({ badge: 738068, label: 'ML Certificate of Compliance ', slug: 'MLCC' })
};

const collpase = {
	CR1: new SimpleRefinerDefinition({
		slug: 'Reports',
		title: 'Reports',
		tooltipText: 'This grouping includes Descriptions and Reports',
		badge: 8,
		options: ReportsOptions,
		selected: ['DES', 'DNA']
	}),
	CR2: new SimpleRefinerDefinition({
		slug: 'Test Records',
		title: 'Test Records',
		badge: 2,
		options: TestRecordsOptions
	}),
	CR3: new SimpleRefinerDefinition({
		slug: 'Certificates of Compliance',
		title: 'Certificates of Compliance',
		badge: 5,
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
		selected: ['Reports'],
		options: collpase
	})
};

const CollapsableRefiner = new SimpleRefinerDefinition({
	slug: 'collapserefiner',
	title: 'Collapsable Refiner',
	type: 'collapse',
	options: collapserefiner,
	selected: ['Reports']
});

export const DefaultNoProps = () => {
	return {
		component: CollapsableRefinerComponent,
		moduleMetadata: {
			imports: COLLAPSABLEREFINER_IMPORTS
		},
		props: {
			refiner: CollapsableRefiner
		},
		onRefinerChange: action('Refiner changed')
	};
};

DefaultNoProps.story = {
	name: 'Default (no props)',
	parameters: {}
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
		component: CollapsableRefinerComponent,
		moduleMetadata: {
			imports: COLLAPSABLEREFINER_IMPORTS
		},
		props: {
			refiner: CollapsableRefinerNoCommon
		},
		onRefinerChange: action('Refiner changed')
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
		component: CollapsableRefinerComponent,
		moduleMetadata: {
			imports: COLLAPSABLEREFINER_IMPORTS
		},
		props: {
			refiner: CollapsableRefinerNoOthers
		},
		onRefinerChange: action('Refiner changed')
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
		component: CollapsableRefinerComponent,
		moduleMetadata: {
			imports: COLLAPSABLEREFINER_IMPORTS
		},
		props: {
			refiner: CollapsableRefinerWithChild
		},
		onRefinerChange: action('Refiner changed')
	};
};

CollapseRefinerWithChild.story = {
	name: 'Collapse Refiner With One Child'
};

//Collapse refiner with Zero option(Child)
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

const CollapsableRefinerWitZeroChild = new SimpleRefinerDefinition({
	slug: 'collapserefiner',
	title: 'Collapsable Refiner',
	type: 'collapse',
	options: collapserefinerwithZeroChild
});

export const CollapseRefinerWithZeroChild = () => {
	return {
		component: CollapsableRefinerComponent,
		moduleMetadata: {
			imports: COLLAPSABLEREFINER_IMPORTS
		},
		props: {
			refiner: CollapsableRefinerWitZeroChild
		},
		onRefinerChange: action('Refiner changed')
	};
};

CollapseRefinerWithZeroChild.story = {
	name: 'Collapse Refiner With Zero Child'
};
