The AutoComplete is a free form text input box that emits value at a given set of debounce time

```typescript
export class MyComponent {
	autocompleteitems: ['Apple', 'Banana', 'Cherry', 'Durian'];
	debounce: number = 3000;
}
```

## to get the instantaneous value use view child and afterviewinit hook to set the value or get immediate value. Note use unique identifier

```html
<porcelain-auto-complete
	#first_autocomplete
	[AutoCompleteitems]="autocompleteitems"
	(userEnteredInputBoxValue)="fetchSuggestions($event)"
>
</porcelain-auto-complete>
```

```typescript
export class MyComponent {
	autocompleteitems: ['Apple', 'Banana', 'Cherry', 'Durian'];
	debounce: number = 3000;
	@ViewChild('first_autocomplete', { static: false }) firstAutoComplete: AutoCompleteComponent;

	ngAfterViewInit(): void {
		this.firstAutoComplete.inputBoxValue = 'preset value';
	}

	//to get immediate value
	AutoCompelteValue() {
		console.log(this.firstAutoComplete.inputBoxValue);
	}
}
```

## Array of objects as items

```html
<porcelain-auto-complete
	[AutoCompleteitems]="autocompleteitems"
	(userEnteredInputBoxValue)="fetchSuggestions($event)"
>
</porcelain-auto-complete>
```

## [debounceTime] controls for emiting value for auto complete suggestions. To show And hide spinner use [AutoCompleteLoadingSpinner].

```typescript
export class MyComponent {
	autocompleteitems:string[]= ['Apple', 'Banana', 'Cherry', 'Durian'];
	debounce:number = 3000;
	fetchAutoCompeleteSuggestions:boolean = false;
}

fetchSuggestions(userValue:string){
	//enable Api Spinner
	this.fetchAutoCompeleteSuggestions = true;

	//http call

	//change autocompelte items
	this.autocompleteitems = ['onion','tomato','potato,'cucumber','capcicum','carror','raddish'];

	//disable spinner
	this.fetchAutoCompeleteSuggestions = false;
}

```

```html
<porcelain-auto-complete
	[AutoCompleteitems]="autocompleteitems"
	[AutoCompleteLoadingSpinner]="fetchAutoCompeleteSuggestions"
	[debounceTime]="debounce"
	(userEnteredInputBoxValue)="fetchSuggestions($event)"
>
</porcelain-auto-complete>
```

## use ViewChild and afterviewinit to set values incase of manipulating values
