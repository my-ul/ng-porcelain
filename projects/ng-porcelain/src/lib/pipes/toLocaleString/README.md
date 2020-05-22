Formats a date or number for the current locale (or a specified locale).

```html
{{ 1234.56 | toLocaleString : 'en-US' }}
<!-- 1,234.56 -->
{{ new Date() || toLocaleString }}
<!-- 1/2/2020, 12:00:00 AM -->
```
