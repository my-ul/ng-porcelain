The Expando can be used to create content areas that can be opened or closed with a disclosure triangle.

# Supplementary Types

## `ExpandoIconPosition` = 'before' | 'after'

Used to change the expando's icon position relative to the expando title.

# Basic Usage

## `title` Input: string

The title to be shown next to the icon.

### Special note about [title] binding

You can use non-bracketed syntax to define the title. If you do this, you must use string interpolation to use variables.

The following bindings are equivalent:

```html
<p-expando [title]="myVariable"></p-expando> <p-expando title="{{myVariable}}"></p-expando>
```

## `[iconPosition]` Input: `ExpandoIconPosition`

Accepts string values "before" or "after" as defined by `ExpandoIconPosition`

## `[icon]` Input: `FaIconDefinition`

Accepts any Font Awesome icon definition, from the `@fortawesome/free-*-svg-icons` packages. By default, this is `faCaretDown`.

## `[isOpen]` Input: `boolean`

Boolean used to control the current state of the expando. Set true to reveal included content, otherwise, false to hide.

```html
<p-expando
	title="My Expando Title"
	[iconPosition]="ExpandoIconPosition"
	[icon]="faIconDefinition"
	[isOpen]="trueOrFalse"
>
	<p>Your content goes here.</p>
</p-expando>
<!-- or -->
<porcelain-expando
	title="My Expando Title"
	[iconPosition]="ExpandoIconPosition"
	[icon]="faIconDefinition"
	[isOpen]="trueOrFalse"
>
	<p>Your content goes here.</p>
</porcelain-expando>
```

# Advanced Usage

If the `[title]` input is omitted or set to the empty string `''`, the Expando will use Expando Body and Expando Header components to populate these regions.

```html
<p-expando>
	<p-expando-header>
		<h2>My Header Area</h2>
	</p-expando-header>
	<p-expando-body>
		<p>My content area</p>
	</p-expando-body>
</p-expando>

<!-- or -->

<porcelain-expando>
	<porcelain-expando-header>
		<h2>My Header Area</h2>
	</porcelain-expando-header>
	<porcelain-expando-body>
		<p>My content area</p>
	</porcelain-expando-body>
</porcelain-expando>
```
