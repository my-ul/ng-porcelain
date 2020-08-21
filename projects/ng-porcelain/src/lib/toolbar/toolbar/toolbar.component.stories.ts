// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

// Third Party
import {
	faShare,
	faArrowRight,
	faArrowLeft,
	faCaretLeft,
	faCaretRight,
	faSave
} from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

// Porcelain
import { TOOLBAR_DIRECTIVES, TOOLBAR_IMPORTS } from '../toolbar.module';

export default {
	title: 'Toolbar System/Toolbar',

	decorators: [
		withKnobs,
		moduleMetadata({
			declarations: TOOLBAR_DIRECTIVES,
			imports: TOOLBAR_IMPORTS
		})
	]
};

export const ToolbarRightAligned = () => {
	return {
		template: `
            <porcelain-toolbar [alignRight]="true">
                <porcelain-toolbar-cell [flex]="0">
                    <porcelain-toolbar-button [icon]="icon">
                        Share
                    </porcelain-toolbar-button>
                </porcelain-toolbar-cell>

                <porcelain-toolbar-cell [flex]="0">
                    <porcelain-toolbar-text>1,024 Results</porcelain-toolbar-text>
                </porcelain-toolbar-cell>
            </porcelain-toolbar>
            `,
		props: {
			icon: faCopy
		}
	};
};

ToolbarRightAligned.story = {
	name: 'Right-Aligned Toolbar'
};
