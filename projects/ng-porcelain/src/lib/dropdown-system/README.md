The dropDown System is a generic component that has 3 main parts. It is basically stripped down version of dropdown into select container, selected container and list option container.

To use the dropDown Module within your application, import the `DropdownSystemModule`.

```typescript
import { DropdownSystemModule } from '@my-ul/ng-porcelain';

@NgModule({
	declarations: [
		/* ... */
	],
	imports: [DropdownSystemModule],
	exports: [
		/* ... */
	]
})
export class MyApplicationModule {}
```

# Dropdown Container

The Dropdown container is the parent component that houses the dropdown list component and dropdown selected template component

```HTML
<porcelain-dropdown-select [(value)]="value">
                            <porcelain-dropdown-selectedtemplate>
                                <porcelain-dropdown-inputbox [(query)]="searchText"></porcelain-dropdown-inputbox>
                            </porcelain-dropdown-selectedtemplate>
                            <porcelain-dropdown-selectoption [value]="option.value" *ngFor="let option of getValues(options)">
                                <strong>{{option.name}}</strong>&nbsp;&nbsp;<span style="font-size: 90%; color: #888">{{option.group}}</span><br>
                                {{option.value}}@ul.com
                            </porcelain-dropdown-selectoption>
</porcelain-dropdown-select>
```
