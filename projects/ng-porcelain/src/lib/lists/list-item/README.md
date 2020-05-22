The List Item Component is used to markup the display of a series of items. Since it is designed to be a single atomic instance of an item, it is designed to be used with the `*ngFor` directive.

The List Item component is responsible for drawing borders between List Item Cell components.

| Property      | Type    | Description                                                                                                                               |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `[success]`   | boolean | When set to `true`, a 3 pixel left border and `.text-accent` elements within the list item will be set to UL Medium Green.                |
| `[error]`     | boolean | When set to `true`, a 3 pixel left border and `.text-accent` elements within the List Item will have their color set to UL Medium Red.    |
| `[warning]`   | boolean | When set to `true`, a 3 pixel left border and `.text-accent` elements within the List Item will have their color set to UL Medium Yellow. |
| `[primary]`   | boolean | When set to `true`, a 3 pixel left border and `.text-accent` elements within the List Item will have their color set to UL Action Blue.   |
| `[secondary]` | boolean | When set to `true`, a 3 pixel left border and `.text-accent` elements within the List Item will have their color set to UL Medium Teal.   |

```html
<porcelain-list>
	<porcelain-list-header>
		<!-- porcelain-list-header-cell instances here -->
	</porcelain-list-header>

	<porcelain-list-body>
		<porcelain-list-item>
			<!-- porcelain-list-item-cell instances here -->
		</porcelain-list-item>
	</porcelain-list-body>
</porcelain-list>
```
