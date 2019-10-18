import { Injectable } from '@angular/core';
import { IDictionary } from '../../shared/types/IDictionary';
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

// export interface WindowLike {
// 	// #region Properties (1)

// 	parent: WindowLike;

// 	// #endregion Properties (1)

// 	// #region Methods (2)

// 	addEventListener(eventName: string, listener: (evt: Event) => void);
// 	removeEventListener(eventName: string, listener: (evt: Event) => void);
// 	postMessage(message: any, origin: string);

// 	// #endregion Methods (2)
// }

// export class FakeWindow implements WindowLike {
// 	// #region Properties (1)

// 	private eventListeners: IDictionary<Function[]> = {};

// 	// #endregion Properties (1)

// 	// #region Constructors (1)

// 	constructor(public parent: WindowLike = null) {}

// 	// #endregion Constructors (1)

// 	// #region Public Methods (2)

// 	public addEventListener(eventName: string, listener: (evt: Event) => void) {
// 		console.log('addEventListener called', { arguments });
// 		if (this.eventListeners[eventName]) {
// 			this.eventListeners[eventName].push(listener);
// 		} else {
// 			this.eventListeners[eventName] = [listener];
// 		}
// 	}

// 	public removeEventListener(eventName: string, listener: (evt: Event) => void) {
// 		if (this.eventListeners[eventName]) {
// 			if (listener) {
// 				var index = this.eventListeners[eventName].indexOf(listener);
// 				if (index > -1) {
// 					this.eventListeners[eventName].splice(index, 1);
// 				}
// 			} else {
// 				this.eventListeners[eventName] = [];
// 			}
// 		}
// 	}

// 	source: WindowLike;

// 	public setSource(source: any) {
// 		this.source = source;
// 	}

// 	public postMessage(message: any, origin: string) {
// 		this.trigger('message', {
// 			data: message,
// 			source: this.source,
// 			origin: origin
// 		} as MessageEvent);
// 	}

// 	// #endregion Public Methods (2)

// 	// #region Private Methods (1)

// 	private trigger(eventName: string, ...args: any[]) {
// 		if (this.eventListeners[eventName]) {
// 			this.eventListeners[eventName].forEach(callback => {
// 				callback.apply(this, args);
// 			});
// 		}
// 	}

// 	// #endregion Private Methods (1)
// }

// export class FakeWindowService {
// 	get nativeWindow(): WindowLike {
// 		return new FakeWindow();
// 	}
// }

function _window(): Window {
	return window;
}

@Injectable({
	providedIn: 'root'
})
export class WindowService {
	// #region Constructors (1)

	constructor() {}

	// #endregion Constructors (1)

	// #region Public Accessors (1)

	get nativeWindow(): Window {
		return _window();
	}

	// #endregion Public Methods (1)
}
