Formats a string using unix-style sprintf syntax.

```typescript
const currentLocale = getLocale(userLocale);
const projectCount = 1234;
const taskCount = 4321;
```

Here, the `translate` pipe would provide a translation for the string it was provided.

```html
{{ 'There are %1$u projects and %2$u tasks available.' | translate : currentLocale | sprintf :
projectCount : taskCount }}
<!--
	en: There are 1234 projects and 4321 tasks available 
	es: Hay 1234 y 4321 pryectos de tareas disponibles
	fr: Il y a 1234 projets et 4321 tâches disponibles.
-->
```
