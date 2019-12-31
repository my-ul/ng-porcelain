import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from './translation/translation.service';
import { GoogleAnalyticsService } from './google-analytics/google-analytics.service';

@NgModule({
	imports: [CommonModule],
	declarations: [],
	providers: [TranslationService, GoogleAnalyticsService]
})
export class ServicesModule {
	constructor() {
		console.warn('Do not use porcelain ServicesModule directly.  Inject services using providers.');
	}
}
