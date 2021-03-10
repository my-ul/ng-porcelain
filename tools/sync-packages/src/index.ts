import { readFileSync, writeFileSync } from 'fs';
import { Command, flags } from '@oclif/command';
import * as chalk from 'chalk';
import * as path from 'path';
import * as semver from 'semver';

interface IDependencies {
	[packageName: string]: string;
}

interface IPackage {
	name: string;
	version: string;
	dependencies?: IDependencies;
	peerDependencies?: IDependencies;
	devDependencies?: IDependencies;
}

class CheckVersions extends Command {
	static description = 'describe the command here';

	static flags = {
		fix: flags.boolean({
			char: 'f',
			description: 'If set, the fixed secondary package.json will be written.',
			default: false
		}),
		primary: flags.string({
			name: 'primary',
			required: true,
			description:
				'The primary/authoritative package.json. Secondary package.json versions must exist and match primary.',
			parse: input => path.resolve(input)
		}),
		secondary: flags.string({
			name: 'secondary',
			required: true,
			description: 'The secondary package.json to be compared against the primary package.json.',
			parse: input => path.resolve(input)
		})
	};

	static args = [];

	openJson<T>(path: string): T {
		let fileStr = readFileSync(path).toString();
		return JSON.parse(fileStr);
	}

	async run() {
		const { flags } = this.parse(CheckVersions);

		const primary = this.openJson<IPackage>(flags.primary);
		const secondary = this.openJson<IPackage>(flags.secondary);

		let toInstall: string[] = [];
		let toUpdate: string[] = [];

		if (primary && secondary) {
			if (primary.version && secondary.version) {
				process.stdout.write(`Checking package versions... `);
				if (primary.version === secondary.version) {
					console.log(`${chalk.green('match')}`);
				} else {
					console.log(`${chalk.red('does not match')}`);
					if (flags.fix) {
						secondary.version = primary.version;
					}
				}
			}
		}

		if (primary.peerDependencies) {
			for (let primaryPackageName in primary.peerDependencies) {
				process.stdout.write(`Checking ${chalk.blueBright(primaryPackageName)}... `);
				const primaryPackageVersion = primary.peerDependencies[primaryPackageName];
				if (secondary.dependencies) {
					if (secondary.dependencies[primaryPackageName]) {
						const secondaryPackageVersion = secondary.dependencies[primaryPackageName];
						if (primaryPackageVersion === secondaryPackageVersion) {
							console.info(chalk.green('match'));
						} else if (semver.intersects(secondaryPackageVersion, primaryPackageVersion)) {
							console.info(chalk.yellow('satisfies'));
						} else {
							console.error(
								chalk.red(
									`versions not equal ${primaryPackageVersion} !== ${secondaryPackageVersion}`
								)
							);
							toUpdate.push(`${primaryPackageName}@${primaryPackageVersion}`);
						}
					} else {
						console.error(chalk.red(`\tnot present in ${flags.secondary}`));
						toInstall.push(`${primaryPackageName}@${primaryPackageVersion}`);
					}
					secondary.dependencies[primaryPackageName] = primaryPackageVersion;
				} else {
					secondary.dependencies = Object.assign({}, primary.dependencies);
					console.error(chalk.red(`No dependencies key found in ${flags.secondary}`));
				}
			}
		}

		// fix
		if (toInstall.length + toUpdate.length > 0) {
			if (flags.fix) {
				writeFileSync(flags.secondary, JSON.stringify(secondary, null, '\t'));
				console.log(chalk.green(`Wrote ${flags.secondary}`));
				process.exit();
			} else {
				console.log(chalk.yellow('To fix, run the following command(s)'));
				if (toInstall.length > 0) console.log('\tnpm install --save ' + toInstall.join(' '));

				if (toUpdate.length > 0) console.log('\tnpm update --save ' + toUpdate.join(' '));
				process.exit(1); // return error
			}
		}
	}
}

export = CheckVersions;
