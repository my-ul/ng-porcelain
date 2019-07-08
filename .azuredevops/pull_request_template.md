Before creating the pull request, please ensure the following...

-   [ ] Version number in `projects/lib/package.json` is updated to allow for immediate npm deploy.
-   [ ] Types are applied to all function parameters (no `any`).
-   [ ] Stories are written or updated to thoroughly demonstrate component function and features.
-   [ ] Any strings shown to the user should be support i18n via an `@Input()` property suffixed with `Label`, such as `applyLabel`
-   [ ] Builds and runs with `rm -rf node_modules && npm install && npm run storybook`
-   [ ] New variable names are using `lowerCamelCase`.
-   [ ] (S)CSS components are designed with BEM.
-   [ ] Any `console.*` statements have been removed.
