import { RoundPipe } from './round.pipe';

describe('RoundPipe', () => {
	it('create an instance', () => {
		const pipe = new RoundPipe();
		expect(pipe).toBeTruthy();
	});

	it('should round DOWN when fractional part is below 0.5', () => {
		const pipe = new RoundPipe();
		const formatted = pipe.transform(1234.01);
		expect(formatted).toEqual(1234);
	});

	it('should round UP when fractional part is 0.5', () => {
		const pipe = new RoundPipe();
		const formatted = pipe.transform(1234.5);
		expect(formatted).toEqual(1235);
	});

	it('should round UP when fractional part is above 0.5', () => {
		const pipe = new RoundPipe();
		const formatted = pipe.transform(1234.99);
		expect(formatted).toEqual(1235);
	});

	it('should ignore (pass through) non-numeric values', () => {
		const pipe = new RoundPipe();
		['string', new Date(), true, false, new RegExp('^.*$'), []].forEach(val =>
			expect(pipe.transform(val)).toEqual(val)
		);
	});

	it('should warn when isDevMode() and non-numeric value is provided', () => {
		const pipe = new RoundPipe();
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
