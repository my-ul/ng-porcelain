import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// do not make this into an import, because it won't work
const semverSort = require('semver-sort');

interface Stringable {
	toString(): string;
}

interface NpmPackage {
	name: string;
	version: string;
}

const trim = (str: Stringable) => str.toString().trim();

class GetLatestVersion extends Command {
	static description = 'describe the command here';

	static flags = {
		package: flags.string({
			char: 'p',
			required: true,
			description: 'Path to a package.json file.'
			//parse: (pkg: string) => path.resolve(pkg)
		}),
		channel: flags.string({
			char: 'c',
			required: false,
			multiple: true,
			default: ['release'],
			description:
				'List of release channels to consider. If omitted, only `release` will be considered.'
		})
	};

	static args = [];

	openJsonFile<T extends any>(path: string): T {
		return JSON.parse(fs.readFileSync(path).toString()) as T;
	}

	async run() {
		const { flags } = this.parse(GetLatestVersion);

		// Make sure the file can be opened
		if (!fs.existsSync(flags.package) || !fs.lstatSync(flags.package).isFile()) {
			console.error(`Unable to resolve NPM configuration file '${flags.package}'.`);
			process.exit(1);
		}

		// Open the package.json and parse it.
		const pkg = this.openJsonFile(flags.package) as NpmPackage;

		// Get all versions of the package as JSON
		const cmd = `npm view ${pkg.name} versions --json`;

		// Load and parse the package.json;
		// If the package.json version is not in the version list, add it.
		const allVersions: string[] = JSON.parse(execSync(cmd).toString());
		if (allVersions.indexOf(pkg.version) === -1) {
			allVersions.push(pkg.version);
		}

		// Parse desired channel(s) and assemble the regular expression
		const channels = flags.channel.slice();
		const tests = [];

		// Determine if the current release is desired
		let releaseIdx = channels.indexOf('release');
		if (releaseIdx > -1) {
			// accepts versions formatted as x.y.z
			tests.push('(\\d+).(\\d+).(\\d+)');
			channels.splice(releaseIdx, 1);
		}

		// If any other channels are desired, assemble RegExp that will allow them
		if (channels.length > 0) {
			// accepts versions like w.x.y-beta.z
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
	}
}

export = GetLatestVersion;
