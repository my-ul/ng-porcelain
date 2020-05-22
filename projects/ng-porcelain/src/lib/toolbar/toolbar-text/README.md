The Toolbar Text component allows the placement of arbitrary text within a toolbar cell. This can be used near other controls, such as a Toolbar Option or Toolbar Button, to provide context about the purpose of those controls. For example, a Toolbar Text could be placed near a Toolbar Button to describe the state of pagination.

# Props

-   `[alignRight]` - true if you want the text aligned right
-   `[alignCenter]` - true if you want the text centered
-   `[noWrap]` - true if you don't want your text to break into lines

```html
<porcelain-toolbar-cell ...>
	<porcelain-toolbar-text [alignRight]="true" [alignCenter]="true" [noWrap]="true">
		{{totalResultCount.toLocaleString()}} Results
	</porcelain-toolbar-text>
</porcelain-toolbar-cell>
```
