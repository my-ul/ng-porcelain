import chalk from 'chalk';
import semver from 'semver';
import * as path from 'path';
import * as yargs from 'yargs';
import { readFileSync, writeFileSync } from 'fs';

/**
 * Makes certain that the peerDependencies for the npm bundle match the dependencies for the dev environment.
 */

const args = yargs
	.usage('Usage: $0 --primary <package.json> --secondary <package.json>')
	.options({
		primary: {
			type: 'string',
			description:
				'The primary/authoritative package.json. Secondary package.json versions must exist and match primary.'
		},
		secondary: {
			type: 'string',
			description: 'The secondary package.json to be compared against the primary package.json.'
		},
		fix: {
			type: 'boolean',
			demandOption: false,
			default: false,
			description: 'If set, the fixed secondary package.json will be written.'
		}
	})
	.coerce(['primary', 'secondary'], path.resolve).argv;

interface IDependencies {
	[packageName: string]: string;
}

interface IPackage {
	name: string;
	dependencies?: IDependencies;
	peerDependencies?: IDependencies;
	devDependencies?: IDependencies;
}

if (args.primary && args.secondary) {
	let primaryStr = readFileSync(args.primary, 'utf8').toString();
	let primary = JSON.parse(primaryStr) as IPackage;

	let secondaryStr = readFileSync(args.secondary, 'utf8').toString();
	let secondary = JSON.parse(secondaryStr) as IPackage;

	let toInstall: string[] = [];
	let toUpdate: string[] = [];

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
					console.error(chalk.red(`\tnot present in ${args.secondary}`));
					toInstall.push(`${primaryPackageName}@${primaryPackageVersion}`);
				}
				secondary.dependencies[primaryPackageName] = primaryPackageVersion;
			} else {
				secondary.dependencies = Object.assign({}, primary.dependencies);
				console.error(chalk.red(`No dependencies key found in ${args.secondary}`));
			}
		}
	}

	if (toInstall.length + toUpdate.length > 0) {
		if (args.fix) {
			writeFileSync(args.secondary, JSON.stringify(secondary, null, '\t'));
			console.log(chalk.green(`Wrote ${args.secondary}`));
			process.exit();
		} else {
			console.log(chalk.yellow('To fix, run the following command(s)'));
			if (toInstall.length > 0) console.log('\tnpm install --save ' + toInstall.join(' '));

			if (toUpdate.length > 0) console.log('\tnpm update --save ' + toUpdate.join(' '));
			process.exit(1); // return error
		}
	} else {
		process.exit();
	}
}
