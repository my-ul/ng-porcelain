Services can be used to provide application-wide functionalities like translation and analytics to your application.

Inject services directly into your components.

```typescript
export class MyComponent {
	constructor(
		public translationService: TranslationService,
		public googleAnalyticsService: GoogleAnalyticsService
	) {}
}
```
