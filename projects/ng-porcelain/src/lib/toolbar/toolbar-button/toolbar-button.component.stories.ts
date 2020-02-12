// Storybook
import { action } from '@storybook/addon-actions';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { TOOLBAR_DIRECTIVES, TOOLBAR_IMPORTS, ToolbarButtonComponent } from '..';
import {
	faSearch,
	faExpandArrowsAlt,
	faCaretLeft,
	faCaretRight
} from '@fortawesome/free-solid-svg-icons';

storiesOf('Toolbar/Button', module)
	.addDecorator(
		moduleMetadata({
			declarations: TOOLBAR_DIRECTIVES,
			imports: TOOLBAR_IMPORTS
		})
	)
	.add('No Icon', () => {
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
	})
	.add('Show without visible label', () => {
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
	})
	.add('Icon After Label', () => {
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
	})
	.add('Full-Width (block)', () => {
		return {
			template: `
				<porcelain-toolbar>
					<porcelain-toolbar-cell [flex]="'0 0 50%'">
						<porcelain-toolbar-button 
							[isBlock]="true"
							[icon]="prevIcon" 
							(onClick)="onClick($event)">
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
	})
	.add('Disabled', () => {
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
	});
