Performs a mathematic `round` operation on a numeric value. Non-numeric values are passed through.

```html
{{ 1234.01 | round }}
<!-- 1234 -->
{{ 1234.50 | round }}
<!-- 1235 -->
{{ 1234.99 | round }}
<!-- 1235 -->
```
