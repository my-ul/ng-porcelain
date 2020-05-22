The List Item Cell defines a cell within a List Item. This typically corresponds to a property within an entity that is being looped.

# Properties

| Property        | Type      | Description                                                                                                            |
| --------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `[width]`       | `number`  | A number between zero and one. All cells within a List Item component should have [width] inputs that sum to 1.        |
| `[alignTop]`    | `boolean` | When `true`, the contents of the cells will be at the top of the row of cells. Cells are middle aligned by default.    |
| `[alignBottom]` | `boolean` | When `true`, the contents of the cells will be at the bottom of the row of cells. Cells are middle aligned by default. |
| `[padAll]`      | `boolean` | When `true`, the contents of the cell will be wrapped with ~20px of spacing. Default `false`.                          |
| `[padTop]`      | `boolean` | When `true`, the contents of the cell will contain ~20px of padding at the top of the cell. Default `false`.           |
| `[padRight]`    | `boolean` | When `true`, the contents of the cell will contain ~20px of padding at the right of the cell. Default `false`.         |
| `[padBottom]`   | `boolean` | When `true`, the contents of the cell will contain ~20px of padding at the bottom of the cell. Default `false`.        |
| `[padLeft]`     | `boolean` | When `true`, the contents of the cell will contain ~20px of padding at the left of the cell. Default `false`.          |

# Example

```html
<porcelain-list-item>
	<porcelain-list-item-cell [width]="1/5" [padAll]="true">
		{{ item.price | currency : 'USD' }}
	</porcelain-list-item-cell>
</porcelain-list-item>
```
