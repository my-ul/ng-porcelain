import { Injectable } from '@angular/core';
import { Observable, observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as _guid from 'uuid/v4';
const guid = _guid;
import { WindowService } from '../window/window.service';

export type MessageType =
	| 'Ping'
	| 'DismissUpload'
	| 'LaunchContactUs'
	| 'LaunchUpload'
	| 'Ping'
	| 'RequestDocumentHeight'
	| 'SetChildLoaded';

export interface IMessage<T> {
	// #region Properties (2)

	message?: T;
	type: string;

	// #endregion Properties (2)
}

export interface IPing<T> extends IMessage<T> {
	// #region Properties (2)

	pingId: string;
	type: MessageType;

	// #endregion Properties (2)
}

export interface IPong<T> extends IMessage<T> {
	// #region Properties (3)

	message?: T;
	pongId: string;
	type: string;

	// #endregion Properties (3)
}

export interface IPongMessage {}

export interface IPongResponse extends IPong<IPongMessage> {
	// #region Properties (2)

	message?: {};

	type: 'Pong';

	// #endregion Properties (2)
}

export interface IDocumentHeightMessage {
	// #region Properties (1)

	documentHeight: number;

	// #endregion Properties (1)
}

export interface IDocumentHeightResponse extends IPong<IDocumentHeightMessage> {
	// #region Properties (1)

	type: 'DocumentHeight';

	// #endregion Properties (1)
}

export interface ILaunchUploadMessage {
	// #region Properties (1)

	uploads: string[];

	// #endregion Properties (1)
}

export interface ILaunchUploadResponse extends IPong<ILaunchUploadMessage> {
	// #region Properties (1)

	type: 'LaunchUpload';

	// #endregion Properties (1)
}

export interface ISuccessMessage {
	// #region Properties (1)

	success: boolean;

	// #endregion Properties (1)
}

export interface ISuccessResponse extends IPong<ISuccessMessage> {
	// #region Properties (1)

	type: 'Success';

	// #endregion Properties (1)
}

export interface ISetChildLoadedMessage {}

export interface ISetChildLoadedResponse extends IPong<ISetChildLoadedMessage> {
	// #region Properties (1)

	type: 'SetChildLoaded';

	// #endregion Properties (1)
}

@Injectable({
	providedIn: 'root'
})
export class FrameGuestService {
	// #region Properties (1)

	public parent: Window;

	// #endregion Properties (1)

	// #region Constructors (1)

	constructor(private windowService: WindowService) {
		if (windowService.nativeWindow.parent) {
			this.setParent(windowService.nativeWindow.parent);
		}
	}

	setParent(newParent: Window) {
		this.parent = newParent;
	}

	// #endregion Constructors (1)

	// #region Public Methods (6)

	public DismissUpload(): Observable<ISuccessResponse> {
		return this.send<null>({
			type: 'DismissUpload'
		}) as Observable<ISuccessResponse>;
	}

	public LaunchContactUs(): Observable<ISuccessResponse> {
		return this.send({
			type: 'LaunchContactUs'
		}) as Observable<ISuccessResponse>;
	}

	public LaunchUpload(): Observable<ILaunchUploadResponse> {
		return this.send({
			type: 'LaunchUpload'
		}) as Observable<ILaunchUploadResponse>;
	}

	public Ping(): Observable<IPongResponse> {
		return this.send({
			type: 'Ping'
		}) as Observable<IPongResponse>;
	}

	public RequestDocumentHeight(): Observable<IDocumentHeightResponse> {
		return this.send({
			type: 'RequestDocumentHeight'
		}) as Observable<IDocumentHeightResponse>;
	}

	public SetChildLoaded(): Observable<ISetChildLoadedResponse> {
		return this.send({
			type: 'SetChildLoaded',
			message: false
		}) as Observable<ISetChildLoadedResponse>;
	}

	// #endregion Public Methods (6)

	// #region Private Methods (1)

	/**
	 * Injects a pingId into the message and sends to window.parent.
	 * @param message A message to send to the parent frame
	 */
	private send<T>(message: IMessage<T>, pingId: string = guid()): Observable<any> {
		if (this.parent) {
			const taggedMessage = Object.assign(message, {
				pingId
			});

			this.parent.postMessage(taggedMessage, '*');

			// returns observable to allow reply
			return fromEvent(this.parent, 'message').pipe(
				filter((messageEvent: MessageEvent) => messageEvent.data.pongId === pingId),
				map((messageEvent: MessageEvent) => messageEvent.data)
			);
		}
		return null;
	}

	// #endregion Private Methods (1)
}
