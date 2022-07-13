The Simple radio Refiner component is used to display a set of limited options for applicator component

# Basic Usage

```html
<porcelain-simple-radio-refiner
	[refiner]="mySimpleRefiner"
	(onRefinerChange)="myRefinerUpdateCallbackFunction($event)"
></porcelain-simple-radio-refiner>
```

Inside the component, use the `SimpleRefiner` class to define your refiner's appearance. Write a callback function to be called when the value is updated.

###Note:- Update the type as radio!!!

```typescript
import { SimpleRefiner } from '@my-ul/ng-porcelain';

class MyComponent {
	// Provided to the <porcelain-simple-refiner> component
	mySimpleRefiner = new SimpleRefiner({
		type: 'radio',
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

##ToolTip Addition in Radio Refiner

`tooltipText` is feild used to input the text to be show

when refiner option is inserted into refiner definition, update the tooltipText feild like below

```typescript
refiner: new SimpleRefinerDefinition({
			slug: 'simple',
			type: 'radio',
			title: 'United States of America (full definitions; see notes)',
			options: {
				AL: new SimpleOption({
					badge: 4888949,
					label: 'Compliance summary',
					slug: 'AL',
					isSelected: true,
					tooltipText: 'Unified view of all compliance impacts'
				})
		})

```

###In case you want to change tooltip icon, In the UI the icon is rendered via CSS content property. Use feild `customToolTipImageUrl`

```typescript
refiner: new SimpleRefinerDefinition({
			slug: 'simple',
			type: 'radio',
			title: 'United States of America (full definitions; see notes)',
			options: {
				AL: new SimpleOption({
					badge: 4888949,
					label: 'Compliance summary',
					slug: 'AL',
					isSelected: true,
					tooltipText: 'Unified view of all compliance impacts',
					customToolTipImageUrl: "/assets/info-icon.png"
				})
		})

```

###NOTE!!! Important!!:- only get relevant path file of where image is location application project. Any other value will not work!!
