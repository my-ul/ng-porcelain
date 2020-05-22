The Refiners component is a macro that will automatically build a series of Refiners (Simple and Date), resulting in less template code, allowing developers to rely on type-checked definitions.

# Basic Usage

```html
<porcelain-refiners
	[refiners]="refiners"
	(onRefinersChange)="refinersChange($event)"
></porcelain-refiners>
```

Your component should include a refiner array definition and a callback function to be called when a values have changed.

```typescript
class MyComponent {
	refiners = [
		new DateRefiner({
			slug: 'modifiedRange',
			title: 'Modified'
			// options: null // OMIT to use the default ranges
		}),
		new SimpleRefiner({
			slug: 'mySimpleRefiner',
			title: 'Select three options',
			options: {
				optionKey1: 'Option Value One',
				optionKey2: 'Option Value Two',
				optionKey3: 'Option Value Three'
			}
		})
	];
	refinersChange() {
		console.log('refiners update', args);
	}
}
```
