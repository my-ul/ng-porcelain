import { CeilPipe } from './ceil.pipe';
import { isDevMode } from '@angular/core';

describe('CeilPipe', () => {
	it('create an instance', () => {
		const pipe = new CeilPipe();
		expect(pipe).toBeTruthy();
	});

	it('should round up when above 0.5', () => {
		const pipe = new CeilPipe();
		const formatted = pipe.transform(1234.56);
		expect(formatted).toEqual(1235);
	});

	it('should round up when below 0.5', () => {
		const pipe = new CeilPipe();
		const formatted = pipe.transform(1234.01);
		expect(formatted).toEqual(1235);
	});

	it('should ignore (pass through) non-numeric values', () => {
		const pipe = new CeilPipe();
		['string', new Date(), true, false, new RegExp('^.*$'), []].forEach(val =>
			expect(pipe.transform(val)).toEqual(val)
		);
	});
	it('should warn when isDevMode() and non-numeric value is provided', () => {
		const pipe = new CeilPipe();
		const traceSpy = jasmine.createSpy('log');
		const oldTrace = console.trace;
		console.trace = (...args) => {
			traceSpy(args);
			oldTrace.apply(null, args);
		};
		const transformed = pipe.transform('non-numeric value');
		expect(traceSpy).toHaveBeenCalled();
		console.trace = oldTrace;
	});
});
