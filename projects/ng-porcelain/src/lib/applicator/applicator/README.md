The Applicator component allows a user to defer updates on an expensive operation (such as querying a server for search results) by staging a series of changes and then clicking apply.

```html
<porcelain-applicator [refiners]="refiners" (onApply)="myApplyHandler($event)"></porcelain-applicator>
```

```typescript
class MyComponent implements OnInit {
	refiners = [
		new DateRefiner(/* ... */),
		new SimpleRefiner(/* ... */),
		new SimpleRefiner(/* ... */),
		new DateRefiner(/* ... */)
	];

	// Using Callback API
	myApplyHandler(indexedValues, initialLoad) {
		// initialLoad sets to true when refiner emits event on ngOninit
		// and it sets to false when user clicks on apply/reset button
		console.log(indexedValues, initialLoad);
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
			});
		});

		// Use combine to gather values for generating a query
		combineLatest(this.refiners.map(refiner => refiner.valueSubject)).subscribe(
			([date1, simple1, simple2, date2]) => {
				/*
			Called...
			- once every subscription has emitted
			- if any subscription emits again (refiner changes)
			- great for combining search params
			*/
			}
		);
	}
}
```
