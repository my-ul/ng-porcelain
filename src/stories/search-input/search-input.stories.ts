import { action } from '@storybook/addon-actions';
import { storiesOf, moduleMetadata } from '@storybook/angular';

// Icons for testing alternative presentations
import { faArrowAltCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

// Module Imports for synthetic module
import {
	SEARCH_INPUT_IMPORTS,
	SEARCH_INPUT_DIRECTIVES
} from '../../../projects/ng-porcelain/src/lib/search-input/search-input.module';

// Component
import { SearchInputComponent } from '../../../projects/ng-porcelain/src/lib/search-input/search-input/search-input.component';

storiesOf('Search Input Component', module)
	.addDecorator(
		// Create Synthetic Module
		moduleMetadata({
			declarations: SEARCH_INPUT_DIRECTIVES,
			imports: SEARCH_INPUT_IMPORTS
		})
	)
	.add('Default Presentation', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="action('Search Input value change')"
		 * 		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action('Search Input value change')
			}
		};
	})
	.add('Custom Placeholder Text', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="action('Search Input value change')"
		 * 		[placeholderLabel]="'Volume'"></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action('Search Input value change'),
				placeholderLabel: 'Volume'
			}
		};
	})
	.add('Custom Submit Icon', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="..."
		 * 		[submitIcon]="faArrowAltCircleRight"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action('Search Input value change'),
				submitIcon: faArrowAltCircleRight
			}
		};
	})
	.add('Custom Clear Icon', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="..."
		 * 		[clearIcon]="faTimes"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action('Search Input value change'),
				clearIcon: faTimes
			}
		};
	})
	.add('No borders', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="..."
		 * 		[borders]="false"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action('Search Input value change'),
				borders: false
			}
		};
	});
