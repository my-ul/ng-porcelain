# Simple Refiner Definiion

For speed and simplicity, a simple key-value dictionary can be provided as the `refiner` value.

`DateRefiner` does not require an `options` property in its `RefinerDefinition`.

## src/my-component/my.component.ts
```typescript
@Component({
	imports: [DateRefinerComponent]
})
class MyComponent {
	
	refiner: RefinerDefinition;

	myCallbackFunction() {
		console.log('notification from DateRefiner', arguments);
	}
	ngOnInit() {
		this.refiner = new RefinerDefinition({
			title: 'Modified',
			slug: 'modified'
			type: 'date'
		})
	}
}
```

## src/my-component/my.component.html
```html
<div class="my-refiners">
	<app-date-refiner refiner="refiner"></app-date-refiner>
</div>
```
