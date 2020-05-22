import { InputsDocsModule } from './inputs-docs.module';

describe('InputsDocsModule', () => {
	let inputsDocsModule: InputsDocsModule;

	beforeEach(() => {
		inputsDocsModule = new InputsDocsModule();
	});

	it('should create an instance', () => {
		expect(inputsDocsModule).toBeTruthy();
	});
});
