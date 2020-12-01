Allow a user to search and select pre-populated values.

# Usage

## Array of strings as items

```typescript
export class MyComponent {
	fruits: ['Apple', 'Banana', 'Cherry', 'Durian'];
	currentFruit: 'Apple';
}
```

```html
<porcelain-combobox [items]="fruits" [(value)]="currentFruit"></porcelain-combobox>
```

## Array of objects as items

Use an array of objects as items. Selecting a value returns the entire object, not just the label.

```typescript
export class MyComponent {
	fruits: [
		{
			color: 'red';
			name: 'Apple';
		},
		{
			color: 'yellow';
			name: 'Banana';
		},
		{
			color: 'darkred';
			name: 'Cherry';
		},
		{
			color: 'lightyellow';
			name: 'Durian';
		}
	];

	currentFruit: 'Apple';
}
```

```html
<porcelain-combobox
	[items]="fruits"
	[isObjectArray]="true"
	[labelProp]="name"
	[(value)]="currentFruit"
></porcelain-combobox>
```
