# Welcome to Porcelain for Angular

Porcelain for Angular is a library of durable, beautiful components for building Angular 2+ applications with the UL style guide in mind.

# Getting Started

## Installation 

### One Line

```sh
npm install @my-ul/porcelain moment @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/angular-fontawesome
```

### One at a time

```sh
npm install --save moment
npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/angular-fontawesome
npm install --save @my-ul/porcelain
```
## Simple Refiner

### Import the module

```typescript
import { SimpleRefinerModule } from '@my-ul/porcelain';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SimpleRefinerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Set up your refiner with simple Option definitions

The easiest way to initialize a Simple Refiner is with an object of `[value: string] => label` definitions...

```typescript
import { Component } from '@angular/core';
import { SimpleRefiner } from '@my-ul/porcelain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'porcelain-examples';

  stateRefiner = new SimpleRefiner({
    slug: 'stateRefiner',
    title: 'Simple Refiner Demo',
    options: {
      'AL': "Alabama",
      'AK': "Alaska",
      'WY': "Wyoming"
    }
  });

  handleStateChange(refinerSlug, value) {
	  // this function will be called when the refiner
	  // value changes.
  }
}
```
### Set up your refiner with Full Option definitions

Full options are easy to generate in a loop, and make it easy to have full control over the function and presentation of your Simple Refiner.

This example shows the use of a `SimpleOption` dictionary that uses state populations as the `badge` value.

```typescript
  stateRefiner = new SimpleRefiner({
    slug: 'stateRefiner',
    title: 'Simple Refiner Demo',
    options: {
    options: {
      'AL': new SimpleOption({ badge: 4888949, label: 'Alabama', slug: 'AL' }),
      'AK': new SimpleOption({ badge: 738068, label: 'Alaska', slug: 'AK' }),
      'AZ': new SimpleOption({ badge: 7123898, label: 'Arizona', slug: 'AZ' }),
      // ...
      'WY': new SimpleOption({ badge: 573720, label: 'Wyoming', slug: 'WY' })
    }
    }
  });
```

### Use in your template

```html
<!-- component.html -->
<porcelain-simple-refiner 
	[refiner]="stateRefiner" 
	(onRefinerChange)="handleStateChange($event)"
	></porcelain-simple-refiner>
```

### Outputs

#### `onRefinerChange($event)`
Provide a function that will be called when the refiner's value changes.  The function is called once on initialization.


### Inputs

#### `showCount: number`
By default, the Simple Refiner will show the first five options.  You can increase or decrease this value as necessary.

```html
<porcelain-simple-refiner 
	[refiner]="stateRefiner"
	(onRefinerChange)="handleStateChange($event)"
	[showCount]="10"
	></porcelain-simple-refiner>
```

#### `isOpen: boolean`
You can control the default presentation of the refiner.  Set to `true` to show the refiner open with the first `showCount` number of options displayed.

Set to `false` to show the refiner in the collapsed state.

Defaults to `true`

```html
<porcelain-simple-refiner 
	[refiner]="stateRefiner"
	(onRefinerChange)="handleStateChange($event)"
	[showCount]="10"
	[isOpen]="false"
	></porcelain-simple-refiner>
```

#### `isExpanded: boolean`
Controls the expanded state of the refiner.  Set to `true` to show all options on initial render.

Defaults to `false`

```html
<porcelain-simple-refiner 
	[refiner]="stateRefiner"
	(onRefinerChange)="handleStateChange($event)"
	[showCount]="10"
	[isExpanded]="false"
	></porcelain-simple-refiner>
```

## Date Refiner

Date refiners let users interactively refine a date range.

To use the Date Refiner component, import its module, `DateRefinerModule`...

```typescript
import { DateRefinerModule } from '@my-ul/porcelain';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DateRefinerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Simple

This uses a pre-built definition of date ranges that can be easily used and reused.

```typescript
let dateRefiner = new DateRefiner({
	slug: 'simpleDateRefiner',
	title: 'Simple Date Refiner'
});
```

### Full

The `IDateRefiner` interface requires `slug`, `label`, `getFrom` and `getTo` to be defined.

#### The Custom Range

If you define a `DateOption` for the `custom` slug, a date range picker will be shown automatically.  If you need to use the `custom` slug for something else, but do not want the range picker to appear, you must use a different slug, such as `_custom`.

The `getTo`/`getFrom` functions will be provided with `YYYY-MM-DD` formatted strings.  Use these strings to generate the date values.

#### The Date-Generating Functions `getFrom` and `getTo`

The `getFrom(fromString)` and `getTo(toString)` functions should return a JavaScript `Date` or null.  Each function takes a string, which is set to the current `YYYY-MM-DD` value of the corresponding date value.

If you use `moment` to create dates (recommended, but not required), don't forget to call `momentInstance.toDate()`.

The functions should return `null` if the range described lacks an upper or lower bound.  For example an option for "Before 2000" will have a `getFrom` returning `null` and a `getTo` returning a date for January 1, 2000.

```typescript
import moment from 'moment';

let fullDateRefiner = new DateRefiner({
	slug: 'modified',
	title: 'Modified...',
	options: {
		pre2000: new DateOption({
			slug: 'pre2000',
			label: 'Before 2000',
			getFrom: (fromString: string) => null,
			// To midnight Jan 1, 2000
			getTo: (toString: string) => new Date(2000, 1, 1, 0, 0, 0, 0)
		}),
		custom: new DateOption({
			slug: 'custom',
			label: 'Custom Range',
			getFrom: (fromString: string) => moment(fromString, "YYYY-MM-DD").toDate(),
			getTo: (toString: string) => moment(toString, "YYYY-MM-DD").toDate()
		})
    }
  });
```

### `DateOption` and `IDateOption` Reference

