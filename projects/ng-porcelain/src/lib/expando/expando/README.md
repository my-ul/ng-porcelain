A simple wrapping block that hides and reveals content with a disclosure triangle.

Use the Expando to create areas that can be shown or hidden by the user.

# Default Use

```html
<porcelain-expando [title]="My Expando">
	<p>This expando uses the short syntax.</p>
</porcelain-expando>
```

# Custom Use

The two regions of the Expando can contain fully custom markup.

```html
<porcelain-expando [iconPosition]="before">
	<porcelain-expando-header>
		<p><a href="/download/asdf">Download All Documents</a></p>
		<p>Or, you can customize your download by expanding.</p>
		<p></p
	></porcelain-expando-header>

	<porcelain-expando-body></porcelain-expando-body>
</porcelain-expando>
```
