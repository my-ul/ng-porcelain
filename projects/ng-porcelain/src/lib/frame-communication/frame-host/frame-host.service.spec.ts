import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MessageType, IPongResponse } from '../frame-guest/frame-guest.service';
import { FrameHostService } from './frame-host.service';

describe('FrameHostService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FrameHostService]
		});
	});

	it('should be created', inject([FrameHostService], (service: FrameHostService) => {
		expect(service).toBeTruthy();
	}));

	it('should return Observables', done => {
		inject([FrameHostService], (fhs: FrameHostService) => {
			[
				'DismissUpload',
				'LaunchContactUs',
				'LaunchUpload',
				'Ping',
				'RequestDocumentHeight',
				'SetChildLoaded'
			].forEach(eventName => {
				let obs = fhs.getMessageSubject(eventName as MessageType);
				expect(obs instanceof Observable).toBeTruthy();
			});

			done();
		})();
	});

	it('should return null for an unsupported event', done => {
		inject([FrameHostService], (fhs: FrameHostService) => {
			let obs = fhs.getMessageSubject('this event does not exist' as MessageType);

			expect(obs).toBeNull();

			done();
		})();
	});

	it('should receive Ping and send Pong', done => {
		inject([FrameHostService], (fhs: FrameHostService) => {
			// Guest handler
			window.addEventListener('message', evt => {
				let pong = evt.data as IPongResponse;
				if (pong.pongId) {
					expect(pong.pongId).toBe('-is-ping-id-');
					done();
				}
			});

			// Host gets Ping and replies Pong
			fhs.getMessageSubject('Ping').subscribe(ping => {
				if (ping.pingId) {
					expect(ping.pingId).toBe('-is-ping-id-');
					ping.done({ type: 'Pong', pongId: ping.pingId });
				}
			});

			// Send message from Guest
			window.postMessage(
				{
					type: 'Ping',
					pingId: '-is-ping-id-'
				},
				'*'
			);
		})();
	});
});
