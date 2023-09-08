import { inject, TestBed } from '@angular/core/testing';
import { Observable, forkJoin, combineLatest } from 'rxjs';
// import { v4 as uuid } from 'uuid';
import * as uuid from 'uuid';

import {
	FrameGuestService,
	IDocumentHeightResponse,
	ILaunchUploadResponse,
	IPongResponse,
	ISuccessResponse,
	IPing
} from './frame-guest.service';
import { IDictionary } from '../../shared/types/Containers/IDictonary/IDictionary';

class FakeWindow {
	listeners: IDictionary<Function[]> = {};

	addEventListener(eventName: string, callback: Function) {
		this.listeners[eventName] = this.listeners[eventName]
			? [...this.listeners[eventName], callback]
			: [callback];
	}

	postMessage(message: any, origin: string) {
		if (this.listeners['message']) {
			this.listeners['message'].forEach(callback => callback(message));
		}
	}
}

describe('FrameGuestService', () => {
	beforeEach(done => {
		TestBed.configureTestingModule({
			providers: [FrameGuestService]
		});

		done();
	});

	it('should be created', inject([FrameGuestService], (fgs: FrameGuestService) => {
		expect(fgs).toBeTruthy();
	}));

	it('should return an observable', inject([FrameGuestService], (fgs: FrameGuestService) => {
		const messageObservable = fgs.Ping();
		expect(messageObservable instanceof Observable).toBeTruthy();
	}));

	it('should receive Pong when Ping is sent', done => {
		inject([FrameGuestService], (fgs: FrameGuestService) => {
			fgs.parent = window;

			fgs.parent.addEventListener('message', (event: MessageEvent) => {
				if (event.data.type === 'Ping') {
					const msg: IPongResponse = {
						type: 'Pong',
						pongId: event.data.pingId
					};
					// send Pong
					window.postMessage(msg, '*');
				}
			});

			fgs.Ping().subscribe(result => {
				// any pingId should be converted to a pongId
				expect('pingId' in result).toBeFalsy();

				// the pongId should be a guid of 36 chars
				expect(result.pongId.length).toBe(36);

				// the action discriminator should be 'Pong'
				expect(result.type).toBe('Pong');
				done();
			});
		})();
	});

	it('should request document height', done => {
		inject([FrameGuestService], (fgs: FrameGuestService) => {
			// these can be tested on the same window object because of ping/pong design
			fgs.setParent(window);

			// send the document height
			window.addEventListener('message', event => {
				if (event.data.pingId && event.data.type === 'RequestDocumentHeight') {
					const msg: IDocumentHeightResponse = {
						type: 'DocumentHeight',
						pongId: event.data.pingId,
						message: {
							documentHeight: 54321
						}
					};
					window.postMessage(msg, '*');
				}
			});

			fgs.RequestDocumentHeight().subscribe(documentHeightResult => {
				expect(documentHeightResult.message.documentHeight).toBe(54321);
				done();
			});
		})();
	});

	it('should request Contact Us modal to be displayed', done => {
		inject([FrameGuestService], (fgs: FrameGuestService) => {
			// these can be tested on the same window object because of ping/pong design
			fgs.parent = window;

			// reply
			window.addEventListener('message', event => {
				if (event.data.pingId && event.data.type === 'LaunchContactUs') {
					const msg: ISuccessResponse = {
						type: 'Success',
						pongId: event.data.pingId,
						message: {
							success: true
						}
					};
					window.postMessage(msg, '*');
				}
			});

			fgs.LaunchContactUs().subscribe(contactUsResponse => {
				expect(contactUsResponse.message.success).toBe(true);
				expect(contactUsResponse.pongId).toBeTruthy();
				done();
			});
		})();
	});

	it('should request File Upload modal to be LAUNCHED', done => {
		inject([FrameGuestService], (service: FrameGuestService) => {
			// these can be tested on the same window object because of ping/pong design
			service.parent = window;

			// set up reply handler
			window.addEventListener('message', event => {
				if (event.data.pingId && event.data.type === 'LaunchUpload') {
					let uploadResponse: ILaunchUploadResponse = {
						type: 'LaunchUpload',
						pongId: event.data.pingId,
						message: {
							uploads: [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()]
						}
					};
					window.postMessage(uploadResponse, '*');
				}
			});

			service.LaunchUpload().subscribe(uploadResponse => {
				expect(uploadResponse.message.uploads.length).toBeGreaterThan(0);
				expect(uploadResponse.pongId).toBeTruthy();
				done();
			});
		})();
	});

	it('should request File Upload modal to be DISMISSED', done => {
		inject([FrameGuestService], (service: FrameGuestService) => {
			// these can be tested on the same window object because of ping/pong design
			service.parent = window;

			// reply
			window.addEventListener('message', event => {
				if (event.data.pingId && event.data.type === 'DismissUpload') {
					let uploadResponse: ISuccessResponse = {
						type: 'Success',
						pongId: event.data.pingId,
						message: {
							success: true
						}
					};
					window.postMessage(uploadResponse, '*');
				}
			});

			//
			service

				// send the message
				.DismissUpload()

				// expect a response (not necessarily immediate)
				.subscribe(dismissModalResponse => {
					expect(dismissModalResponse.message.success).toBe(true);
					expect(dismissModalResponse.pongId).toBeTruthy();
					done();
				});
		})();
	});

	it('should distinguish identical simultaneous requests', done => {
		inject([FrameGuestService], (fgs: FrameGuestService) => {
			fgs.setParent(window);
			let pingCounter = jasmine.createSpy('Ping Counter');

			// Add listener to send replies.
			window.addEventListener('message', evt => {
				const ping = evt.data as IPing<null>;

				if (ping.type === 'Ping') {
					pingCounter();
					let pongMsg: IPongResponse = {
						type: 'Pong',
						pongId: ping.pingId
					};
					window.postMessage(pongMsg, '*');
				}
			});

			const ping1 = fgs.Ping(),
				ping2 = fgs.Ping(),
				ping3 = fgs.Ping(),
				ping4 = fgs.Ping();
			combineLatest([ping1, ping2, ping3, ping4]).subscribe(allDone => {
				expect(allDone.length).toBe(4);
				expect(pingCounter).toHaveBeenCalledTimes(4);
				done();
			});
		})();
	});
});
