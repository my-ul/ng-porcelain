The Password Input allows a user to input a password. The control allows the user to optionally reveal the password to make managing strong passwords easier.

```html
<porcelain-password-input [(value)]="myPassword"></porcelain-password-input>
```

In your controller...

```typescript
export class MyController {
	myPassword: string = '';
}
```
