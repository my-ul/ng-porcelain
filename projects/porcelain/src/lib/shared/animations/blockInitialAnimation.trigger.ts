import { trigger, transition } from "@angular/animations";

/**
 * Generates a container that will stop child animations from occurring on load.
 *
 * @param name Name for the animation block, such as blockInitialAnimation
 * @example
 * 	```typescript
 * 		## Component class
 * 		@Component({
 * 			animations: [ generateAnimationBlock('blockInitialAnimation') ]
 * 		})
 * 		class MyComponent {
 * 			// ... component implementation
 * 		}
 * 		```
 *
 * 		## Component template
 * 		```
 * 			<ng-container [@blockInitialAnimation]>
 * 				... animated template items ...
 * 			</ng-container>
 * 		```
 */
export let generateAnimationBlocker = name => trigger(name, [
	transition(':enter', [])
])

export let blockInitialAnimation = generateAnimationBlocker('blockInitialAnimation');
