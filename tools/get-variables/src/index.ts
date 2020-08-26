/**
 * Since the JSON to Variable thing no longer works, this utility will read a file
 * and write values to the console so Azure DevOps can use them.
 */

import yargs from 'yargs';
import flat from 'flat';
import path from 'path';
import fs from 'fs';

const args = yargs
	.usage('Usage: $0 --input <file>')
	.option('input', {
		type: 'string',
		alias: 'i',
		demandOption: true,
		description: 'A JSON file to output as variables'
	})
	.option('prefix', {
		type: 'string',
		alias: 'p',
		default: '',
		description: 'A variable prefix to include'
	})
	.option('delimiter', {
		type: 'string',
		alias: 'd',
		default: '__',
		description: 'The delimiter used to concatenate keys for deep JSON objects.'
	})
	.coerce(['input'], path.resolve).argv;

if (args.input) {
	let fileStr = fs.readFileSync(args.input).toString();
	let parsed = JSON.parse(fileStr);
	let flattened = flat(parsed, { delimiter: args.delimiter }) as any;

	const usePrefix = args.prefix || '';

	Object.keys(flattened).forEach(key => {
		const value = flattened[key];
		const useKey = key.replace(/\W/g, '_').trim();
		console.log(`##vso[task.setvariable variable=${usePrefix}${useKey}]${value}`);
	});
} else {
	console.log('Missing input file.', { args });
}
