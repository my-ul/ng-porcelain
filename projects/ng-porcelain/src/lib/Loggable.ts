import { isDevMode } from '@angular/core';

export interface ILoggable {
	readonly name: string;
}
/**
 * Loggable abstract class to bring log functions to components.  Logging is silenced in production.
 */
export abstract class Loggable implements ILoggable {
	abstract readonly name: string;
	alwaysLog: boolean = false;

	constructor() {}

	forceLog(): this {
		this.alwaysLog = true;
		return this;
	}

	count(label: string) {
		if (isDevMode() || this.alwaysLog) {
			console.count(label);
		}
		this.alwaysLog = false;
	}

	debug(...subjects) {
		if (isDevMode() || this.alwaysLog) {
			console.debug(`[${this.name}]`, ...subjects);
		}
		this.alwaysLog = false;
	}

	error(...subjects) {
		if (isDevMode() || this.alwaysLog) {
			console.error(`[${this.name}]`, ...subjects);
		}
		this.alwaysLog = false;
	}

	info(...subjects) {
		if (isDevMode() || this.alwaysLog) {
			console.info(`[${this.name}]`, ...subjects);
		}
		this.alwaysLog = false;
	}

	log(...subjects) {
		if (isDevMode() || this.alwaysLog) {
			console.log(`[${this.name}]`, ...subjects);
		}
		this.alwaysLog = false;
	}

	table(...data) {
		if (isDevMode() || this.alwaysLog) {
			console.table(...data);
		}
		this.alwaysLog = false;
	}

	trace(...subjects) {
		if (isDevMode() || this.alwaysLog) {
			console.trace(`[${this.name}]`, ...subjects);
		}
		this.alwaysLog = false;
	}

	warn(...subjects) {
		if (isDevMode() || this.alwaysLog) {
			console.warn(`[${this.name}]`, ...subjects);
		}
		this.alwaysLog = false;
	}
}
