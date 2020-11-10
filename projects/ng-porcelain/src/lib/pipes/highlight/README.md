Highlight text in a string.

# Usage

Import the Pipes Module.

```ts
import { PipesModule } from '@my-ul/ng-porcelain';

@NgModule({
	declarations: [MyComponent],
	imports: [PipesModule],
	exports: [MyComponent]
})
export class MyModule {}
```

Use the highlight pipe by binding to an `innerHTML` attribute.. You must bind to `innerHTML`, or you may see raw escaped HTML.

```html
<input [(ngModel)]="myQuery" type="text" /> <span innerHTML="{{myString | highlight : myQuery}}"></span>
```
