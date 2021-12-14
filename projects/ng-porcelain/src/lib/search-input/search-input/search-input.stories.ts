import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

// Icons for testing alternative presentations
import { faArrowAltCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

// Module Imports for synthetic module
import { SEARCH_INPUT_DIRECTIVES, SEARCH_INPUT_IMPORTS } from '../search-input.module';
import { SearchInputComponent } from './search-input.component';

const onQueryChange = 'Search Input Query submitted';
const onQueryClear = 'Search Input Query cleared';

export default {
	title: 'Controls/Legacy Search Input',

	decorators: [
		withKnobs, // Create Synthetic Module
		moduleMetadata({
			declarations: SEARCH_INPUT_DIRECTIVES,
			imports: SEARCH_INPUT_IMPORTS
		})
	]
};

export const Default = () => {
	/**
	 * @example
	 * <porcelain-search-input
	 * 		(submitHandler)="action(onQueryChange)"
	 * 		></porcelain-search-input>
	 */
	return {
		component: SearchInputComponent,
		props: {
			submitHandler: action(onQueryChange),
			emptyHandler: action(onQueryClear)
		}
	};
};

export const CustomPlaceholderText = () => {
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
			updateSearchValue: action('user has typed value'),
			placeholderLabel: text('Placeholder Label', 'Volume')
		}
	};
};

export const IconsSubmit = () => {
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
};

IconsSubmit.story = {
	name: 'Icons/Submit'
};

export const IconsClear = () => {
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
};

IconsClear.story = {
	name: 'Icons/Clear'
};

export const NoBorders = () => {
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
};

NoBorders.story = {
	name: 'No borders'
};

export const ColorsSubmitButton = () => {
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
};

ColorsSubmitButton.story = {
	name: 'Colors/Submit Button'
};

export const ColorsClearButton = () => {
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
};

ColorsClearButton.story = {
	name: 'Colors/Clear Button'
};

export const DefaultValueCanBeOverridden = () => {
	return {
		component: SearchInputComponent,
		props: {
			submitHandler: action(onQueryChange),
			emptyHandler: action(onQueryClear),
			userValue: text('Value', 'Entered')
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
			submitHandler: action(onQueryChange),
			clearIconColor: color('Clear Icon Color', '#ff0000'),
			submitIconColor: color('Submit Icon Color', '#00ff00'),
			placeholderLabel: text('Placeholder Label', 'Volume'),
			borders: boolean('Enable Border', true),
			userValue: text('userValue Label', 'Entered'),
			emptyHandler: action(onQueryClear)
		}
	};
};

MixAndMatch.story = {
	name: 'Mix-and-Match'
};
