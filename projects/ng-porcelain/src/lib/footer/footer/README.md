Shows the UL footer.

```html
<porcelain-footer></porcelain-footer>
```

## Customizing the footer links

### Option 1: Using the `links` input

You can customize the footer links by passing an array of [url, label] entries to the `links` input.

```html
<porcelain-footer
	[links]="[
		['https://example.com/link1', 'Link 1'],
		['https://example.com/link2', 'Link 2'],
		['https://example.com/link3', 'Link 3']
	]"
></porcelain-footer>
```

### Option 2: Provide as content children

You can also provide the links as content children. This is useful when you want to use Angular components as links. Ensure the `porcelain-link` directive is used as a Structural Directive (include the asterisk, i.e. `*porcelain-link`).

```html
<porcelain-footer>
	<a *porcelain-link href="https://example.com/link1">Link 1</a>
	<a *porcelain-link href="https://example.com/link2">Link 2</a>
	<a *porcelain-link href="https://example.com/link3">Link 3</a>
</porcelain-footer>
```
