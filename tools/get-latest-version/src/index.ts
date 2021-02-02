import { exec, execSync } from 'child_process';
//import semverSort from 'semver-sort';
const semverSort = require('semver-sort');
import { readFileSync, fstat } from 'fs';
import * as yargs from 'yargs';
import path from 'path';
import fs from 'fs';

interface Stringable {
	toString(): string;
}

const toString = (str: Stringable): string => str.toString();
const trim = (str: Stringable) => str.toString().trim();

let args = yargs
	.usage('get-latest-version --package path/to/package.json [--channel beta] [--channel ...')
	.version('1.0.0')
	.option('package', {
		alias: 'p',
		type: 'string',
		demandOption: true,
		describe: 'Path to a package.json file.',
		coerce: path.resolve
	})
	.option('channel', {
		alias: 'c',
		type: 'string',
		array: true,
		describe: 'Provide channels to be considered. If blank, only `release` will be considered.',
		default: ['release']
	}).argv;

// Make sure the file can be opened
if (!fs.existsSync(args.package) || !fs.lstatSync(args.package).isFile()) {
	console.error(`Unable to resolve NPM configuration file '${args.package}'.`);
	process.exit(1);
}

// Open the package.json and parse it.
const pkg = JSON.parse(readFileSync(args.package).toString());

// Get all versions of the package as JSON
const cmd = `npm view ${pkg.name} versions --json`;

// Load and parse the package.json;
// If the package.json version is not in the version list, add it.
const allVersions: string[] = JSON.parse(execSync(cmd).toString());
if (allVersions.indexOf(pkg.version) === -1) {
	allVersions.push(pkg.version);
}

// Parse desired channel(s) and assemble the regular expression
const channels = args.channel.slice();
const tests = [];

// Determine if the current release is desired
let releaseIdx = channels.indexOf('release');
if (releaseIdx > -1) {
	tests.push('(\\d+).(\\d+).(\\d+)');
	channels.splice(releaseIdx, 1);
}

// If any other channels are desired, assemble RegExp that will allow them
if (channels.length > 0) {
	tests.push(`(\\d+)\.(\\d+).(\\d+)\-(${channels.map(trim).join('|')})\.(\\d+)`);
}

// Compile the tests into a RegExp
const versionTest = new RegExp(['^', '(:?', tests.join('|'), ')', '$'].join(''));

// Filter the versions
const validVersions = allVersions.filter(version => versionTest.test(version));

// If no versions are available, return 0.0.0 and return an error.
if (validVersions.length === 0) {
	console.log('0.0.0');
	process.exit(1);
}

// Sort the versions
const sortedVersions = semverSort.asc(validVersions);

// Print the version on top of the array.
console.log(sortedVersions.pop());

// Exit without errors
process.exit(0);
