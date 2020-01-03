import { Injectable } from '@angular/core';
import { IDictionary } from '../../shared/types';
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

function _window(): Window {
	return window;
}

@Injectable({
	providedIn: 'root'
})
export class WindowService {
	constructor() {}

	get nativeWindow(): Window {
		return _window();
	}
}
