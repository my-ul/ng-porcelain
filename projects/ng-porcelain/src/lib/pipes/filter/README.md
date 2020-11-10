Filter an array of items using an Angular pipe.

# Arguments

## `query: string` Search Query

A string representing the search query.

## `isObjectArray: boolean`

Set to true to filter each item on its `labelProp` property.

## `labelProp: string`

Property on each item to use for the filter.

# Usage

## Filter an array of strings (default)

```ts
export class MyComponent {
	searchQuery = '';
	items = ['Apple', 'Banana', 'Cherry', 'Durian'];
}
```

```html
<input [(ngModel)]="searchQuery" placeholder="filter the list..." />
<li *ngFor="let item of items | filter : searchQuery">
	{{item}}
</li>
```

## Filter an array of objects

Note the use of the third (`true`) and fourth (`'type'`) properties in `*ngFor`.

```ts
export class MyComponent {
	searchQuery = '';
	items = [
		{ id: '5001', type: 'None' },
		{ id: '5002', type: 'Glazed' },
		{ id: '5005', type: 'Sugar' },
		{ id: '5007', type: 'Powdered Sugar' },
		{ id: '5006', type: 'Chocolate with Sprinkles' },
		{ id: '5003', type: 'Chocolate' },
		{ id: '5004', type: 'Maple' }
	];
}
```

```html
<input [(ngModel)]="searchQuery" placeholder="filter the list..." />
<li *ngFor="let item of items | filter : searchQuery : true : 'type' ">
	{{item.type}} ({{item.id}})
</li>
```
