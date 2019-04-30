---
title: DateRefiner Component
---

# Providing your own DateOptions

Providing `null` as the `options` dictionary will cause the DateRefiner to use its own built-in options definition. This is fine for some cases, but sometimes this built-in array might not work for your needs. Custom ranges, or translations are common cases for needing a custom DateOptions object.

Use the `DateOptions` type to generate type-checked refiners definitions.

DateOption objects have two required functions that generate the values for each option: `getFrom` and `getTo`. These functions should return values that define the range specified by the user.

These date-generator functions are passed a string corresponding to the current value provided by the custom date-picker controls.

## Scenario: Translated today and yesterday

```typescript

import * as __ from 'my-translation-service'

const todayAndYesterday: DateOptions = [
	'today': new DateOption({
		slug: 'today',
		label: __('Today'),
		getTo: (toString: string) => moment.call(null)
			.set('hours', 0)
			.set('minutes', 0)
			.set('seconds', 0)
			.add(1, 'day')
			.subtract(1, 'ms') // 23:59:59.999
			.toDate(),
		getFrom: (fromString: string) => moment.call(null)
			.set('hours', 0)
			.set('minutes', 0)
			.set('seconds', 0)
			.toDate()
	}),
	'yesterday': new DateOption({
		slug: 'yesterday',
		label: __('Yesterday'),
		getTo: (toString: string) => moment.call(null)
			.set('hours', 0)
			.set('minutes', 0)
			.set('seconds', 0)
			.subtract(1, 'ms')
			.toDate();
		getFrom: (fromString: string) => moment.call(null)
			.set('hours', 0)
			.set('minutes', 0)
			.set('seconds', 0)
			.subtract(1, 'day')
			.toDate()
	})
];

class MyComponent implements OnInit {

	myDateRefiner = new DateRefiner({
		slug: 'day',
		title: __('Search Date'),
		options: todayAndYesterday
	});

	handleRefinerChange([refinerSlug, refinerValue]) {
		console.log({refinerSlug, refinerValue});
	}
}
```

```html
<porcelain-date-refiners
	[refiner]="myDateRefiner"
	(onRefinerChange)="handleRefinerChange($event)"
></porcelain-date-refiners>
```
