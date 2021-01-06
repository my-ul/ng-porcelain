Skeletons can be used to improve perceived load time by providing a hint about the content that is about to load.

# Skeleton Block

Creates an animated skeleton region, suitable as a placeholder for images. The Skeleton Block tries to fill all vertical and horizontal space available to it, so wrap it with another element to specify the dimensions.

The Skeleton Block has no `@Input()` or `@Output()` decorators.

## Usage

```html
<p-skeleton-block></p-skeleton-block> <porcelain-skeleton-block></porcelain-skeleton-block>
```

# Skeleton Word

Creates an animated Skeleton Block that can be sized in characters (ems). Internally used by the Skeleton Line.

## Inputs

### `[characters]` Input

A `number` specifying how many characters (ems) the word skeleton should be.

## Usage

```html
<porcelain-skeleton-block [characters]="6"></porcelain-skeleton-block>
<p-skeleton-block [characters]="6"></p-skeleton-block>
```

# Skeleton Line

```html
<porcelain-skeleton-line [minLength]="7" [maxLength]="13"></porcelain-skeleton-line>
<p-skeleton-line [minLength]="7" [maxLength]="13"></p-skeleton-line>
```

Automatically creates a line with randomly-sized words.

## Inputs

### `[minLength]` Input: number

Minimum character width for the words placed in the line. Defaults to `7`.

### `[maxLength]` Input: number

Maximum character width for the words placed in the line. Defaults to `13`.

# Skeleton Paragraph

```html
<porcelain-skeleton-paragraph></porcelain-skeleton-paragraph>
<p-skeleton-paragraph></p-skeleton-paragraph>
```

Automatically creates a paragraph of Skeleton Word elements.

## Inputs

### `[lines]` Input: number

Number of lines of skeleton text to generate. Lines will be generated to the full width of the block. If this is undesired, use the Skeleton Word.
