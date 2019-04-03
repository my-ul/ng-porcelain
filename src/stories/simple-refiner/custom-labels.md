# Custom Labels

Custom Labels can be provided as properties for the <porcelain-simple-refiner ...></porcelain-simple-refiner> component.

This is useful to implement translations within your app

The Show More and Show Less labels are passed to an interpolator which will format numbers for the user's locale.

Access the interpolated value by including `%u` or `%s` in your format string. Using `%u` will attempt to parse the integer and display it using the user's locale preferences. Using `%s` will let your string or number pass through without formatting.

Since these values are provided to the component as inputs, string literals need to be wrapped with single quotes.

````html
<porcelain-simple-refiner
	#spanishRefiner
	[refiner]="myRefinerDefinition"
	[showMoreLabel]="'Mostrar %u más'"
	[showLessLabel]="'Muestra menos %u'"
	[selectAllLabel]="'Seleccionar todo'"
	[selectNoneLabel]="'Seleccione Ninguno'"
></porcelain-simple-refiner
>```
````
