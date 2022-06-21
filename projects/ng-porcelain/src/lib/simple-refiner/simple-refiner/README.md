The Simple Refiner component provides an interface for the user to pick many options to begin refining a search.

The behavior of the Simple Refiner is best defined by the `SimpleRefinerDefinition` class in `lib/shared`.

# Basic Usage

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

# Enabling Default preselected Values

Incase some options needs to enabled by default then use preSelectedValues property of SimpleRefinerDefinition while creating refiner object or in the created refiner object
update preSelectedValues before loaded onto applicator component. Only slugs must be sent and should properly be mapped.

```typescript
import { SimpleRefiner } from '@my-ul/ng-porcelain';

class MyComponent {
	// Provided to the <porcelain-simple-refiner> component
	mySimpleRefiner = new SimpleRefiner({
		slug: 'mySimpleRefiner',
		title: 'Select three options',
		preSelectedValues: ['optionKey1', 'optionKey2'],
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

	//optionKey1 and optionKey2 are enabled by default. NOTE SEND ONLY PROPER MAPPED SLUGS IN THE preSelectedValues!! preSelectedValues property takes array of strings i.e slugs
}
```
