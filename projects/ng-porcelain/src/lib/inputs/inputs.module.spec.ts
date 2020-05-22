import { InputsModule } from './inputs.module';

describe('InputsModule', () => {
	let inputsModule: InputsModule;

	beforeEach(() => {
		inputsModule = new InputsModule();
	});

	it('should create an instance', () => {
		expect(inputsModule).toBeTruthy();
	});
});
