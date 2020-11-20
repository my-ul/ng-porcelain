import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

import { SavedsearchModalpopupComponent } from './savedsearch-modalpopup.component';
import { SAVEDSEARCHMODAL_DIRECTIVES, SAVEDSEARCHMODAL_IMPORTS } from '../savedsearch-modalpopup.module';

const onQueryChange = 'On check-box click';
const onQueryClear = 'On modal close';

export default {
	title: 'SavedSearchsss/Modal-PopUp',

	decorators: [
		withKnobs, // Create Synthetic Module
		moduleMetadata({
			declarations: SAVEDSEARCHMODAL_DIRECTIVES,
			imports: SAVEDSEARCHMODAL_IMPORTS
		})
	]
};

export const Default = () => {
	/**
	 * @example
	 * <porcelain-modal-popup
	 * 		(onCheckBoxClick)="action(onQueryChange)"
	 * 		(onModalClose)="action(onQueryChange)"
	 *
	 * 		>
	 *
	 * 		</porcelain-search-input>
	 */

	return {
		component: SavedsearchModalpopupComponent,
		props: {
			onCheckBoxClick: action(onQueryChange),
			onModalClose: action(onQueryClear)
		}
	};
};

Default.story = { name: 'Default Modal-PopUp' };
