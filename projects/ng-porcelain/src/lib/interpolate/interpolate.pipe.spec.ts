import { InterpolatePipe } from './interpolate.pipe';

describe('InterpolatePipe', () => {
	it('should create an instance', () => {
		const pipe = new InterpolatePipe();
		expect(pipe).toBeTruthy();
	});

	it('should format numbers with the %u token', () => {
		const pipe = new InterpolatePipe();
		let formatted = pipe.transform('%u Orders', 1234);
		expect(formatted).toEqual('1,234 Orders');
	});

	it('should pass through numbers with the %s token', () => {
		const pipe = new InterpolatePipe();
		let formatted = pipe.transform('%s Orders', 1234);
		expect(formatted).toEqual('1234 Orders');
	});
});
