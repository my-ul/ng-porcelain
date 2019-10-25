import { FrameCommunicationModule } from './frame-communication.module';

describe('FrameCommunicationModule', () => {
	let frameCommunicationModule: FrameCommunicationModule;

	beforeEach(() => {
		frameCommunicationModule = new FrameCommunicationModule();
	});

	it('should create an instance', () => {
		expect(frameCommunicationModule).toBeTruthy();
	});
});
