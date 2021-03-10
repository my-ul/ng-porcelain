import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';
import { flatten } from 'flat';

class SetAzdoVariables extends Command {
	static description =
		'Reads a json file and outputs its contents to console to be read by Azure DevOps during a build.';

	static flags = {
		input: flags.string({
			char: 'i',
			required: true,
			description:
				'Specifies a path to json file to read to stdout for AzDO. Resolved with `path.resolve`.',
			parse: input => path.resolve(input)
		}),
		prefix: flags.string({
			char: 'p',
			required: false,
			default: '',
			description: 'String to prepend to the variable names. Use to prevent collisions.'
		}),
		delimiter: flags.string({
			char: 'd',
			required: false,
			default: '__',
			description:
				'Separator to use during the deep flattening process.  Use something like "__" or "."'
		})
	};

	static args = [];

	async run() {
		const { flags } = this.parse(SetAzdoVariables);

		if (flags.input) {
			let fileStr = fs.readFileSync(flags.input).toString();
			let parsed = JSON.parse(fileStr);
			let flattened = flatten(parsed, { delimiter: flags.delimiter }) as any;

			const usePrefix = flags.prefix || '';

			Object.keys(flattened).forEach(key => {
				const value = flattened[key];
				const useKey = key.replace(/\W/g, '_').trim();
				console.log(`##vso[task.setvariable variable=${usePrefix}${useKey}]${value}`);
			});
		} else {
			console.log('Missing input file.', { flags });
		}
	}
}

export = SetAzdoVariables;
