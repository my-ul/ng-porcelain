# Options with custom `showCount`

The number of options shown by default can be configured. Simply pass the `showCount` property.

```html
<app-option-refiner showCount="1" refiner="refiner"></app-option-refiner>
```

The `showCount` can also be defined programmatically by the `OptionRefiner` definition.

```typescript
let myRefiner = new OptionRefiner({
	showCount: 5,
	slug: 'my-refiner',
	title: 'My Refiner'
});
```
