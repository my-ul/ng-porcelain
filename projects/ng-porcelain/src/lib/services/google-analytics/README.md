The Google Analytics service is a proper Angular service wrapping the async Google Analytics
API. When Angular is in dev mode, events will be output to the console.

Replace references to `window._gaq` like this...

```typescript
declare _gaq;
@Component({
	// ...
})
export class MyComponent {
	constructor() {
		_gaq.push(['_trackPageview']);
	}
}
```

with

```typescript
import { GoogleAnalyticsService } from '@my-ul/ng-porcelain';

@Component({
	// ...
	providers: [GoogleAnalyticsService]
})
export class MyComponent {
	constructor(ga: GoogleAnalyticsService) {
		this.ga.push(['_trackPageview']);
	}
}
```
