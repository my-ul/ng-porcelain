_since 1.13.0_

The Dynamic Header can be used to allow the end user to reorder columns.

Where the List Header is populated with static instances of Sort Header and Text Header, the Dynamic Header uses an array JavaScript objects to control appearance. These objects implement the DynamicHeader interface. These header references are built in your application, and can also be used to render the List Item Cell components.

# The `DynamicColumn` Interface

The `DynamicColumn` provides a thorough, easy-to-use type that makes it easy to compose columns for use in the Dynamic Header.

```typescript
export interface DynamicColumn {
	/**
	 * The user-visible label for the column
	 */
	label: string;

	/**
	 * The internal identifier used to identify/track the column.
	 * These values should be unique.
	 */
	key: string;

	/**
	 * Locks a column in the active state.  When `locked` is true, a column cannot be removed
	 */
	locked: boolean;

	/**
	 * The type of control to display for representing the column. Either 'text', 'search', or 'sort'.
	 */
	type: DynamicColumnType;

	/**
	 * A numeric representation of how wide the column should be.
	 * The sum of the `width` values should be less than or equal to 1
	 */
	width: number;
}
```

# Working with the column order

The Dynamic Header uses two-way binding to manage changes to the columns. Any external changes to the column order will be reflected immediately, and any changes made using drag-drop functionality will be published.

The simplest way to bind columns is with two-way binding.

In your template...

```html
<porcelain-dynamic-header [(columns)]="activeColumns"></porcelain-dynamic-header>
```

In your controller...

```typescript
import { DynamicColumn } from '@my-ul/ng-porcelain';

@Component(/* ... */)
export class MyComponent {
	activeColumns: DynamicColumn[] = [
		{
			label: 'Description',
			key: 'description',
			type: 'text',
			locked: false,
			width: 0.5
		},
		{
			label: 'Price',
			key: 'price',
			type: 'text',
			locked: false,
			width: 0.5
		}
	];
}
```

# Using Sort Headers

The Dynamic Header will aggregate changes to Sort Header instances and publish them via a number of bindings.

## Key Concepts

-   The Dynamic Column's `key` will be used as each column's `sortKey`.
-   Changes to the active sort are handled with three `@Output()` bindings. In order to use sort functionality, use bindings `activeSortKeyChange`, `activeSortDirectionChange` and `sortChange`.
-   Two output bindings, `activeSortKeyChange` and `activeSortDirectionChange`, can be used with two-way bindings to simplify implementation.

## Binding to `(sortChange)`

Sort change fires once per change to sort, and includes `sortKey` and `sortDirection`. The `$event` type is `SortTuple`. It's usage is similar to the other bindings.

In these examples, notice that `activeSortKey` and `activeSortDirection` are **not** using two-way binding.

In your template...

```html
<porcelain-dynamic-header
	[(columns)]="activeColumns"
	[activeSortKey]="activeSortKey"
	[activeSortDirection]="activeSortDirection"
	(sortChange)="updateSort($event)"
></porcelain-dynamic-header>
```

In your controller...

```typescript
import { DynamicColumn, SortTuple, SortDirection } from '@my-ul/ng-porcelain';

@Component(/* ... */)
export class MyComponent {
	activeColumns: DynamicColumn[] = [
		{
			label: 'Description',
			key: 'description',
			type: 'text',
			locked: false,
			width: 0.5
		}
		/** ... **/
	];

	activeSortKey: string = null;
	activeSortDirection: SortDirection = null;

	updateSort([activeSortKey, activeSortDirection]: SortTuple): void {
		this.activeSortKey = activeSortKey;
		this.activeSortDirection = activeSortDirection;

		this.updateList();
	}

	updateList() {
		this.listService.getList(this.activeSortKey, this.activeSortDirection).subscribe(updatedList => {
			this.list = updatedList;
		});
	}
}
```

## Alternative Bindings

Although most cases will probably use `(onSort)` bindings, it is possible to bind to sortKey and sortDirection changes separately.

### Binding to `(activeSortKeyChange)`

Whenever the sort column key changes, this output will receive an update.

In your template...

```html
<porcelain-dynamic-header
	[activeSortKey]="activeSortKey"
	(activeSortKeyChange)="updateActiveSortKey($event)"
></porcelain-dynamic-header>
```

In your controller...

```typescript
import { DynamicColumn } from '@my-ul/ng-porcelain';

@Component(/* ... */)
export class MyComponent {
	activeColumns: DynamicColumn[] = [
		{
			label: 'Description',
			key: 'description',
			type: 'text',
			locked: false,
			width: 0.5
		}
		/** ... **/
	];

	activeSortKey: string = null;

	updateActiveSortKey(activeSortKey: string): void {
		this.activeSortKey = activeSortKey;
		this.updateList();
	}

	updateList() {
		this.listService.getList(this.activeSortKey).subscribe(updatedList => {
			this.list = updatedList;
		});
	}
}
```

### Binding to `(activeSortDirectionChange)`

Whenever the active sort direction changes, this output will receive an update.

In your template...

```html
<porcelain-dynamic-header
	[activeSortDirection]="activeSortDirection"
	(activeSortDirectionChange)="updateActiveSortDirection($event)"
></porcelain-dynamic-header>
```

In your controller...

```typescript
import { DynamicColumn, SortDirection } from '@my-ul/ng-porcelain';

@Component(/* ... */)
export class MyComponent {
	activeColumns: DynamicColumn[] = [
		{
			label: 'Description',
			key: 'description',
			type: 'text',
			locked: false,
			width: 0.5
		}
		/** ... **/
	];

	activeSortKey: string = null;

	updateActiveSortKey(activeSortKey: string): void {
		this.activeSortKey = activeSortKey;
		// updateActiveSortDirection also calls this
		// this may result in two calls to updateList()
		// consider binding to (sortChange) instead.
		this.updateList();
	}

	activeSortDirection: SortDirection = null;

	updateActiveSortDirection(activeSortDirection: SortDirection): void {
		this.activeSortDirection = activeSortDirection;
		// updateActiveSortKey also calls this
		// this may result in two calls to updateList()
		// consider binding to (sortChange) instead.
		this.updateList();
	}

	updateList() {
		this.listService.getList(this.activeSortKey, this.activeSortDirection).subscribe(updatedList => {
			this.list = updatedList;
		});
	}
}
```

### Timing problems with `activeSortKeyChange` and `activeSortDirectionChange`

You may notice that when using the split bindings for `activeSortDirection` and `activeSortKey`, it becomes difficult to sanely trigger updates. Commonly, both of these may fire at once, which might cause excessive API calls. You might consider using a throttle/debounce to ensure that these aren't called too quickly, but these will rely on arbitrary timeouts.

For most cases, it is most sensible to use the `(sortChange)` output binding, as it emits a tuple containing both updated `activeSortKey` and `activeSortDirection` values. Implementations using `(sortChange)` do not need to rely on arbitrary timeouts (such as throttle/debounce). As an added benefit, there is typically less code needed for this implementation.

### Two-Way Binding with `[(activeSortKey)]` and `[(activeSortDirection)]`

It is possible to use two-way binding for activeSortKey and activeSortDirection. In most cases, you will need to use the (sortChange) output to trigger a list reload, so two-way binding, for most cases, is not recommended.

In your template...

```html
<porcelain-dynamic-header
	[(columns)]="activeColumns"
	[(activeSortKey)]="activeSortKey"
	[(activeSortDirection)]="activeSortDirection"
	(sortChange)="updateSort($event)"
></porcelain-dynamic-header>
```

In your controller...

```typescript
export class MyController {
	activeSortKey: string = null;
	activeSortDirection: SortDirection = null;

	updateSort(sort: SortTuple) {
		// activeSortKey and activeSortDirection
		// are assumed to be updated, but this isn't
		// a guarantee.  The `sort` argument IS
		// guaranteed to be most-recent.
		this.updateList();
	}
}
```

# Using Search Headers

In addition to offering controls to sort, the Search Header can be toggled to offer keyword search for values in a column. These values can perform in-memory searches or reach out to an API for a more exhaustive search.

Since the Search Header offers support for Sort, it offers the same event bindings as the Sort Header, but also offers two Angular `@Output` bindings to support searching.

## Key Concepts

-   The Search header offers a toggle to switch between Search and Sort functionality.
-   The Sort outputs of the Search Header are bound using the Sort Header API. Your application will need to bind an adequate combination of `[activeSortKey]`, `[activeSortDirection]`, `(activeSortKeyChange)`, `(activeSortDirectionChange)`, and `(sortChange)` in addition to search bindings.
-   Most sort cases can be supported with just `[activeSortKey]`, `[activeSortDirection]` and `(sortChange)`.
-   Search functionality provides two-way binding for the query, as well as @Output bindings for the search submit and search clear events.

## Binding the search query

The search query field supports two-way binding. This will keep your application up-to-date with internal state of the search input.

In your template...

```html
<porcelain-dynamic-header [(query)]="searchQuery"></porcelain-dynamic-header>
```

In your controller...

```typescript
export class MyController {
	searchQuery: string = '';
}
```

### Using split binding

If you do not want to use the two-way binding syntax for the search query, you can split it.

The `(queryChange)` binding will be called with every keystroke, so do not bind it to any expensive operations, such as an API call. If you are building live search functionality, you may benefit from rxjs debounce.

In your template...

```html
<porcelain-dynamic-header
	[query]="searchQuery"
	(queryChange)="queryChanged($event)"
></porcelain-dynamic-header>
```

In your controller...

```typescript
export class MyController {
	searchQuery: string = '';

	queryChanged(searchQuery: string) {
		if (this.searchQuery !== searchQuery) {
			this.searchQuery = searchQuery;
		}
	}
}
```

### Debouncing the `(queryChange)` Output.

Some applications of the Search Header might want semi-live updating of search results. To safely implement this, using rxjs `debounceTime` and `throttleTime` may help.

The `debounceTime` operator will emit the last value over a specified interval, whereas the `throttleTime` operator will emit the first value and wait the specified interval before emitting again.

In your template...

```html
<porcelain-dynamic-header
	[query]="searchQuery"
	(queryChange)="queryChanged($event)"
></porcelain-dynamic-header>
```

In your controller...

```typescript
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

class Widget {
	widget_id?: number;
	name: string;
}

export class MyController {
	query$: Subject<string> = new Subject();
	results: any[] = null;

	constructor(public widgetService: WidgetService) {
		// Use a debounced observable to slow down queries
		this.query$
			.pipe(
				// after 200 ms, take the last update
				debounceTime(200),
				// turn this observable into another
				map(query => this.search(query))
			)
			.subscribe(results => (this.results = results));
	}

	queryChanged(query: string) {
		this.query$.next(query);
	}

	search(query: string): Observable<Widget[]> {
		return this.widgetService.search(query);
	}
}
```

## Binding the `(queryChange)` Output

The queryChange Output will fire when a new search query is available. The emitted `$event` is a dictionary containing column search values. The dictionary will be keyed with the `column.key` property. If a user clears a search input, the key will be removed from the dictionary.

Take the following column, for example.

```typescript
let column = {
	label: 'Description',
	key: 'description',
	locked: false,
	type: 'search',
	width: 1 / 2
};
```

If a user typed "television" as a search query, the following object would be returned on the `(queryChange)` output:

```json
{
	"description": "television"
}
```

You can do whatever you need to with this object. Commonly, you might want to lowercase or uppercase the value so that the string will be matched for any case.

In your template...

```html
<porcelain-dynamic-header (queryChange)="search($event)"></porcelain-dynamic-header>
```

In your controller...

```typescript
export class MyController {
	searchQuery: string = '';

	search(searchQuery: DynamicSearchQuery): void {
		// use DynamicSearchQuery
	}
}
```
