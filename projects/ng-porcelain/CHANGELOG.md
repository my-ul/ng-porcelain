# 9.x.x

## 9.0.7

-   Added Expando module
-   Added Skeletons Module
-   Added Search Refiner
-   Updated border colors
-   Added Skeleton Docs
-   Replaced expanding functionality in refiners with ExpandoComponent
-   Added new shorthands... use `p-xxx` instead of `porcelain-xxx` if you want.

## 9.0.4

-   Added Breadcrumb component system.
-   Removed getter/setters from toolbar-select to improve performance by reducing redraws.

## 9.0.0

-   Versioning has been modified to synchronize with Angular releases. Porcelain's major version number will now match the Angular version number. For example, Porcelain ^9.0.0 is designed to be compatible with Angular ^9.0.0
-   Replaced peer dependency `mydatepicker` with `angular-mydatepicker`.
-   Upgrade angular-fontawesome from `^0.3.0` to `^0.6.1`.
-   Updated storybooks to use new Storybook formats and reorganized to take advantage of new hierarchy tools.

# 1.x.x

## 1.4.x

## 1.4.2

-   Fixes type on interpolate pipe

## 1.4.1

-   Fixes off-by-one error with custom date-picker values.

## 1.4.0

-   Renames `*Refiner` classes to more-verbose `*RefinerDefinition`. Implements shims that will be removed at 2.0.0
-   Introduces `porcelain-search-input` to enable search clear/submit functionality.

## 1.3.x

### 1.3.2

-   Fixes issues surrounding `shared` barrel type errors.

### 1.3.1

-   Resolves missing peer dependency in nested package.json

### 1.3.0

-   Introduces `porcelain-applicator` component to handle Apply/Reset functionality, with sticky scroll behavior.
-   Introduces `porcelain-footer` component to show UL copyright and legal notices.
-   Introduces `porcelain-spinner` component to show an appropriately-sized, consistent loading spinner.

### 1.7.0-beta.5

-   Empty handler additon and `porcelain-applicator` modification.
