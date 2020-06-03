The Rack Component is used for managing order and active/inactive states for a small set of items, such as columns. For example, the Rack can be used to reorder columns and remove columns that the user does not want to see.

You can use any items with the Rack, as long as it has properties that you can map as key, label and locked/required status.

Consider the DynamicColumn type:

```typescript
export interface DynamicColumn {
	label: string;
	key: string;
	locked: boolean;
	type: DynamicColumnType;
	width: number;
}
```

It uses the `label`, `key` and `locked` properties verbatim, but you could use objects with properties like `name`, `slug` and `required`.

# Using the Rack Component

Import the RackModule into your module.

```typescript
import { RackModule } from '@my-ul/ng-porcelain';

@NgModule({
	imports: [RackModule]
})
export class MyModule {}
```

# Basic Usage

For objects that use `label`, `key` and `locked` for their binding properties, you can use the Rack with very little configuration. The Rack can use two-way binding, so there is no need to manage callbacks/handlers.

```html
<porcelain-rack [(activeItems)]="activeColumns" [(inactiveItems)]="inactiveColumns"></porcelain-rack>
```

# Advanced Usage

For objects that do not use `label`, `key` and `locked` for binding properties, simply provide the property names as Inputs to the Rack.

```html
<porcelain-rack
	[lockedProp]=" 'required' "
	[labelProp]=" 'name' "
	[keyProp]=" 'id' "
	[(activeItems)]="activeColumns"
	[(inactiveItems)]="inactiveColumns"
></porcelain-rack>
```

#label customization

For displaying custom label add object as below

```typescript
headerlabels: any = {
	add: 'Add',
	activeList: 'Active',
	activate: 'Add',
	deactivate: 'Remove',
	inactiveList: 'Inactive',
	locked: 'This item cannot be removed from the active items',
	moveDown: 'Move Down',
	moveUp: 'Move Up',
	moveToTop: 'Move to Top',
	moveToBottom: 'Move to Bottom',
	pluralItems: 'Items',
	singleItems: 'Item',
	zeroItems: 'Items'
};
```

Then input them as below

```html
<porcelain-rack
	[lockedProp]=" 'required' "
	[labelProp]=" 'name' "
	[keyProp]=" 'id' "
	[(activeItems)]="activeColumns"
	[(inactiveItems)]="inactiveColumns"
	[labels]="headerlabels"
></porcelain-rack>
```
