_Since 1.4.0_

The Search Input Component provides a familiar search control with a search and a clear button. In addition to clickable clear/search buttons, the Search Input will also provide clear when escape is pressed and submit when enter is pressed (as long as the component has focus)

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

#### Input Properties

##### Change Placeholder Text

Change the Placeholder Text to change the displayed text. Useful for i18n/translation.

```html
<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[placeholderLabel]="'Volume'"
></porcelain-search-input>
```

##### Default value in Search Box

Just use uservalue to assign value to it in the HTML

```html
<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[userValue]="searchTerm"
></porcelain-search-input>
```

##### Search Box Border Toggle

For Search box border Toggle set borders for

1.)true for enabling border
2.)false for disabling border

```html
<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[borders]="false"
></porcelain-search-input>
```

##### Search Box Cancel button action

```html
For getting just empty value when search cancel is clicked, use emptyhandler

<porcelain-search-input
	[submitHandler]="handleNewValue($event)"
	[borders]="false"
	[emptyHandler]="clearSearchClick($event)"
></porcelain-search-input>
```

##### Customize icons

Alternative Font Awesome icons can be used instead of the defaults for 'Clear' and 'Submit'. See [Font Awesome for Angular](https://github.com/FortAwesome/angular-fontawesome#using-the-icon-library) docs for more information.

```html
<porcelain-search-input
	(submitHandler)="..."
	[submitIcon]="mySubmitIcon"
	[clearIcon]="myClearIcon"
></porcelain-search-input>
```
