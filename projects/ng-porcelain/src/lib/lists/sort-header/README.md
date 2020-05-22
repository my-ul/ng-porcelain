The Sort Header can be used to control sort variables within a list view.

# Dual-Binding/Banana Box Sort Direction

This component supports banana-box/two-way binding notation for updating the values of `activeSortKey` and `activeSortDirection`.

# Inputs

| Property    | Type     | Description                                                                                                                                                                                                                                                                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[label]`   | `string` | User-visible label shown in the clickable portion of the sort header.                                                                                                                                                                                                                                                                             |
| `[sortKey]` | `string` | Sets the key that this sort header is responsible for toggling. When equal to `activeSortKey` are equal, the component will be in the `active` state. Typically, this is a constant value, wrapped in single quotes, but it can be a variable, which is useful for loops. This value should NOT change often, if ever, after the component loads. |

```html
<porcelain-sort-header [label]=" 'Date Modified' " [sortKey]=" 'date' "></porcelain-sort-header>
```

# Outputs

## `(onSortChange)` Output

The (onSortChange) output will emit the `sortKey` and the `sortDirection` in a tuple: `[sortKey, sortDirection]`. Use this to trigger any page load updates, as binding to the `activeSortKeyChange` and `activeSortColumnChange` may cause any bound actions to execute sporadically (twice in some cases, or not at all in others).

```html
<porcelain-sort-header
	(onSortChange)=" updateList() "
	[(activeSortKey)]=" currentSortKey "
	[(activeSortDirection)]=" currentSortDirection "
></porcelain-sort-header>
```

The following code pattern can be used to refresh a list after the sort fields are modified.

```typescript
@Component({
	// ...
})
export class MyComponent {
	public currentSortKey;
	public currentSortDirection;

	constructor(public listService: ListService) {
		this.resetSort();
	}

	resetSort() {
		this.currentSortKey = 'price';
		this.currentSortDirection = 'asc';
	}

	updateList() {
		this.listService
			.getList({
				sortKey: this.currentSortKey,
				sortDirection: this.currentSortDirection
			})
			.subscribe(newListItems => {
				this.items = newListItems;
			});
	}
}
```

# `activeSortKey` Two-Way Binding

Binds the current active sort column from your component. Can be split into `@Input`/`@Output` bindings if you need a callback, although this is not recommended in favor of `(onSortChange)`, which fires a callback once per toggle.

## `[(activeSortKey)]` Two-Way Binding

Set to the application's current sort column. When equal to `[sortKey]`, the component will be in the `active` state.

```html
<porcelain-sort-header [(activeSortKey)]=" currentSortColumn "></porcelain-sort-header>
```

## `[activeSortKey]` Input

Set this to your application's current sort column. If `[sortKey]` and `[activeSortKey]` are equal with a valid `[activeSortDirection]`, the header will appear active.

Valid values are `null`, `'asc'` and `'desc'`.

## `(activeSortKeyChange)` Output

Fires whenever the `[activeSortKey]` is set to `[sortKey]`. Value can be accessed with `$event`.

```html
<porcelain-sort-header (activeSortKeyChange)=" handleSortKeyChange($event) "></porcelain-sort-header>
```

# `[(activeSortDirection)]` Two-Way Binding

## Banana-Box Binding

Use two-way binding to keep the sort-header and your application's sort column state in sync.

```html
<porcelain-sort-header [(activeSortDirection)]=" myCurrentSortDirection "></porcelain-sort-header>
```

## `[activeSortDirection]` Input Binding

Set the `activeSortDirection` from your application.

```html
<porcelain-sort-header [activeSortDirection]=" myCurrentSortDirection "></porcelain-sort-header>
```

## `(activeSortDirectionChange)` Output Binding

Bind a callback that will fire upon changes to `activeSortDirection`. `$event` will contain the new sort direction.

```html
<porcelain-sort-header (activeSortDirectionChange)=" handleSortDirectionChange($event)">
</porcelain-sort-header>
```
