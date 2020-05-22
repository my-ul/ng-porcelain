Use the translation to reliably subscribe to a translation dictionary.

```typescript
import { TranslationService } from '@my-ul/ng-porcelain';

@Component({
	// ... //
	providers: [TranslationService]
})
class MyComponent {
	// Define labels as defaults
	applyLabel: string = 'Apply';
	cancelLabel: string = 'Cancel';
	resetLabel: string = 'Reset';

	constructor(private translationService: TranslationService) {
		translationService.getTranslations().subscribe(
			// Optional static translate method makes installing translations simple
			TranslationService.translate(this, {
				label_Apply: 'applyLabel',
				label_Cancel: 'cancelLabel',
				label_Reset: 'resetLabel'
			})
		);
	}
}
```
