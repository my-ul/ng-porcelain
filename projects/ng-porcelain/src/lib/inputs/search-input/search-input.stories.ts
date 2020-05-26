import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { storiesOf, moduleMetadata } from '@storybook/angular';

// Icons for testing alternative presentations
import { faArrowAltCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

// Module Imports for synthetic module
import { INPUTS_IMPORTS, INPUTS_COMPONENTS } from '../inputs.module';
import { SearchInputComponent } from './search-input.component';

const onQueryChange = 'Search Input Query submitted';
const onQueryClear = 'Search Input Query cleared';

storiesOf('Search Input Component', module)
	.addDecorator(withKnobs)
	.addDecorator(
		// Create Synthetic Module
		moduleMetadata({
			declarations: INPUTS_COMPONENTS,
			imports: INPUTS_IMPORTS
		})
	)
	.add('Default Presentation', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submit]="action(onQueryChange)"
		 * 		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				value: text('[(value)]'),
				valueChange: (newValue: string) => {
					if (this.value !== newValue) {
						this.value = newValue;
					}
				},
				submit: action(onQueryChange),
				clear: action(onQueryClear)
			}
		};
	})
	.add('Custom Placeholder Text', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submit]="action(onQueryChange)"
		 * 		[placeholderLabel]="'Volume'"></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submit: action(onQueryChange),
				clear: action(onQueryClear),
				placeholderLabel: text('Placeholder Label', 'Volume')
			}
		};
	})
	.add('Custom Submit Icon', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submit]="..."
		 * 		[submitIcon]="faArrowAltCircleRight"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submit: action(onQueryChange),
				clear: action(onQueryClear),
				submitIcon: faArrowAltCircleRight
			}
		};
	})
	.add('Custom Clear Icon', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submit]="..."
		 * 		[clearIcon]="faTimes"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submit: action(onQueryChange),
				clear: action(onQueryClear),
				clearIcon: faTimes
			}
		};
	})
	.add('No borders', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submit]="..."
		 * 		[borders]="false"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submit: action(onQueryChange),
				clear: action(onQueryClear),
				borders: boolean('Enable Border', false)
			}
		};
	})
	.add('Custom Submit Button color', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submit]="..."
		 * 		[submitIconColor]="'red'"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submit: action(onQueryChange),
				clear: action(onQueryClear),
				submitIconColor: color('Color', '#ff0000')
			}
		};
	})
	.add('Custom Clear Button color', () => {
		/**
		 * @example
		 * <porcelain-search-input
		 * 		[submit]="..."
		 * 		[clearIconColor]="'red'"
		 *		></porcelain-search-input>
		 */
		return {
			component: SearchInputComponent,
			props: {
				submit: action(onQueryChange),
				clear: action(onQueryClear),
				clearIconColor: color('Clear Icon Color', '#ff0000')
			}
		};
	})
	.add('Default value can be overridden', () => {
		return {
			component: SearchInputComponent,
			props: {
				submit: action(onQueryChange),
				clear: action(onQueryClear),
				value: text('[(value)]', '* custom value from your application *')
			}
		};
	})
	.add('Mix-and-Match', () => {
		return {
			component: SearchInputComponent,
			props: {
				clearIconColor: color('Clear Icon Color', '#ff0000'),
				submitIconColor: color('Submit Icon Color', '#00ff00'),
				placeholderLabel: text('Placeholder Label', 'Volume'),
				borders: boolean('Enable Border', true),
				value: text('[(value)]', 'Entered'),
				canEmitEmpty: boolean('Allow Empty Submit?', false),
				submit: action(onQueryChange),
				clear: action(onQueryClear)
			}
		};
	});
