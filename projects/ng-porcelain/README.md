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
	lodash-es@~4.17.11
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
	myApplyHandler(indexedValues) {
		console.log(indexedValues);
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

##### Customize icons

Alternative Font Awesome icons can be used instead of the defaults for 'Clear' and 'Submit'. See [Font Awesome for Angular](https://github.com/FortAwesome/angular-fontawesome#using-the-icon-library) docs for more information.

```html
<porcelain-search-input
	(submitHandler)="..."
	[submitIcon]="mySubmitIcon"
	[clearIcon]="myClearIcon"
></porcelain-search-input>
```

## Development

This is a comprehensive guide to developing components for Porcelain.

1.  Clone the Porcelain Repository

```bash
git clone https://ultfs.visualstudio.com/DefaultCollection/myUL/_git/porcelain
git clone ULTFS@vs-ssh.visualstudio.com:v3/ULTFS/myUL/porcelain
cd porcelain
```

2.  Install Dependencies

```bash
npm install
```

4.  Ensure @angular/cli is at ~6.0.0

You may need to restart your terminal to use `ng` commands.

```bash
# bash on Linux or macOS
sudo npm install -g @angular/cli@~6.0.0
```

```powershell
# PowerShell, as administrator
npm install -g @angular/cli@~6.0.0
```

5.  check version of typescript in porcelain project

```bash
npx tsc --version # 2.7.2
ng --version # @angular/* 6.0.9 and @angular/cli 6.0.8
```

6.  `cd` to the Library Project

```bash
cd projects/ng-porcelain/src/lib
```

7.  Create Angular Module

In order to make Porcelain as flexible as possible, every Component should have its own Angular module. Name the Module and Component the same thing.

```bash
ng generate module hello-world
```

8.  Create Angular Component

Use the `module/component` syntax of `ng generate` to create the component

```bash
ng generate component hello-world/hello-world
```

9. Rename the selector and create the `helloWorldLabel` Input and the `handleClick` Output to the component.

Open `project/ng-porcelain/src/lib/hello-world/hello-world/hello-world.component.ts` and modify the `@Component()` decoration's `selector` property to use the `porcelain-` prefix instead of `app-`...

```typescript
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'porcelain-hello-world', // app-hello-world becomes porcelain-hello-world
	templateUrl: './hello-world.component.html',
	styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
	@Input() helloWorldLabel: string = 'Hello, World!';
	@Output() clickHandler: EventEmitter<string> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	click() {
		this.clickHandler.emit(this.helloWorldLabel);
	}
}
```

Open `project/ng-porcelain/src/lib/hello-world/hello-world/hello-world.component.ts` and replace its contents with...

```html
<button (click)="click()">
	{{helloWorldLabel}}
</button>
```

9.  Adjust the module so that it can share resources with Storybook

In the `hello-world/hello-world.module.ts` file, create two array constants after the import section... Use this `*_IMPORTS` and `*_DIRECTIVES` pattern for all modules. These exports will be needed by Storybook.

```typescript
export const HELLO_WORLD_IMPORTS = [CommonModule];
export const HELLO_WORLD_DIRECTIVES = [HelloWorldComponent];
```

Modify the `@NgModule()` declaration to use these constants... Remember the acronym D.I.E.

```typescript
@NgModule({
  declarations: HELLO_WORLD_DIRECTIVES,
  imports: HELLO_WORLD_IMPORTS,
  exports: HELLO_WORLD_DIRECTIVES
})
```

9.  Register Module and Component in `projects/ng-porcelain/src/public_api.ts`

The `public_api.ts` file is where you expose your library's Modules and Components for use in other projects. Organize module and components alphabetically... They will _not_ be usable in other projects if they do not appear here.

```typescript
export { HelloWorldModule } from './lib/hello-world/hello-world.module';
export { HelloWorldComponent } from './lib/hello-world/hello-world/hello-world.component';
```

10. Create and Register story

Create a folder for the story and its resources (additional documentation, like markdown can be stored here)

```bash
# from the root of the porcelain repo
cd src/stories/
mkdir hello-world
touch hello-world/hello-world.stories.ts
```

Open `hello-world.stories.ts`, and create your first stories. Review this annotated story file...

```typescript
// Import Storybook modules
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";

// Import the *_IMPORTS created in hello-world.module.ts
import { HELLO_WORLD_IMPORTS, HELLO_WORLD_DIRECTIVES } from 'projects/ng-porcelain/src/lib/hello-world/hello-world.module';
// Import the Component
import { HelloWorldComponent } from 'projects/ng-porcelain/src/lib/hello-world/hello-world/hello-world.component';

storiesOf('Hello World Component', module)
    .addDecorator(
        // Create the "Synthetic Module" here
        // The Synthetic Module should match the D and I from the DIE pattern in the HelloWorldModule
        // Each .add() function will use this moduleMetadata
        moduleMetadata({
            declarations: HELLO_WORLD_DIRECTIVES,
            imports: HELLO_WORLD_IMPORTS
        })
    )
    // use .add to create a story
    .add('Default Presentation', () => {
        // Must return a story that matches interface IStory
        return {
            component: HelloWorldComponent
        }
    })
    // Use slashes in the story title to create folders and subfolders
    // would show as 'Hello World Component/i18n/Spanish'
    .add('i18n/Spanish', () => {
        /*
            <porcelain-hello-world
                [helloWorldLabel]="'Hola Mundo!'"
                (clickHandler)="action('HelloWorldComponent (spanish) clicked')"
                ></porcelain-hello-world>
        */
        return {
            component: HelloWorldComponent,
            props: {
                helloWorldLabel: 'Hola Mundo!',
                // use `action('label') to create callback listeners that output to the Storybook Actions panel
                clickHandler: action('HelloWorldComponent (spanish) clicked')
            }
        }
    })
    .add('i18n/French', () => {
        /*
            <porcelain-hello-world
                [helloWorldLabel]="'Bonjour le monde!'"
                (clickHandler)="action('HelloWorldComponent (french) clicked')"
                ></porcelain-hello-world>
        */
        return {
            component: HelloWorldComponent,
            props: {
                helloWorldLabel: 'Bonjour le monde!'
                clickHandler: action('HelloWorldComponent (french) clicked')
            }
        }
    })
```

Open the storybook config file at `.storybook/config.ts`. Add a require statement for your stories file in the `loadStories` function...

```typescript
function loadStories() {
	// ...
	require('../src/stories/hello-world/hello-world.stories.ts');
	// ...
}
```

10. Start Storybook

```bash
# from repo root, not within projects/ng-porcelain/src/
npm run storybook
```

11. Enjoy Development

Your component and its stories are now registered for development. Make changes to your component, and you can see the changes appear live in your browser.
