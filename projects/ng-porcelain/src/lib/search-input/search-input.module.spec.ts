import { SearchInputModule } from './search-input.module';

describe('SearchInputModule', () => {
	let searchInputModule: SearchInputModule;

	beforeEach(() => {
		searchInputModule = new SearchInputModule();
	});

	it('should create an instance', () => {
		expect(searchInputModule).toBeTruthy();
	});
});
