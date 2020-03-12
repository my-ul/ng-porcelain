import { Injectable } from '@angular/core';

import { isDevMode } from '@angular/core';
import { Loggable } from '../../Loggable';

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
export class GoogleAnalyticsService extends Loggable {
	name = 'GoogleAnalyticsService';
	/**
	 * Construct a new GoogleAnalyticsService
	 */
	constructor() {
		super();
		this.log('new GoogleAnalyticsService()');
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
}
