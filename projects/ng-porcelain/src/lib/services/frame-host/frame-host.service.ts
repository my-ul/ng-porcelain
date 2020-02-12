import { Injectable } from '@angular/core';
import { WindowService } from '../window/window.service';
import { IPing, ISuccessResponse, MessageType, IPongResponse } from '../frame-guest/frame-guest.service';
import { of, Observable, Subject } from 'rxjs';
import { IDictionary } from '../../shared/types/Containers/IDictonary/IDictionary';

@Injectable({
	providedIn: 'root'
})
export class FrameHostService {
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
	private subjects: IDictionary<Subject<any>>;
	private window: Window;

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
	public getMessageSubject(messageType: MessageType): Observable<any> {
		if (messageType in this.subjects) {
			return this.subjects[messageType].asObservable();
		} else {
			return null;
		}
	}

	/**
	 * Set the window to a different window object. Useful for unit testing.
	 * @param newWindow
	 */
	public setWindow(newWindow: Window) {
		if (this.window) this.removeEvent(this.window, 'message', this.listener);

		this.window = newWindow;

		this.addEvent(this.window, 'message', this.listener);
	}

	private addEvent(obj, type, fn) {
		if (obj.attachEvent) {
			obj['e' + type + fn] = fn;
			obj[type + fn] = function() {
				obj['e' + type + fn](window.event);
			};
			obj.attachEvent('on' + type, obj[type + fn]);
		} else obj.addEventListener(type, fn, false);
	}

	/**
	 * Triggers the subject responsible for propagating state.
	 * @param event A MessageEvent containing the message.
	 */
	private handleRegisteredMessage(event: MessageEvent) {
		return this.subjects[event.data.type].next({
			message: event.data as IPing<any>,
			done: (response: any) => {
				this.send(response, event);
			}
		});
	}

	private removeEvent(obj, type, fn) {
		if (obj.detachEvent) {
			obj.detachEvent('on' + type, obj[type + fn]);
			obj[type + fn] = null;
		} else obj.removeEventListener(type, fn, false);
	}

	private send(response: any, initialEvent: MessageEvent) {
		if (initialEvent.source) {
			(initialEvent.source as Window).postMessage(response, initialEvent.origin);
		}
	}
}
