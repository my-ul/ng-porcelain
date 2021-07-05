The table view module is used for building styled table view list items with aligned headers and the ability to sort columns
and interchange columns if rack component is used.

To use the List Module within your application, import the `ListsModule`.

```typescript
import { TableviewModule } from '@my-ul/ng-porcelain';

@NgModule({
	declarations: [
		/* ... */
	],
	imports: [TableviewModule],
	exports: [
		/* ... */
	]
})
export class MyApplicationModule {}
```

# Table View Header

The parent component is table view header and insdie it each block is table view header item.
The tableview header item takes an input width which should be same as for tableview columns so that they neatly aling in UI

```HTML
<p-tableview-header>
	<p-tableview-header-item [width]="column.width"
			   *ngFor="let column of getColumnValues()">
					<ng-container>
									<p-tableview-text-header>
										<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
									</p-tableview-text-header>
					</ng-container>
	</p-tableview-header-item>
</p-tableview-header>
```

# Table View Header Item

# Properties

| Property        | Type      | Description                                                                                                            |
| --------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `[width]`       | `number`  | A number between zero and one. All cells within a List Item component should have [width] inputs that sum to 1.        |
| `[alignTop]`    | `boolean` | When `true`, the contents of the cells will be at the top of the row of cells. Cells are middle aligned by default.    |
| `[alignBottom]` | `boolean` | When `true`, the contents of the cells will be at the bottom of the row of cells. Cells are middle aligned by default. |
| `[padAll]`      | `boolean` | When `true`, the contents of the cell will be wrapped with ~0.5em of spacing. Default `false`.                         |
| `[padTop]`      | `boolean` | When `true`, the contents of the cell will contain ~0.5em of padding at the top of the cell. Default `false`.          |
| `[padRight]`    | `boolean` | When `true`, the contents of the cell will contain ~0.5em of padding at the right of the cell. Default `false`.        |
| `[padBottom]`   | `boolean` | When `true`, the contents of the cell will contain ~0.5em of padding at the bottom of the cell. Default `false`.       |
| `[padLeft]`     | `boolean` | When `true`, the contents of the cell will contain ~0.5em of padding at the left of the cell. Default `false`.         |

```html
<p-tableview-header>
	<p-tableview-header-item [width]="1/5" [padAll]="true"> </p-tableview-header-item>
</p-tableview-header>
```

#Table View Text Header

Table view text header is just used to display the title value of the header. This should always be enclosed in </p-tableview-header-item>

```html
<p-tableview-text-header>
	<span innerHTML="{{column.label}}" title="{{column.label}}"></span>
</p-tableview-text-header>
```

# Table View Sort header

The Sort Header can be used to control sort variables within a Table view. This should always be enclosed in </p-tableview-header-item>

# Dual-Binding/Banana Box Sort Direction

This component supports banana-box/two-way binding notation for updating the values of `activeSortKey` and `activeSortDirection`.

# Inputs

| Property    | Type     | Description                                                                                                                                                                                                                                                                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[label]`   | `string` | User-visible label shown in the clickable portion of the sort header.                                                                                                                                                                                                                                                                             |
| `[sortKey]` | `string` | Sets the key that this sort header is responsible for toggling. When equal to `activeSortKey` are equal, the component will be in the `active` state. Typically, this is a constant value, wrapped in single quotes, but it can be a variable, which is useful for loops. This value should NOT change often, if ever, after the component loads. |

```html
<p-tableview-sort-header [label]=" 'Date Modified' " [sortKey]=" 'date' "></p-tableview-sort-header>
```

# Outputs

## `(onSortChange)` Output

The (onSortChange) output will emit the `sortKey` and the `sortDirection` in a tuple: `[sortKey, sortDirection]`. Use this to trigger any page load updates, as binding to the `activeSortKeyChange` and `activeSortColumnChange` may cause any bound actions to execute sporadically (twice in some cases, or not at all in others).

```html
<p-tableview-sort-header
	(onSortChange)=" updateList() "
	[(activeSortKey)]=" currentSortKey "
	[(activeSortDirection)]=" currentSortDirection "
></p-tableview-sort-header>
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
<p-tableview-sort-header [(activeSortKey)]=" currentSortColumn "></p-tableview-sort-header>
```

## `[activeSortKey]` Input

Set this to your application's current sort column. If `[sortKey]` and `[activeSortKey]` are equal with a valid `[activeSortDirection]`, the header will appear active.

Valid values are `null`, `'asc'` and `'desc'`.

## `(activeSortKeyChange)` Output

Fires whenever the `[activeSortKey]` is set to `[sortKey]`. Value can be accessed with `$event`.

```html
<p-tableview-sort-header (activeSortKeyChange)=" handleSortKeyChange($event) "></p-tableview-sort-header>
```

# `[(activeSortDirection)]` Two-Way Binding

## Banana-Box Binding

Use two-way binding to keep the sort-header and your application's sort column state in sync.

```html
<p-tableview-sort-header [(activeSortDirection)]=" myCurrentSortDirection "></p-tableview-sort-header>
```

## `[activeSortDirection]` Input Binding

Set the `activeSortDirection` from your application.

```html
<p-tableview-sort-header [activeSortDirection]=" myCurrentSortDirection "></p-tableview-sort-header>
```

## `(activeSortDirectionChange)` Output Binding

Bind a callback that will fire upon changes to `activeSortDirection`. `$event` will contain the new sort direction.

```html
<p-tableview-sort-header (activeSortDirectionChange)=" handleSortDirectionChange($event)">
</p-tableview-sort-header>
```

# Table View Data list and Body

The tableview list wraps the body content. All Error messages and unexception implementation includuing showing messages should be done with <p-tableview-list-body>

```html
<p-tableview-list>
	<p-tableview-list-body> </p-tableview-list-body>
</p-tableview-list>
```

# Table View list item and Table View list item cell

The table view list item and table view list item cell forms the row and columns. Use Dynamic columns type to maintain widths.
The widths of header andd table view list item should be same to be properly aligned.

The <p-tableview-list-item> has properly ElementIndex, for alternate background row colors to enabled pass array iterated number.

Incase to change the color values, use view child and access bgColorforListitem.

```typescript
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableviewListItemComponent } from '@my-ul/ng-porcelain';

@Component({})
export class MyApplicationModule {
	@ViewChild('tableViewListRow', { static: false }) list_item_row: TableviewListItemComponent;

	changecolor() {
		this.list_item_row.bgColorforListitem.oddColor = 'green';
		this.list_item_row.bgColorforListitem.evenColor = 'grey';
	}
}
```

```html
<p-tableview-list>
	<p-tableview-list-body>
		<p-tableview-list-item #tableViewListRow [ElementIndex]="i">
			<p-tableview-list-item-cell> </p-tableview-list-item-cell>
		</p-tableview-list-item>
	</p-tableview-list-body>
</p-tableview-list>
```

Incase there are multiple row , use viewchilder along with querylist and convert ToArray(). Then use forEach and change the color

To create column and row, use *ngfor list data for rendering <p-tableview-list-item> which will create row.
Then use <p-tableview-list-item-cell> *ngfor column data inside to genarate column data. Below is example.

```html
<p-tableview-list>
	<p-tableview-list-body>
		<ng-container *ngFor="let person of getListItems();let i = index">
			<p-tableview-list-item [ElementIndex]="i">
				<p-tableview-list-item-cell
					[width]="column.width"
					[padAll]="true"
					*ngFor="let column of getColumnValues()"
				>
					<ng-container *ngIf="column.key === 'last_name'">
						<strong>{{person.first_name}} {{person.last_name}}</strong>
					</ng-container>
					<ng-container *ngIf="column.key !== 'last_name'">
						<span>{{person[column.key]}}</span>
					</ng-container>
				</p-tableview-list-item-cell>
			</p-tableview-list-item>
		</ng-container>
	</p-tableview-list-body>
</p-tableview-list>
```
