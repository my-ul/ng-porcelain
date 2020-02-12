import { SprintfPipe } from './sprintf.pipe';

describe('`sprintf` Pipe', () => {
	it('should create an instance', () => {
		const pipe = new SprintfPipe();
		expect(pipe).toBeTruthy();
	});

	it('should format numbers with the %u token', () => {
		const pipe = new SprintfPipe();
		let formatted = pipe.transform('%u Orders', 1234);
		expect(formatted).toEqual('1234 Orders');
	});

	it('should pass through numbers with the %s token', () => {
		const pipe = new SprintfPipe();
		let formatted = pipe.transform('%s Orders', 1234);
		expect(formatted).toEqual('1234 Orders');
	});

	it('should support floated decimal places', () => {
		const pipe = new SprintfPipe();
		let formatted = pipe.transform('%.02f', 1234.567);
		expect(formatted).toEqual('1234.57');
	});

	it('should truncate decimals when passed to an int type', () => {
		const pipe = new SprintfPipe();
		let formatted = pipe.transform('%d', 1234.56);
		expect(formatted).toEqual('1234');
	});

	it('should allow positional formatting', () => {
		const pipe = new SprintfPipe();
		let formatted = pipe.transform('The %2$s contains %1$d monkeys', 1234, 'zoo');
		expect(formatted).toEqual('The zoo contains 1234 monkeys');
	});

	it('should allow widths with padding characters', () => {
		const pipe = new SprintfPipe();
		let formatted = pipe.transform("%' 9d", 123);
		expect(formatted).toEqual('      123');
	});

	it('should allow printing to hexadecimal', () => {
		const pipe = new SprintfPipe();
		let formatted = pipe.transform('%x', 128);
		expect(formatted).toEqual('80');
	});
});
