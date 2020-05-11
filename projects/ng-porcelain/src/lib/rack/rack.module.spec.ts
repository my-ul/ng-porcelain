import { RackModule } from './rack.module';

describe('RackModule', () => {
	let rackModule: RackModule;

	beforeEach(() => {
		rackModule = new RackModule();
	});

	it('should create an instance', () => {
		expect(rackModule).toBeTruthy();
	});
});
