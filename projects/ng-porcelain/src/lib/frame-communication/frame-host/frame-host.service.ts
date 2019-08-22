import { Injectable } from '@angular/core';
import { WindowService } from '../window/window.service';
import { IPing, ISuccessResponse, MessageType, IPongResponse } from '../frame-guest/frame-guest.service';
import { of, Observable, Subject } from 'rxjs';
import { IDictionary } from '../../shared';

@Injectable({
	providedIn: 'root'
})
export class FrameHostService {
	private window: Window;

	private subjects: IDictionary<Subject<any>>;

	private listener = (event: MessageEvent) => {
		const msg = event.data as IPing<any>;
		if (msg.type) {
			switch (msg.type) {
				case 'DismissUpload':
				case 'LaunchContactUs':
				case 'LaunchUpload':
				case 'Ping':
				case 'RequestDocumentHeight':
				case 'SetChildLoaded':
					return this.handleRegisteredMessage(event);
			}
		}
	};

	public setWindow(newWindow: Window) {
		if (this.window) this.window.removeEventListener('message', this.listener);

		this.window = newWindow;

		this.window.addEventListener('message', this.listener);
	}

	constructor(private windowService: WindowService) {
		this.subjects = {
			DismissUpload: new Subject(),
			LaunchContactUs: new Subject(),
			LaunchUpload: new Subject(),
			Ping: new Subject(),
			RequestDocumentHeight: new Subject(),
			SetChildLoaded: new Subject()
		};

		this.setWindow(this.windowService.nativeWindow);
	}

	/**
	 * Allow an external event to get an observable that emits when the event happens.
	 * @param messageType
	 */
	getMessageSubject(messageType: MessageType): Observable<any> {
		if (messageType in this.subjects) {
			return this.subjects[messageType].asObservable();
		} else {
			return null;
		}
	}

	private send(response: any, initialEvent: MessageEvent) {
		if (initialEvent.source) {
			(initialEvent.source as Window).postMessage(response, initialEvent.origin);
		}
	}

	private handleRegisteredMessage(event: MessageEvent) {
		return this.subjects[event.data.type].next({
			message: event.data as IPing<any>,
			done: (response: any) => {
				this.send(response, event);
			}
		});
	}
}
