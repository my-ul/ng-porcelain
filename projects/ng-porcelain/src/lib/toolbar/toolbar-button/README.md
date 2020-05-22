The Toolbar Button component is an accessible button that includes an optional icon.

# Props

-   `[icon]` - a Font Awesome 5 `IconDefinition`
-   `[isLabelSrOnly]` - `true` if you only want to hide the button text (except for screen readers).
-   `(onClick)` - a callback function to be called when the button is clicked or triggered with enter/space.

# Children

Text will be used for the button label.

```html
<porcelain-toolbar-cell ...>
	<porcelain-toolbar-button [icon]="faSave" [isLabelSrOnly]="false" (onClick)="mySaveHandler($event)">
		Save
	</porcelain-toolbar-button>
</porcelain-toolbar-cell>
```
