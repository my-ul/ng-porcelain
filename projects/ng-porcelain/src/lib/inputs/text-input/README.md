The Text Input control allows a user to enter text. It is not validated.

In your template...

```html
<porcelain-text-input [(value)]="textValue"></porcelain-text-input>
```

In your controller...

```typescript
export class MyController {
	textValue: string = '';
}
```
