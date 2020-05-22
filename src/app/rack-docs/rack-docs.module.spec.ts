import { RackDocsModule } from './rack-docs.module';

describe('RackDocsModule', () => {
	let rackDocsModule: RackDocsModule;

	beforeEach(() => {
		rackDocsModule = new RackDocsModule();
	});

	it('should create an instance', () => {
		expect(rackDocsModule).toBeTruthy();
	});
});
