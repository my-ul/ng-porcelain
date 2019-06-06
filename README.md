# Porcelain for Angular 6+

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development

This is a comprehensive guide to developing components for Porcelain.

1.  Clone the Porcelain Repository

```bash
git clone https://ultfs.visualstudio.com/DefaultCollection/myUL/_git/porcelain
git clone ULTFS@vs-ssh.visualstudio.com:v3/ULTFS/myUL/porcelain
cd porcelain
```

2.  Install Dependencies

```bash
npm install
```

4.  Ensure @angular/cli is at ~6.0.0

You may need to restart your terminal to use `ng` commands.

```bash
# bash on Linux or macOS
sudo npm install -g @angular/cli@~6.0.0
```

```powershell
# PowerShell, as administrator
npm install -g @angular/cli@~6.0.0
```

5.  check version of typescript in porcelain project

```bash
npx tsc --version # 2.7.2
ng --version # @angular/* 6.0.9 and @angular/cli 6.0.8
```

6.  `cd` to the Library Project

```bash
cd projects/ng-porcelain/src/lib
```

7.  Create Angular Module

In order to make Porcelain as flexible as possible, every Component should have its own Angular module. Name the Module and Component the same thing.

```bash
ng generate module hello-world
```

8.  Create Angular Component

Use the `module/component` syntax of `ng generate` to create the component

```bash
ng generate component hello-world/hello-world
```

9. Rename the selector and create the `helloWorldLabel` Input and the `handleClick` Output to the component.

Open `project/ng-porcelain/src/lib/hello-world/hello-world/hello-world.component.ts` and modify the `@Component()` decoration's `selector` property to use the `porcelain-` prefix instead of `app-`...

```typescript
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'porcelain-hello-world', // app-hello-world becomes porcelain-hello-world
	templateUrl: './hello-world.component.html',
	styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
	@Input() helloWorldLabel: string = 'Hello, World!';
	@Output() clickHandler: EventEmitter<string> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	click() {
		this.clickHandler.emit(this.helloWorldLabel);
	}
}
```

Open `project/ng-porcelain/src/lib/hello-world/hello-world/hello-world.component.ts` and replace its contents with...

```html
<button (click)="click()">
	{{helloWorldLabel}}
</button>
```

9.  Adjust the module so that it can share resources with Storybook

In the `hello-world/hello-world.module.ts` file, create two array constants after the import section... Use this `*_IMPORTS` and `*_DIRECTIVES` pattern for all modules. These exports will be needed by Storybook.

```typescript
export const HELLO_WORLD_IMPORTS = [CommonModule];
export const HELLO_WORLD_DIRECTIVES = [HelloWorldComponent];
```

Modify the `@NgModule()` declaration to use these constants... Remember the acronym D.I.E.

```typescript
@NgModule({
  declarations: HELLO_WORLD_DIRECTIVES,
  imports: HELLO_WORLD_IMPORTS,
  exports: HELLO_WORLD_DIRECTIVES
})
```

9.  Register Module and Component in `projects/ng-porcelain/src/public_api.ts`

The `public_api.ts` file is where you expose your library's Modules and Components for use in other projects. Organize module and components alphabetically... They will _not_ be usable in other projects if they do not appear here.

```typescript
export { HelloWorldModule } from './lib/hello-world/hello-world.module';
export { HelloWorldComponent } from './lib/hello-world/hello-world/hello-world.component';
```

10. Create and Register story

Create a folder for the story and its resources (additional documentation, like markdown can be stored here)

```bash
# from the root of the porcelain repo
cd src/stories/
mkdir hello-world
touch hello-world/hello-world.stories.ts
```

Open `hello-world.stories.ts`, and create your first stories. Review this annotated story file...

```typescript
// Import Storybook modules
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";

// Import the *_IMPORTS created in hello-world.module.ts
import { HELLO_WORLD_IMPORTS, HELLO_WORLD_DIRECTIVES } from 'projects/ng-porcelain/src/lib/hello-world/hello-world.module';
// Import the Component
import { HelloWorldComponent } from 'projects/ng-porcelain/src/lib/hello-world/hello-world/hello-world.component';

storiesOf('Hello World Component', module)
    .addDecorator(
        // Create the "Synthetic Module" here
        // The Synthetic Module should match the D and I from the DIE pattern in the HelloWorldModule
        // Each .add() function will use this moduleMetadata
        moduleMetadata({
            declarations: HELLO_WORLD_DIRECTIVES,
            imports: HELLO_WORLD_IMPORTS
        })
    )
    // use .add to create a story
    .add('Default Presentation', () => {
        // Must return a story that matches interface IStory
        return {
            component: HelloWorldComponent
        }
    })
    // Use slashes in the story title to create folders and subfolders
    // would show as 'Hello World Component/i18n/Spanish'
    .add('i18n/Spanish', () => {
        /*
            <porcelain-hello-world
                [helloWorldLabel]="'Hola Mundo!'"
                (clickHandler)="action('HelloWorldComponent (spanish) clicked')"
                ></porcelain-hello-world>
        */
        return {
            component: HelloWorldComponent,
            props: {
                helloWorldLabel: 'Hola Mundo!',
                // use `action('label') to create callback listeners that output to the Storybook Actions panel
                clickHandler: action('HelloWorldComponent (spanish) clicked')
            }
        }
    })
    .add('i18n/French', () => {
        /*
            <porcelain-hello-world
                [helloWorldLabel]="'Bonjour le monde!'"
                (clickHandler)="action('HelloWorldComponent (french) clicked')"
                ></porcelain-hello-world>
        */
        return {
            component: HelloWorldComponent,
            props: {
                helloWorldLabel: 'Bonjour le monde!'
                clickHandler: action('HelloWorldComponent (french) clicked')
            }
        }
    })
```

Open the storybook config file at `.storybook/config.ts`. Add a require statement for your stories file in the `loadStories` function...

```typescript
function loadStories() {
	// ...
	require('../src/stories/hello-world/hello-world.stories.ts');
	// ...
}
```

10. Start Storybook

```bash
# from repo root, not within projects/ng-porcelain/src/
npm run storybook
```

11. Enjoy Development

Your component and its stories are now registered for development. Make changes to your component, and you can see the changes appear live in your browser.

## Build

Run `ng build ngPorcelain` to build the project. The build artifacts will be stored in the `dist/` directory. The output type is an Angular library, so there is no need to use `--prod`, as the library will be minified by the consuming project.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
