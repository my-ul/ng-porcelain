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
