import { ListDocsModule } from './list-docs.module';

describe('ListDocsModule', () => {
	let listDocsModule: ListDocsModule;

	beforeEach(() => {
		listDocsModule = new ListDocsModule();
	});

	it('should create an instance', () => {
		expect(listDocsModule).toBeTruthy();
	});
});
