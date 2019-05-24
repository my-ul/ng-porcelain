# Porcelain for Angular 1.3

## New Applicator component

Use the Applicator to defer updates to a view. The applicator will keep track of any changes to refiners, allowing the user to apply refiners in batches.

```html
<porcelain-applicator [refiners]="myRefiners" (onApply)=""></porcelain-applicator>
```

```typescript
class MyComponent implements OnInit {
	myRefiners = [new SimpleRefiner(/* */), new DateRefiner(/* */)];

	ngOnInit() {}

	handleApply(values) {
		console.log(values);
	}
}
```

## Dual API available for Refiners

Now instead of _just_ a callback, a subject is made available on each refiner definition (`SimpleRefiner` and `DateRefiner`).

Setting the value/getting the value of the refiner can be done with...

```typescript
class MyComponent implements OnInit {
	mySimpleRefiner = new SimpleRefiner(/**/);

	myRefiners = [mySimpleRefiner, new DateRefiner(/* */)];

	ngOnInit() {
		mySimpleRefiner.next(['AL', 'AK', 'AZ']);

		mySimpleRefiner.subscribe(newValues => {
			/* Use the newly selected values here */
		});
	}
}
```

If you still prefer to give callbacks to the components, you can continue by providing a callback. Note that, internally, the callback is executed within a subscription to the refiner definition.
