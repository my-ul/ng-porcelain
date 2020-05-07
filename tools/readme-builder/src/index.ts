import { readFileSync, writeFileSync, read } from 'fs';

const outfile = 'README.md';
const documentTitle = 'Porcelain for Angular';

interface SectionIndex {
	[title: string]: string | SectionIndex;
}
const rootNode: SectionIndex = {
	'Quick Start': '../../projects/ng-porcelain/INSTALL.md',

	Components: {
		Refiners: {
			'Simple Refiner':
				'../../projects/ng-porcelain/src/lib/simple-refiner/simple-refiner/README.md',
			'Date Refiner': '../../projects/ng-porcelain/src/lib/date-refiner/date-refiner/README.md',
			Applicator: '../../projects/ng-porcelain/src/lib/applicator/applicator/README.md',
			'Refiners Macro': '../../projects/ng-porcelain/src/lib/refiners/refiners/README.md'
		},
		'Search Input': '../../projects/ng-porcelain/src/lib/search-input/search-input/README.md',
		Footer: '../../projects/ng-porcelain/src/lib/footer/footer/README.md',
		Truncate: '../../projects/ng-porcelain/src/lib/truncate/truncate/README.md',
		Spinner: '../../projects/ng-porcelain/src/lib/spinner/spinner/README.md'
	},

	Pipes: {
		__: '../../projects/ng-porcelain/src/lib/pipes/README.md',
		'`ceil` Pipe': '../../projects/ng-porcelain/src/lib/pipes/ceil/README.md',
		'`floor` Pipe': '../../projects/ng-porcelain/src/lib/pipes/floor/README.md',
		'`round` Pipe': '../../projects/ng-porcelain/src/lib/pipes/round/README.md',
		'`sprintf` Pipe': '../../projects/ng-porcelain/src/lib/pipes/sprintf/README.md',
		'`toLocaleString` Pipe': '../../projects/ng-porcelain/src/lib/pipes/toLocaleString/README.md'
	},
	Services: {
		__: '../../projects/ng-porcelain/src/lib/services/README.md',
		'Google Analytics Service':
			'../../projects/ng-porcelain/src/lib/services/google-analytics/README.md',
		'Translation Service': '../../projects/ng-porcelain/src/lib/services/translation/README.md'
	},
	Modules: {
		Lists: {
			__: '../../projects/ng-porcelain/src/lib/lists/README.md',
			'Dynamic Header Component':
				'../../projects/ng-porcelain/src/lib/lists/dynamic-header/README.md',
			'List Component': '../../projects/ng-porcelain/src/lib/lists/list/README.md',
			'List Body Component': '../../projects/ng-porcelain/src/lib/lists/list-body/README.md',
			'List Header Component': '../../projects/ng-porcelain/src/lib/lists/list-header/README.md',
			'List Header Cell Component':
				'../../projects/ng-porcelain/src/lib/lists/list-header-cell/README.md',
			'List Item Component': '../../projects/ng-porcelain/src/lib/lists/list-item/README.md',
			'List Item Cell Component':
				'../../projects/ng-porcelain/src/lib/lists/list-item-cell/README.md',
			//'Text Header': '../../projects/ng-porcelain/src/lib/lists/text-header/README.md',
			'Sort Header Component': '../../projects/ng-porcelain/src/lib/lists/sort-header/README.md'
		},
		Toolbars: {
			__: '../../projects/ng-porcelain/src/lib/toolbar/README.md',
			'Toolbar Component': '../../projects/ng-porcelain/src/lib/toolbar/toolbar/README.md',
			'Toolbar Cell Component':
				'../../projects/ng-porcelain/src/lib/toolbar/toolbar-cell/README.md',
			'Toolbar Text Component':
				'../../projects/ng-porcelain/src/lib/toolbar/toolbar-text/README.md',
			'Toolbar Button Component':
				'../../projects/ng-porcelain/src/lib/toolbar/toolbar-button/README.md',
			'Toolbar Select Component':
				'../../projects/ng-porcelain/src/lib/toolbar/toolbar-select/README.md'
		}
	}
	// Lists: {
	//     __: '$/projects/ng-porcelain/src/lib/lists/README.md',

	// }
};

function isNode(subject: any): subject is SectionIndex {
	return typeof subject !== 'string' && typeof subject === 'object';
}

let processHeadings = function(input: string, level: number = 0): string {
	return input
		.replace(/^(#+)\s*(.*)$/gm, function(match, headingChars, headingText) {
			console.log({ headingChars, level });
			return `${'#'.repeat(headingChars.length + level)} ${headingText.trim()}`;
		})
		.replace(/\r\n/gm, '\n')
		.trim();
};

let buildSections = function(section: SectionIndex, level: number = 1): string[] {
	return Object.keys(section).reduce((allChunks: string[], sectionTitle: string) => {
		const nodeOrFilename = section[sectionTitle];
		let newChunks: string[] = [];

		if (sectionTitle !== '__') {
			newChunks.push(`${'#'.repeat(level)} ${sectionTitle}`);
		}

		if (isNode(nodeOrFilename)) {
			newChunks = newChunks.concat(buildSections(nodeOrFilename, level + 1));
		} else {
			const contents = readFileSync(nodeOrFilename, 'utf8'),
				processedContents = processHeadings(contents, level);
			newChunks.push(processedContents);
		}

		return allChunks.concat(newChunks);
	}, []);
};

let output = [...buildSections({ [documentTitle]: rootNode }).map(section => section.trim())].join(
	'\n\n'
);

writeFileSync('README.md', output);
