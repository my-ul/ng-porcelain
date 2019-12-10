import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
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

const onQueryChange = 'Search Input Query submitted';
const onQueryClear = 'Search Input Query cleared';

storiesOf('Search Input Component', module)
	.addDecorator(withKnobs)
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
		 * 		[submitHandler]="action(onQueryChange)"
		 * 		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear)
			}
		};
	})
	.add('Custom Placeholder Text', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="action(onQueryChange)"
		 * 		[placeholderLabel]="'Volume'"></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear),
				placeholderLabel: text('Placeholder Label', 'Volume')
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
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear),
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
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear),
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
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear),
				borders: boolean('Enable Border', false)
			}
		};
	})
	.add('Custom Submit Button color', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="..."
		 * 		[submitIconColor]="'red'"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear),
				submitIconColor: color('Color', '#ff0000')
			}
		};
	})
	.add('Custom Clear Button color', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submitHandler]="..."
		 * 		[clearIconColor]="'red'"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear),
				clearIconColor: color('Clear Icon Color', '#ff0000')
			}
		};
	})
	.add('Default value can be overridden', () => {
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action(onQueryChange),
				emptyHandler: action(onQueryClear),
				userValue: text('Value', 'Entered')
			}
		};
	})
	.add('Mix-and-Match', () => {
		return {
			component: SearchInputComponent,
			props: {
				submitHandler: action(onQueryChange),
				clearIconColor: color('Clear Icon Color', '#ff0000'),
				submitIconColor: color('Submit Icon Color', '#00ff00'),
				placeholderLabel: text('Placeholder Label', 'Volume'),
				borders: boolean('Enable Border', true),
				userValue: text('userValue Label', 'Entered'),
				emptyHandler: action(onQueryClear)
			}
		};
	});
