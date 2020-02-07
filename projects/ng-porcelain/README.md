# Porcelain for Angular (ng-porcelain)

## Quick Start

### 1. Install Porcelain for Angular and its dependencies

```bash
npm install --save @my-ul/ng-porcelain \
	@fortawesome/angular-fontawesome@0.3.0 \
	@fortawesome/fontawesome-svg-core@1.2.15 \
	@fortawesome/free-solid-svg-icons@5.7.2 \
	@w11k/angular-sticky-things@1.1.2 \
	moment@2.24.0 \
	mydatepicker@2.6.6 \
	lodash-es@~4.17.11 \
	uuid@latest
```

### Import any modules you intend to use

```typescript
import {
	ApplicatorModule,
	DateRefinerModule,
	FooterModule,
	InterpolateModule,
	RefinersModule,
	SearchInputModule
	SimpleRefinerModule,
	SpinnerModule,
	TruncateModule
} from '@my-ul/ng-porcelain';

// YourModule.ts
@Module({
	imports: [
		ApplicatorModule,
		DateRefinerModule,
		FooterModule,
		InterpolateModule,
		RefinersModule,
		SearchInputModule,
		SimpleRefinerModule,
		SpinnerModule,
		TruncateModule
	]
})
export class AppModule {}
```

### Use Porcelain components

#### Simple Refiner and Date Refiner Components

```html
<!-- Each refiner has refiner.valueSubject observable -->
<!-- And a traditional EventEmitter handler -->
<!-- If [refiner] depends on a server call, include *ngIf to defer loading -->
<porcelain-simple-refiner
	*ngIf="simpleOptionDefinition"
	[refiner]="simpleOptionDefinition"
	(onRefinerChange)="myRefinerUpdateHandler"
></porcelain-simple-refiner>

<porcelain-date-refiner
	*ngIf="dateRefinerDefinition"
	[refiner]="dateRefinerDefinition"
	(onRefinerChange)="myRefinerUpdateHandler"
></porcelain-date-refiner>
```

SimpleRefiner and DateRefiner offer two APIs that can be used to retrieve the latest values from

```typescript
import { SimpleRefiner, DateRefiner } from '@my-ul/ng-porcelain';

class MyComponent implements OnInit {

	// Get new value from event emitter...
	myRefinersHandler([refinerSlug, refinerValue]) {
		console.log(refinerSlug, refinerValue);
	}

	// -- Use SimpleRefiner and DateRefiner to create definitions
	// -- Set to `null` here and define in ngOnInit if you need values from a server response to create these.
	simpleRefinerDefinition = new SimpleRefiner(...);
	dateRefinerDefinition = new DateRefiner(...);

	// Using Subscription API
	ngOnInit() {
		// Subscribe to the refiners one at a time...
		this.simpleRefinerDefinition.valueSubject.subscribe(
			newSimpleRefinerValue => console.log(newSimpleRefinerValue)
		);
		this.dateRefinerDefinition.valueSubject.subscribe(
			newDateRefinerValue => console.log(newDateRefinerValue)
		);

		// Or, use rxjs/combineLatest for a clever recombination system
		combineLatest([
			this.simpleRefinerDefinition.valueSubject,
			this.dateRefinerDefinition.valueSubject
		]).subscribe( ([
			newSimpleRefinerValue,
			newDateRefinerValue
		]) => {
			this.loading = true;
			this
				.serverService
				.getItems(newSimpleRefinerValue, newDateRefinerValue)
				.subscribe( newServerResults => {
					this.items = newServerResults;
					this.loading = false;
				});
		})
	}
}


```

#### Applicator and Refiners components

```html
<porcelain-applicator
	[refiners]="arrayOfRefiners"
	cd
	(onRefinersChange)="myRefinersHandler"
></porcelain-applicator>

<porcelain-refiners
	[refiners]="arrayOfRefiners"
	(onRefinersChange)="myRefinersUpdateHandler"
></porcelain-refiners>
```

##### Default values for Applicator

Provide a hash/dictionary of default values for each refiner (by slug) to determine the Reset behavior. Initial load uses value from refiner.valueSubject.

```html
<porcelain-applicator [defaultValues]="myDefaultValues"></porcelain-applicator>
```

```typescript
class MyComponent {
	myDefaultValues = {
		statesVisited: ['wy']
	};
}
```

#### Utilities

##### Truncate

Truncates a string to the width of its container. Any truncation will show ellipses.

```html
<porcelain-truncate [value]="'stringToTruncate'"></porcelain-truncate>
```

##### Footer

Shows the UL footer.

```html
<porcelain-footer></porcelain-footer>
```

##### Spinner

Shows a spinner, suitable for loading, or activity indication.

```html
<porcelain-spinner></porcelain-spinner>
```

## Components

### Simple Refiner

The Simple Refiner component provides an interface for the user to pick many options to begin refining a search.

The behavior of the Simple Refiner is best defined by the `SimpleRefinerDefinition` class in `lib/shared`.

#### Basic Usage

```html
<porcelain-simple-refiner
	[refiner]="mySimpleRefiner"
	(onRefinerChange)="myRefinerUpdateCallbackFunction($event)"
></porcelain-simple-refiner>
```

Inside the component, use the `SimpleRefiner` class to define your refiner's appearance. Write a callback function to be called when the value is updated.

```typescript
import { SimpleRefiner } from '@my-ul/ng-porcelain';

class MyComponent {
	// Provided to the <porcelain-simple-refiner> component
	mySimpleRefiner = new SimpleRefiner({
		slug: 'mySimpleRefiner',
		title: 'Select three options',
		options: {
			optionKey1: 'Option Value One',
			optionKey2: 'Option Value Two',
			optionKey3: 'Option Value Three'
		}
	});

	// called when the refiner has a new value.
	myRefinerUpdateCallbackFunction([refinerKey, refinerValue]: [string, string[]]) {
		console.log('SimpleRefiner change', refinerKey, refinerValue);
		// => 'simple refiner values have changed', 'mySimpleRefiner', ['optionKey1', 'optionKey2', 'optionKey3']
	}
}
```

### Date Refiner

The Date Refiner component provides an interface for the user to specify an applicable date range for refining a search.

The behavior of the Simple Refiner is defined by the `DateRefinerDefinition` class in `lib/shared`.

#### Basic Usage

```html
<!-- When using callback API -->
<porcelain-date-refiner
	[refiner]="myDateRefiner"
	(onRefinerChange)="myRefinerUpdateCallbackFunction($event)"
></porcelain-date-refiner>

<!-- When using subscription API -->
<porcelain-date-refiner [refiner]="myDateRefiner"></porcelain-date-refiner>
```

Write a refiner definition and a callback function that will receive the updated refiner value.

```typescript
import { DateRefinerValue } from '@my-ul/ng-porcelain';
class MyComponent implements OnInit {
	myDateRefiner = new DateRefiner({
		slug: 'modifiedRange',
		title: 'Modified'
		// options: null // OMIT to use the default ranges
	});

	ngOnInit() {
		/**
		 * Subscription API Option
		 * --
		 * Add one or many subscriptions to perform tasks when the Refiner value changes
		 *
		 * */
		this.myDateRefiner.valueSubject.subscribe(newDateRefinerValue => {
			console.log({
				refinerSlug: this.myDateRefiner.slug,
				refinerValue: newDateRefinerValue
			});
		});
	}

	/**
	 * Callback API Option
	 * --
	 * Callback fired when the Refiner value changes.
	 *
	 * */
	myRefinerUpdateCallbackFunction([refinerKey, refinerValue]: [string, DateRefinerValue]) {
		console.log({ refinerKey, refinerValue });
		/*
			'DateRefiner change', 
			'modifiedBefore', 
			{ 
				from: Date(...) or null if unbounded
				to: Date(...) or null if unbounded
			}
		*/
	}
}
```

The updated value is an instance of DateRefinerValue. The date will be in the user's current timezone. Use the returned date objects to
work with the date provided using `getUTCMonth()`, `getUTCDay()`, and `getUTCYear()` as appropriate to build date strings.

#### Working with Time Zones

The Date Refiner Component will emit values in UTC. Be sure to handle these values appropriately so that your dates are returned properly.

If you serialize the value (into JSON or by using Date.toString()), the values for month, day and year may not be correct. As such, it is recommended to use JavaScript's UTC functions, such as [`getUTCFullYear`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear), [`getUTCMonth`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth), and [`getUTCDate`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate). Refer to [MDN Date documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) for further details.

If you are using `moment` to handle dates, ensure you call `.utc()` before calling format. Refer to [moment.js documentation]() for more details

```typescript
moment.utc(refinerValue).format('YYYY-MM-DD');
```

A slug representing the preset chosen by the user is also returned.

```typescript
let { optionSlug, to, from } = args[0];
```

Optionally, use `moment` to work with the dates.

```typescript
let { from, to } = args[0],
	mTo = moment(to),
	mFrom = moment(from),
	fmtTo = mTo.format('YYYY-MM-DD'),
	fmtFrom = mFrom.format('YYYY-MM-DD');
```

### Refiners

The Refiners component is a macro that will automatically build a series of Refiners (Simple and Date), resulting in less template code, allowing developers to rely on type-checked definitions.

#### Basic Usage

```html
<porcelain-refiners
	[refiners]="myRefinersArray"
	(onRefinersChange)="myRefinersUpdateCallbackFunction($event)"
></porcelain-refiners>
```

Your component should include a refiner array definition and a callback function to be called when a values have changed.

```typescript
class MyComponent {
	myRefinersArray = [
		new DateRefiner({
			slug: 'modifiedRange',
			title: 'Modified'
			// options: null // OMIT to use the default ranges
		}),
		new SimpleRefiner({
			slug: 'mySimpleRefiner',
			title: 'Select three options',
			options: {
				optionKey1: 'Option Value One',
				optionKey2: 'Option Value Two',
				optionKey3: 'Option Value Three'
			}
		})
	];
	myRefinersUpdateCallbackFunction() {
		console.log('refiners update', args);
	}
}
```

### Applicator Component

The Applicator component allows a user to defer updates on an expensive operation (such as querying a server for search results) by staging a series of changes and then clicking apply.

```html
<porcelain-applicator [refiners]="refiners" (onApply)="myApplyHandler($event)"></porcelain-applicator>
```

```typescript
class MyComponent implements OnInit {

	refiners = [
		new DateRefiner(...),
		new SimpleRefiner(...),
		new SimpleRefiner(...),
		new DateRefiner(...)
	];

	// Using Callback API
	myApplyHandler(indexedValues,initialLoad) {
        //initialLoad sets to true when refiner emits event on ngOninit
		   and it sets to false when user clicks on apply/reset button
		console.log(indexedValues,initialLoad);
	}

	// Using Subscription API
	ngOnInit() {
		// Subscribe to each refiner's value subject
		this.refiners.forEach(refiner => {
			refiner.valueSubject.subscribe(newRefinerValue => {
				console.log({
					refinerSlug: refiner.slug,
					refinerValue: newRefinerValue
				});
			})
		});

		// Use combine to gather values for generating a query
		combineLatest(
			this.refiners.map(refiner => refiner.valueSubject)
		).subscribe( ([date1, simple1, simple2, date2]) => {
			/*
			Called...
			- once every subscription has emitted
			- if any subscription emits again (refiner changes)
			- great for combining search params
			*/
		})
	}
}
```

### Search Input Component

_Since 1.4.0_

The Search Sort Component provides keyword search function as needed.

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

## Services

Services can be used to provide application-wide functionalities like translation and analytics to your application.

Inject Services using your component's providers array.

### Translation Service

Use the translation to reliably subscribe to a translation dictionary.

```typescript
import { TranslationService } from '@my-ul/ng-porcelain';

@Component({
	// ... //
	providers: [TranslationService]
})
class MyComponent {
	// Define labels as defaults
	applyLabel: string = 'Apply';
	cancelLabel: string = 'Cancel';
	resetLabel: string = 'Reset';

	constructor(private translationService: TranslationService) {
		translationService.getTranslations().subscribe(
			// Optional static translate method makes installing translations simple
			TranslationService.translate(this, {
				label_Apply: 'applyLabel',
				label_Cancel: 'cancelLabel',
				label_Reset: 'resetLabel'
			})
		);
	}
}
```

### Google Analytics Service

The Google Analytics service is a proper Angular service wrapping the async Google Analytics
API. When Angular is in dev mode, events will be output to the console.

Replace references to window.\_gaq like this...

```typescript
declare _gaq;
@Component({
	// ...
})
export class MyComponent {
	constructor() {
		_gaq.push(['_trackPageview']);
	}
}
```

with

```typescript
import { GoogleAnalyticsService } from '@my-ul/ng-porcelain';

@Component({
	// ...
	providers: [GoogleAnalyticsService]
})
export class MyComponent {
	constructor(ga: GoogleAnalyticsService) {
		this.ga.push(['_trackPageview']);
	}
}
```

## Pipes

Pipes provide common operations to be used in templates. To use pipes, import the `PipesModule` into your `@NgModule`.

```typescript
import { PipesModule } from '@my-ul/ng-porcelain';

@NgModule({
	declarations: [
		/* */
	],
	imports: [PipesModule],
	exports: [
		/* */
	]
})
export class YourModuleNameHere {}
```

### `ceil` pipe

Performs a mathematic `ceil` operation on a numeric value. Non-numeric values are passed through.

```html
{{ 1234.01 | ceil }}
<!-- 1235 -->
```

### `floor` pipe

Performs a mathematic `floor` operation on a numeric value. Non-numeric values are passed through.

```html
{{ 1234.99 | floor }}
<!-- 1234 -->
```

### `round` pipe

Performs a mathematic `round` operation on a numeric value. Non-numeric values are passed through.

```html
{{ 1234.01 | round }}
<!-- 1234 -->
{{ 1234.50 | round }}
<!-- 1235 -->
{{ 1234.99 | round }}
<!-- 1235 -->
```

### `sprintf` pipe

Formats a string using unix-style sprintf syntax.

```typescript
const currentLocale = getLocale(userLocale);
const projectCount = 1234;
const taskCount = 4321;
```

Here, the `translate` pipe would provide a translation for the string it was provided.

```html
{{ 'There are %1$u projects and %2$u tasks available.' | translate : currentLocale | sprintf :
projectCount : taskCount }}
<!--
	en: There are 1234 projects and 4321 tasks available 
	es: Hay 1234 y 4321 pryectos de tareas disponibles
	fr: Il y a 1234 projets et 4321 tâches disponibles.
-->
```

### `toLocaleString` pipe

Formats a date or number for the current locale (or a specified locale).

```html
{{ 1234.56 | toLocaleString : 'en-US' }}
<!-- 1,234.56 -->
{{ new Date() || toLocaleString }}
<!-- 1/2/2020, 12:00:00 AM -->
```

## Lists Module

**since 1.10.0**

The lists module is used for building styled list items with aligned headers, and the ability to sort columns.

### List Component System

The List Component is the outer-most wrapper for the List Component System

```html
<porcelain-list>
	<!-- children here -->
</porcelain-list>
```

### List Header Component

The List Header Component wraps a series of List Header Cells. The List Header Component can be made sticky using the @w11k/angular-sticky-things library.

```html
<porcelain-list>
	<porcelain-list-header>
		<!-- porcelain-list-header-cell instances here -->
	</porcelain-list-header>
</porcelain-list>
```

### List Header Cell Component

The List Header Cell Component is used to define table headers for a List. This is considered a container.

#### [width] input

The `width` input is mandatory, and is a number between zero and one. For all list-header-cell components in a list-header, the total of the "width" inputs should be `1`.

#### Example

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

### List Body Component

The List Body Component wraps a series of List Items. It provides padding and provides spacing between List Item components.

```html
<porcelain-list>
	<porcelain-list-header>
		<!-- porcelain-list-header-cell instances here -->
	</porcelain-list-header>

	<porcelain-list-body>
		<!-- porcelain-list-item instances here -->
	</porcelain-list-body>
</porcelain-list>
```

### List Item Component

The List Item Component is used to markup the display of a series of items. Since it is designed to be a single atomic instance of an item, it is designed to be used with the `*ngFor` directive.

The List Item component is responsible for drawing borders between List Item Cell components.

#### `[success]` Input

When set to `true`, certain elements within the list item will be set to UL Medium Green.

#### `[error]` Input

When set to `true`, the `.text-accent` elements within the List Item will have their color set to UL Medium Red.

#### `[warning]` Input

When set to `true`, the `.text-accent` elements within the List Item will have their color set to UL Medium Yellow.

#### `[primary]` Input

When set to `true`, the `.text-accent` elements within the List Item will have their color set to UL Action Blue.

#### `[secondary]` Input

When set to `true`, the `.text-accent` elements within the List Item will have their color set to UL Medium Teal.

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

### List Item Cell Component

#### `[width]` Input

A number between zero and one. All cells within a List Item component should have `[width]` inputs that add up to 1

#### `[alignTop]` Input

When true, the contents of the cell will align to the bottom of the row. Default `false`.

#### `[alignBottom]` Input

When `true`, the contents of the cell will align to the bottom of the row. Default `false`.

#### `[padAll]` Input

When `true`, the contents of the cell will be wrapped with ~20px of spacing. Default `false`.

#### `[padTop]` Input

When `true`, the contents of the cell will contain ~20px of padding at the top of the cell. Default `false`.

#### `[padRight]` Input

When `true`, the contents of the cell will contain ~20px of padding at the right of the cell. Default `false`.

#### `[padBottom]` Input

When `true`, the contents of the cell will contain ~20px of padding at the bottom of the cell. Default `false`.

#### `[padLeft]` Input

When `true`, the contents of the cell will contain ~20px of padding at the left of the cell. Default `false`.

### Sort Header Component

The Sort Header can be used to control sort variables within a list view.

#### Dual-Binding/Banana Box Sort Direction

This component supports banana-box notation for updating the value of `sortDirection`.

```html
<porcelain-sort-header [(sortDirection)]="mySortDirection"></porcelain-sort-header>
```

... is the same as ...

```html
<porcelain-sort-header
	[sortDirection]="mySortDirection"
	(sortDirectionChange)="mySortDirection=$event"
></porcelain-sort-header>
```

#### Inputs

##### `[label]` Input

`string`. Controls the text shown in the placeholder text, as well as a `<label>` element that is visible to screen readers.

##### `[sortKey]` Input

Sets the key that this sort header is responsible for toggling. When equal to `activeSortKey` are equal, the component will be in the `active` state. Typically, this is a constant value, wrapped in single quotes.

```html
<porcelain-sort-header [sortKey]=" 'date' "></porcelain-sort-header>
```

##### `[activeSortKey]` Input

Sets the key that the application currently has set to the sort key. When equal to `sortKey`, the component will be in the `active` state. Typically, this is a variable value, bound to a variable within the host component...

```html
<porcelain-sort-header [activeSortKey]=" currentSortColumn "></porcelain-sort-header>
```

##### `[sortDirection]` Input

Getter/setter. When updated internally, the `(sortDirectionChange)` callback will be called.

Value is either `asc` or `desc`.

#### Outputs

##### `(sortDirectionChange)` Output

You can register a callback whenever the component changes the `sortDirection`. The emitted value of `$event` is a tuple, `[sortKey, sortDirection]`.

```html
<porcelain-sort-header
	[sortDirection]="mySortDirection"
	(sortDirectionChange)="mySortCallback($event)"
></porcelain-sort-header>
```

You can process this with a callback like this...

```ts
export class MyComponent {
	activeSortKey: string = '';
	activeSortDirection: string = '';

	mySortCallback([sortKey, sortDirection]: SortTuple) {
		this.activeSortKey = sortKey;
		this.activeSortDirection = sortDirection;
	}
}
```
