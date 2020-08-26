// Storybook
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { TOOLBAR_DIRECTIVES, TOOLBAR_IMPORTS, ToolbarButtonComponent } from '..';
import {
	faSearch,
	faExpandArrowsAlt,
	faCaretLeft,
	faCaretRight,
	faShare
} from '@fortawesome/free-solid-svg-icons';

export default {
	title: 'Toolbar System/Button',

	decorators: [
		moduleMetadata({
			declarations: TOOLBAR_DIRECTIVES,
			imports: TOOLBAR_IMPORTS
		})
	]
};

export const NoIcon = () => {
	return {
		template: `
                <porcelain-toolbar-button (onClick)="onClick($event)">
                    Button Without Icon
                </porcelain-toolbar-button>
            `,
		props: {
			onClick: action('Button Without Icon clicked')
		}
	};
};

NoIcon.story = {
	name: 'No Icon'
};

export const NoLabel = () => {
	return {
		template: `
                <porcelain-toolbar-button 
                    [isLabelSrOnly]="true" 
                    [icon]="faSearch" 
                    (onClick)="onClick($event)">
                    Screen-Reader Label
                </porcelain-toolbar-button>
            `,
		props: {
			faSearch: faSearch,
			onClick: action('Button w/out visible label clicked')
		}
	};
};

// NoLabel.story = {
// 	name: 'Show without visible label'
// };

export const IconAfterLabel = () => {
	return {
		template: `
                <porcelain-toolbar-button
                    [icon]="faSearch"
                    [iconPosition]="iconPosition" 
                    (onClick)="onClick($event)">
                    Icon After Label
                </porcelain-toolbar-button>
            `,
		props: {
			faSearch: faSearch,
			onClick: action('Button w/ Icon After Label clicked'),
			iconPosition: 'after'
		}
	};
};

export const FullWidthBlock = () => {
	return {
		template: `
                <porcelain-toolbar>
                    <porcelain-toolbar-cell [flex]="'0 0 50%'">
                        <porcelain-toolbar-button 
                            [isBlock]="true"
                            [icon]="prevIcon" 
                            (onClick)="onClick()">
                            Previous
                        </porcelain-toolbar-button>
                    </porcelain-toolbar-cell>
                    
                    <porcelain-toolbar-cell [flex]="'0 0 50%'">
                        <porcelain-toolbar-button 
                            [isBlock]="true"
                            [icon]="nextIcon" 
                            [iconPosition]="'after'"
                            (onClick)="onClick()">
                            Full-Width Button
                        </porcelain-toolbar-button>
                    </porcelain-toolbar-cell>
                </porcelain-toolbar>
            `,
		props: {
			prevIcon: faCaretLeft,
			nextIcon: faCaretRight,
			onClick: action('Full-Width Button clicked')
		}
	};
};

FullWidthBlock.story = {
	name: 'Container-Width (isBlock)'
};

export const Disabled = () => {
	return {
		template: `
                <porcelain-toolbar>
                    <porcelain-toolbar-cell [flex]="'0 0 50%'">
                        <porcelain-toolbar-button 
                            [isBlock]="true"
                            [icon]="prevIcon" 
                            (onClick)="onClick($event)"
                            [disabled]="true">
                            Previous
                        </porcelain-toolbar-button>
                    </porcelain-toolbar-cell>
                    
                    <porcelain-toolbar-cell [flex]="'0 0 50%'">
                        <porcelain-toolbar-button 
                            [isBlock]="true"
                            [icon]="nextIcon" 
                            [iconPosition]="'after'"
                            (onClick)="onClick($event)">
                            Full-Width Button
                        </porcelain-toolbar-button>
                    </porcelain-toolbar-cell>
                </porcelain-toolbar>
            `,
		props: {
			prevIcon: faCaretLeft,
			nextIcon: faCaretRight,
			onClick: action('Full-Width Button clicked')
		}
	};
};

export const ButtonsIconWithScreenReaderOnlyText = () => {
	return {
		template: `
            <porcelain-toolbar-button [icon]="icon" [isLabelSrOnly]="true" (onClick)="onClick()">Text</porcelain-toolbar-button>
            `,
		props: {
			icon: faShare,
			label: 'Share',
			onClick: action('Button Clicked')
		}
	};
};

ButtonsIconWithScreenReaderOnlyText.story = {
	name: 'Icon with Screen-Reader-Only Text'
};

export const ButtonsIconAndLabel = () => {
	return {
		template: `
            <porcelain-toolbar-button [icon]="icon">Text</porcelain-toolbar-button>
            `,
		props: {
			icon: faShare,
			label: 'Share'
		}
	};
};

ButtonsIconAndLabel.story = {
	name: 'Default'
};
