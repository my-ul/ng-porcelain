_Since 1.4.0_

The Search Input Component provides a familiar search control with a search and a clear button. In addition to clickable clear/search buttons, the Search Input will also provide clear when escape is pressed and submit when enter is pressed (as long as the component has focus)

# Usage

Import the `InputsModule`. Prior to Porcelain 1.13.0, import the `SearchInputModule`.

```typescript
import { InputsModule } from '@my-ul/ng-porcelain';

@NgModule({
	declarations: [YourComponent],
	imports: [CommonModule, InputsModule],
	exports: []
})
class YourModule {}
```

## Use with Two-Way Binding

As of 1.13.0, the Search Input supports two-way binding. This makes it easy to provide and consume values in both directions.

In your template...

```html
<porcelain-search-input [(value)]="myValue"></porcelain-search-input>
```

In your controller...

```typescript
@Component(/* ... */)
export class MyComponent {
	myValue: string = '';
}
```

## Use with Split Binding

If you prefer manual control over how values are provided and consumed by the Search Input, you can split the binding...

In your template...

```html
<porcelain-search-input [value]="myValue" (valueChanged)="myHandler($event)"></porcelain-search-input>
```

In your controller...

```typescript
@Component()
export class MyComponent {
	myValue: string = '';

	myHandler(newValue: string): void {
		if (this.myValue !== newValue) {
			this.myValue = newValue;
		}
	}
}
```

## Binding to the `(clear)` and `(submit)` button events

In addition to two-way binding, the Search Input provides two buttons that emit when clicked (or used via keyboard): `(submit)` and `(clear)`. Note that in this example, `myValue` is bound to the Search Input with split binding, but `myValue` could also be bound with Two-Way Binding to simplify the marshalling of values between the parent component and the Search Input.

In your template...

```html
<porcelain-search-input
	[value]="myValue"
	(valueChanged)="valueChangeHandler($event)"
	(submit)="submitHandler($event)"
	(clear)="clearHandler($event)"
></porcelain-search-input>
```

In your controller...

```typescript
@Component()
export class MyComponent {
	myValue: string = '';

	valueChangeHandler(changedValue: string): void {
		if (this.myValue !== changedValue) {
			this.myValue = changedValue;
		}
	}

	submitHandler(submittedValue: string): void {
		// do something with submittedValue
	}

	clearHandler(): void {
		// do something to "clear"
		this.myValue = '';
	}
}
```

Install Porcelain 1.4 and its dependencies

`npm install --save @my-ul/ng-porcelain@^1.4.0`

Import the `SearchInputModule`

```typescript
import { SearchInputModule } from '@my-ul/ng-porcelain';

@NgModule({
	declarations: [YourComponent],
	imports: [CommonModule, SearchInputModule],
	exports: []
})
class YourModule {}
```

Write a function to handle new values from the component...

```typescript
@Component()
class YourComponent {
	handleNewValue(newValue: string): void {
		this.value = newValue;
	}
}
```

Place the component in your template, with reference to the handler...

```html
<porcelain-search-input (submitHandler)="handleNewValue($event)"></porcelain-search-input>
```

# Input Properties

## Change Placeholder Text

Change the Placeholder Text to change the displayed text. Useful for i18n/translation.

```html
<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[placeholderLabel]="'Volume'"
></porcelain-search-input>
```

## Default value in Search Box

Just use uservalue to assign value to it in the HTML

```html
<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[userValue]="searchTerm"
></porcelain-search-input>
```

## Search Box Border Toggle

For Search box border Toggle set borders for

1.)true for enabling border
2.)false for disabling border

```html
<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[borders]="false"
></porcelain-search-input>
```

## Search Box Cancel button action

```html
For getting just empty value when search cancel is clicked, use emptyhandler

<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[borders]="false"
	[emptyHandler]="clearSearchClick($event)"
></porcelain-search-input>
```

## Customize icons

Alternative Font Awesome icons can be used instead of the defaults for 'Clear' and 'Submit'. See [Font Awesome for Angular](https://github.com/FortAwesome/angular-fontawesome#using-the-icon-library) docs for more information.

```html
<porcelain-search-input
	(submitHandler)="..."
	[submitIcon]="mySubmitIcon"
	[clearIcon]="myClearIcon"
></porcelain-search-input>
```
