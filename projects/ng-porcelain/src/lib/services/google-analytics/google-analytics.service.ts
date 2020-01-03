import { Injectable } from '@angular/core';

import { isDevMode } from '@angular/core';

export type GoogleAnalyticsEvent = string | number;

export interface IGoogleAnalytics {
	push(...events: GoogleAnalyticsEvent[]);
}

/**
 * Returns the current gaq instance.
 */
function getGaq(): IGoogleAnalytics {
	return window['_gaq'] || [];
}

@Injectable({
	providedIn: 'root'
})
export class GoogleAnalyticsService {
	/**
	 * Construct a new GoogleAnalyticsService
	 */
	constructor() {
		this.log('new GoogleAnalyticsService()', { isDevMode: isDevMode() });
	}

	/**
	 * Proxy for the ga asynchronous event api; when developing, logs events to console.
	 * @example
	 * 	this.googleAnalyticsService.push(['_trackPageview']);
	 */
	public push(...events: GoogleAnalyticsEvent[]) {
		if (isDevMode()) {
			events.forEach(this.log);
		}

		getGaq().push(...events);
	}

	/**
	 * Logs information to the console while in development mode.
	 */
	private log(...args) {
		if (isDevMode()) {
			console.log.apply(null, ['[GoogleAnalyticsService]'].concat(args));
		}
	}
}
