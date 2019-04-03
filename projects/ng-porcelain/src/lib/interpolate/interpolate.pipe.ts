import { Pipe, PipeTransform } from '@angular/core';

// TODO: implement with sprintf-js

@Pipe({
	name: 'interpolate'
})
export class InterpolatePipe implements PipeTransform {
	static toUnsignedInteger(input: any): number {
		const value = parseInt(input, 10);
		return Math.max(0, value);
	}

	transform(formatString: any, ...args: any): any {
		let i = 0;
		return formatString.replace(/(%s|%u)/g, function(
			match,
			capture1,
			offset,
			string
		) {
			switch (capture1) {
				case '%s':
					return args[i++];
				case '%u':
					return InterpolatePipe.toUnsignedInteger(
						args[i++]
					).toLocaleString();
			}
		});
	}
}
