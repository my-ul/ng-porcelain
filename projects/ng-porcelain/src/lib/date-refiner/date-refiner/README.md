The Date Refiner component provides an interface for the user to specify an applicable date range for refining a search.

The behavior of the Simple Refiner is defined by the `DateRefinerDefinition` class in `lib/shared`.

# Basic Usage

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

# Working with Time Zones

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
