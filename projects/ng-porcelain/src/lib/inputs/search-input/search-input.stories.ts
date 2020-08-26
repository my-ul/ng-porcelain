import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

// Icons for testing alternative presentations
import { faArrowAltCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

// Module Imports for synthetic module
import { INPUTS_IMPORTS, INPUTS_COMPONENTS } from '../inputs.module';
import { SearchInputComponent } from './search-input.component';

const onQueryChange = 'Search Input Query submitted';
const onQueryClear = 'Search Input Query cleared';

export default {
	title: 'Controls/Dual-Bind Search Input',

	decorators: [
		withKnobs, // Create Synthetic Module
		moduleMetadata({
			declarations: INPUTS_COMPONENTS,
			imports: INPUTS_IMPORTS
		})
	]
};

export const DefaultPresentation = () => {
	/**
	 * @example
	 * <porcelain-search-input
	 * 		[submit]="action(onQueryChange)"
	 * 		></porcelain-search-input>
	 */
	return {
		component: SearchInputComponent,
		props: {
			value: text('[(value)]', 'search query'),
			valueChange: newValue => {
				if (this.value !== newValue) {
					this.value = newValue;
				}
			},
			submit: action(onQueryChange),
			clear: action(onQueryClear)
		}
	};
};

export const CustomPlaceholderText = () => {
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
};

export const CustomSubmitIcon = () => {
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
};

export const CustomClearIcon = () => {
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
};

export const NoBorders = () => {
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
};

NoBorders.story = {
	name: 'No borders'
};

export const CustomSubmitButtonColor = () => {
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
};

CustomSubmitButtonColor.story = {
	name: 'Custom Submit Button color'
};

export const CustomClearButtonColor = () => {
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
};

CustomClearButtonColor.story = {
	name: 'Custom Clear Button color'
};

export const DefaultValueCanBeOverridden = () => {
	return {
		component: SearchInputComponent,
		props: {
			submit: action(onQueryChange),
			clear: action(onQueryClear),
			value: text('[(value)]', '* custom value from your application *')
		}
	};
};

DefaultValueCanBeOverridden.story = {
	name: 'Default value can be overridden'
};

export const MixAndMatch = () => {
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
};

MixAndMatch.story = {
	name: 'Mix-and-Match'
};
