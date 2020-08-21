import { readFileSync, writeFileSync, read } from 'fs';
import * as yargs from 'yargs';

const args = yargs.usage('Usage: $0 -o <file> -t <title> [-c <file]').options({
	title: {
		type: 'string',
		demandOption: true,
		alias: 't',
		description: 'Root title for the output document.'
	},
	config: {
		type: 'string',
		demandOption: true,
		alias: 'c',
		description: 'Input JSON file to be parsed as a SectionIndex.'
	},
	outfile: {
		type: 'string',
		default: 'README.md',
		demandOption: false,
		alias: 'o',
		description: 'Output file; Use -- for stdout.'
	},
	init: {
		type: 'boolean'
	}
}).argv;

const outfile = 'README.md';
const documentTitle = 'Porcelain for Angular';

interface SectionIndex {
	[title: string]: string | SectionIndex;
}

const example: SectionIndex = {
	'Quick Start': '../../projects/ng-porcelain/INSTALL.md',

	Components: {
		Refiners: {
			'Simple Refiner':
				'../../projects/ng-porcelain/src/lib/simple-refiner/simple-refiner/README.md',
			'Date Refiner': '../../projects/ng-porcelain/src/lib/date-refiner/date-refiner/README.md',
			Applicator: '../../projects/ng-porcelain/src/lib/applicator/applicator/README.md',
			'Refiners Macro': '../../projects/ng-porcelain/src/lib/refiners/refiners/README.md'
		},
		Footer: '../../projects/ng-porcelain/src/lib/footer/footer/README.md',
		Truncate: '../../projects/ng-porcelain/src/lib/truncate/truncate/README.md',
		Spinner: '../../projects/ng-porcelain/src/lib/spinner/spinner/README.md',
		'Legacy Search Input': '../../projects/ng-porcelain/src/lib/search-input/search-input/README.md'
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
		Inputs: {
			__: '../../projects/ng-porcelain/src/lib/inputs/README.md',

			'Search Input': '../../projects/ng-porcelain/src/lib/inputs/search-input/README.md',
			'Password Input Component':
				'../../projects/ng-porcelain/src/lib/inputs/password-input/README.md',
			'Text Input Component': '../../projects/ng-porcelain/src/lib/inputs/text-input/README.md'
		},
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
	},
	Lists: {
		__: '../../projects/ng-porcelain/src/lib/lists/README.md',
		'Dynamic Header': '../../projects/ng-porcelain/src/lib/lists/dynamic-header/README.md',
		'List Component': '../../projects/ng-porcelain/src/lib/lists/list/README.md',
		'List Body Component': '../../projects/ng-porcelain/src/lib/lists/list-body/README.md',
		'List Header Component': '../../projects/ng-porcelain/src/lib/lists/list-header/README.md',
		'List Header Cell Component':
			'../../projects/ng-porcelain/src/lib/lists/list-header-cell/README.md',
		'List Item Component': '../../projects/ng-porcelain/src/lib/lists/list-item/README.md',
		'List Item Cell Component': '../../projects/ng-porcelain/src/lib/lists/list-item-cell/README.md',
		'Search Header Component': '../../projects/ng-porcelain/src/lib/lists/search-header/README.md',
		'Sort Header Component': '../../projects/ng-porcelain/src/lib/lists/sort-header/README.md',
		'Text Header Component': '../../projects/ng-porcelain/src/lib/lists/text-header/README.md'
	}
};

/**
 * Naive test to determine if a node is a nested SectionIndex.
 * @param subject String or SectionIndex
 */
function isNode(subject: any): subject is SectionIndex {
	return typeof subject !== 'string' && typeof subject === 'object';
}

/**
 * Adjusts a Markdown document's heading levels for nesting in a parent document.
 * @param input String content of a section of Markdown.  Headings in the MD document are assumed to be at root level;
 * @param level Number of heading levels to decrease the document by.  To see h1 become h2, the level should be 1
 *
 * @example
 * 		Consider the following input string...
 *
 * 		```md
 * 		# Typography Test
 * 		The quick brown fox jumps over the lazy dog.
 * 		```
 *
 * 		If you run this through the `processHeadings` function with processHeadings(input, 3), the output will be..
 *
 * 		```md
 * 		#### Typography Test
 * 		The quick brown fox jumps over the lazy dog.
 * 		```
 * 		Note the changed heading level (h1 to h4)
 */
let processHeadings = function(input: string, level: number = 0): string {
	return input
		.replace(/^(#+)\s*(.*)$/gm, function(match, headingChars, headingText) {
			return `${'#'.repeat(headingChars.length + level)} ${headingText.trim()}`;
		})
		.replace(/\r\n/gm, '\n')
		.trim();
};

/**
 *
 * @param section A SectionIndex dictionary for Title => filename of document or another nested SectionIndex
 * @param level
 */
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

let output = [...buildSections({ [args.title]: example }).map(section => section.trim())].join('\n\n');

writeFileSync(args.outfile, output);
