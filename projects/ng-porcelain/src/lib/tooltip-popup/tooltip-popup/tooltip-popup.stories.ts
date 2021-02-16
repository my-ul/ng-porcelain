import { TOOLTIPPOPUP_IMPORTS, TOOLTIPPOPUP_DIRECTIVES } from '../tooltip-popup.module';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';
import { TooltipPopupComponent } from '../tooltip-popup/tooltip-popup.component';

const onQueryChange = 'On check-box click';
const onQueryClear = 'On modal close';

export default {
	title: 'Popup/Tooltip',

	decorators: [
		withKnobs, // Create Synthetic Module
		moduleMetadata({
			imports: TOOLTIPPOPUP_IMPORTS,
			declarations: TOOLTIPPOPUP_DIRECTIVES
		})
	]
};

export const DefaultModalPopup = () => ({
	return: {
		component: TooltipPopupComponent,
		props: {
			onCheckBoxClick: action(onQueryChange),
			onModalClose: action(onQueryClear)
		}
	},
	template: `
            <porcelain-popup>
                <porcelain-tooltip-head>
                        Quick Tip
                </porcelain-tooltip-head>
                    <porcelain-tooltip-content>
                         Expand the application menu by clicking on these arrows. Once open, close the menu by clicking on the same arrows.
 
                    </porcelain-tooltip-content>
                <porcelain-tooltip-msg>
                         Don't show this again

                </porcelain-tooltip-msg>
            </porcelain-popup>
        `
});
