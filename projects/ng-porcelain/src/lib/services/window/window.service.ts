import { Injectable } from '@angular/core';

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
