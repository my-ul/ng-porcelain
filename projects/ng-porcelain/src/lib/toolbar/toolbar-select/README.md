The Toolbar Select component closely mimics an HTML `<select>` element. The Toolbar Select component provides a highly-customizable, yet accessible dropdown implementation. The component allows for a HTML-templated dropdown options, as well as in the currently-selected-item window.

# Props

-   `[fullWidth]` - `true` to enable the full-width presentation, which is left-aligned, and spans the full width of the Toolbar Select Component.
-   `[label]` - Label to be displayed to the left of the currently-selected item.
-   `[(value)]` - two-way binding property for the current value.

# Two-WayBinding vs. Split Binding

The two-way binding of value can be broken apart if you would like to register callbacks to handle updating your values. This syntax would use the following properties instead of `[(value)]="myValue"`. When split, the `(valueChange)` callback is responsible for updating the values passed to `[value]`.

```html
<porcelain-toolbar-select [value]="myValue" (valueChange)="myValueChangeHandler($event)"
	><!-- ... --></porcelain-toolbar-select
>
```

# Children

-   `<porcelain-toolbar-option>` - used to define options and the template used to represent the option in the dropdown list.
-   `<porcelain-toolbar-selected-template>` - used to define the display of the currently-selected option when the component is closed. Use more than one to define null states based on `value`

# Annotated Example

The following code could be used to create a people picker.

## TypeScript Component

```typescript
@Component({
	// ...
})
export class MyComponent {
	/**
	 * The current person selected by the Component
	 */
	currentPerson = null;

	/**
	 * People, indexed by their username to make the selected-template easy to populate.
	 * Sample data from https://fakepersongenerator.com/
	 */
	people = {
		'cory.ramer': {
			username: 'cory.ramer',
			first: 'Cory',
			last: 'Ramer',
			email: 'cory.ramer@ul.com',
			phone: '(309) 548-8281'
		},
		'eric.hawes': {
			username: 'eric.hawes',
			first: 'Eric',
			last: 'Hawes',
			email: 'eric.hawes@ul.com',
			phone: '(708) 826-6749'
		},
		'james.dock': {
			username: 'james.dock',
			first: 'James',
			last: 'Dock',
			email: 'james.dock@ul.com',
			phone: '(801) 638-3830'
		}
	};

	/**
	 * Turns an object into an array for looping
	 */
	public getValues(obj) {
		return Object.keys(obj).map(key => obj[key]);
		// or Object.values(obj) if you have the polyfill enabled
	}
}
```

## HTML Template

```html
<porcleain-toolbar-cell ...>
	<porcelain-toolbar-select
		[fullWidth]="true"
		[label]="'To:'"
		[(value)]="currentPerson">

		<!-- define a template for the currently selected item -->
		<porcelain-toolbar-selected-template *ngIf="currentPerson">
			{{recipients[currentPerson].email}}
		</porcelain-toolbar-selected-template>

		<!-- define a template for the current window for null/undefined selection -->
		<porcelain-toolbar-selected-template *ngIf="currentPerson === null">
			&mdash;
		</porcelain-toolbar-selected-template>

		<!--
			- define the people dictionary in the TypeScript Component, above.
			- loop with *ngFor, if necessary. Rendering static options is also possible.
			- bind to [value] to specify what value is returned
			- use HTML for rich formatting control over the option
		-->
		<porcelain-toolbar-option
			*ngFor="let person of getValues(people)"
			[value]="person.username"
		>
			<strong>{{person.first}} {{person.last}}</strong><br>
			{{person.email}} &bull; {{person.phone}}

		</porcelain-toolbar-option>

	</porcelain-toolbar-select>
</porcelain-toolbar-cell>
```
