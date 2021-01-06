A refiner that provides search capability. The Search Refiner is used with the same invocation as the Simple Refiner. The notable differences, however, are that the Search Refiner is restricted to showing a few lines of available options, and shows the selected options in a fixed list above the available options.

# Differences from Simple Refiner

The Search Refiner will not support the use of a `string => string` dictionary. Instead, you should define a `string => SimpleOption` dictionary. There is a utility function available that will transform `string => string` Dictionaries into proper SimpleOption dictionaries.

## `toSimpleOptionDictionary` Sample Usage

```typescript
let statesAsStrings = {
	AL: 'Alabama',
	AK: 'Alaska'
	/* ... */
};
let options = toSimpleOptionDictionary(statesAsStrings);
```

# Use Standalone

The Search Refiner can be used alone by using the the `porcelain-search-refiner` or `p-search-refiner` selectors.

```html
<porcelain-search-refiner [...attrs]></porcelain-search-refiner>
<!-- or -->
<p-search-refiner [...attrs]></p-search-refiner>
```

# Use in Applicator or Refiners Macro

Somewhere in your component...

```typescript
this.searchRefiner = new SearchRefiner({
	options: {
		AL: new SimpleOption({ label: 'Alabama', slug: 'AL', badge: 4870000 })
	}
});
```

In your template...

```html
<porcelain-applicator [refiners]="[ searchRefiner ]"></porcelain-applicator>
```

# Translation Strings

The `SearchRefiner` uses the `TranslationService` to internationalize its labels. You can set the labels directly with the `labels` Input, too, but this can be cumbersome when using the Applicator/Refiners components.

| Expected Key            | English               | Description                                                                                                                                                         |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label_SelectAll`       | `Select All`          | Label for button used to set all refiner items in the Active/Selected state                                                                                         |
| `label_SelectFiltered`  | `Select Filtered`     | Label for button used to select all items currently shown by the filter text.                                                                                       |
| `label_nHiddenByFilter` | `%s hidden by filter` | Label to accompany Select Filtered button when the user has text in the query input. Button will add the current filtered items to the Active/Selected items array. |
| `label_Clear`           | `Clear`               | Label for button used to clear the current filter query.                                                                                                            |
