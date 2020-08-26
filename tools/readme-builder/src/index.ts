import { readFileSync, writeFileSync, read } from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import { string } from 'prop-types';
import { pathToFileURL } from 'url';
import { SectionIndex } from './SectionIndex';

const args = yargs
	.usage('Usage: $0 -o <file> -t <title> -c <file')
	.options({
		title: {
			type: 'string',
			demandOption: true,
			alias: 't',
			description: 'Root title for the output document.'
		},
		configFile: {
			type: 'string',
			demandOption: true,
			alias: 'c',
			description: 'Input JSON file to be parsed as a SectionIndex.'
		},
		outFile: {
			type: 'string',
			default: 'README.md',
			demandOption: false,
			alias: 'o',
			description: 'Output file; Use -- for stdout.'
		},
		packageFile: {
			type: 'string',
			default: 'package.json',
			demandOption: false,
			alias: 'p',
			description: 'The distribution package.json file, used to generate the installation command.'
		},
		excludePackages: {
			type: 'string',
			default: '^(@angular/.*)$',
			demandOption: false,
			alias: 'x',
			description:
				'A regular expression used to exclude packages from the generated installation command. Can be used to omit library packages assumed to already be installed.'
		},
		init: {
			type: 'boolean'
		}
	})
	// Any files specified should be resolved first
	.coerce(['config', 'outfile', 'packageFile'], path.resolve).argv;

const rootInput = JSON.parse(readFileSync(args.configFile).toString());

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
 * Recursively assembles sections for inclusion in the finished document.
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

let buildInstallationCommand = function(
	packageJsonPath: string,
	excludeRegex: RegExp | null = null
): string {
	// read the distribution package.json
	let packageStr = readFileSync(packageJsonPath).toString();
	let pkg = JSON.parse(packageStr);

	const packageSelectors = Object.keys(pkg.peerDependencies)
		.filter(dependencyName => (excludeRegex ? !dependencyName.match(excludeRegex) : true))
		.map((dependencyName: string) => {
			const dependencyVersion = pkg.peerDependencies[dependencyName];
			return `${dependencyName}@${dependencyVersion}`;
		})
		.sort();

	// prettier-ignore
	return [
		'```bash', 
		`npm install --save ${pkg.name}@${pkg.version} \\`, 
		packageSelectors.map( s => `\t${s}`).join(' \\\n'),
		'```'
	].join('\n');
};

let output = [...buildSections({ [args.title]: rootInput }).map(section => section.trim())]
	.join('\n\n')
	.replace(
		'{{install-command}}',
		buildInstallationCommand(args.packageFile, new RegExp(args.excludePackages))
	);

writeFileSync(args.outFile, output);
