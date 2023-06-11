import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WindowService } from '../window/window.service';
import { v4 as uuid } from 'uuid';

export type MessageType =
	| 'Ping'
	| 'DismissUpload'
	| 'LaunchContactUs'
	| 'LaunchUpload'
	| 'Ping'
	| 'RequestDocumentHeight'
	| 'SetChildLoaded';

export interface IMessage<T> {
	message?: T;
	type: string;
}

export interface IPing<T> extends IMessage<T> {
	pingId: string;
	type: MessageType;
}

export interface IPong<T> extends IMessage<T> {
	message?: T;
	pongId: string;
	type: string;
}

export interface IPongMessage {}

export interface IPongResponse extends IPong<IPongMessage> {
	message?: {};
	type: 'Pong';
}

export interface IDocumentHeightMessage {
	documentHeight: number;
}

export interface IDocumentHeightResponse extends IPong<IDocumentHeightMessage> {
	type: 'DocumentHeight';
}

export interface ILaunchUploadMessage {
	uploads: string[];
}

export interface ILaunchUploadResponse extends IPong<ILaunchUploadMessage> {
	type: 'LaunchUpload';
}

export interface ISuccessMessage {
	success: boolean;
}

export interface ISuccessResponse extends IPong<ISuccessMessage> {
	type: 'Success';
}

export interface ISetChildLoadedMessage {}

export interface ISetChildLoadedResponse extends IPong<ISetChildLoadedMessage> {
	type: 'SetChildLoaded';
}

@Injectable({
	providedIn: 'root'
})
export class FrameGuestService {
	public parent: Window;

	constructor(private windowService: WindowService) {
		if (windowService.nativeWindow.parent) {
			this.setParent(windowService.nativeWindow.parent);
		}
	}

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

	public setParent(newParent: Window) {
		this.parent = newParent;
	}

	/**
	 * Injects a pingId into the message and sends to window.parent.
	 * @param message A message to send to the parent frame
	 */
	private send<T>(message: IMessage<T>, pingId: string = uuid()): Observable<any> {
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
}
