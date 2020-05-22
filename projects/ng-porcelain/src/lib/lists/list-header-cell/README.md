The List Header Cell Component is used to define table headers for a List. This is considered a container.

# [width] input

The `width` input is mandatory, and is a number between zero and one. For all list-header-cell components in a list-header, the total of the "width" inputs should be `1`.

# Example

```html
<porcelain-list>
	<porcelain-list-header>
		<porcelain-list-header-cell [width]="2 / 3">
			<!-- Header here -->
		</porcelain-list-header-cell>
		<porcelain-list-header-cell [width]="1 / 3">
			<!-- Header here -->
		</porcelain-list-header-cell>
	</porcelain-list-header>
</porcelain-list>
```
