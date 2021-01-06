import { moduleMetadata } from '@storybook/angular';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import { ExpandoComponent } from './expando/expando.component';
import { EXPANDO_DIRECTIVES, EXPANDO_IMPORTS } from './expando.module';

import lorem from 'fast-lorem-ipsum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { htmlFence } from '../../../../../.storybook/StorybookUtilities';

export default {
	title: 'Blocks/Expando',
	decorators: [
		moduleMetadata({
			declarations: EXPANDO_DIRECTIVES,
			imports: [BrowserAnimationsModule, ...EXPANDO_IMPORTS]
		}),
		withKnobs
	]
};

/**
 * Default Presentation Template
 * This is extracted into a variable so that it can be used in the Notes tab.
 */
let defaultPresentationTemplate = `
<porcelain-expando [title]="title" [iconPosition]="iconPosition" [isOpen]="isOpen">
	<p>${lorem('40w')}</p>
	<p>${lorem('40w')}</p>
	<p>${lorem('40w')}</p>
</porcelain-expando>
`.trim();

export const DefaultPresentation = () => {
	return {
		component: ExpandoComponent,
		template: defaultPresentationTemplate,
		props: {
			iconPosition: 'after',
			title: 'Expando with icon AFTER header',
			isOpen: boolean('Open?', true)
		} as Partial<ExpandoComponent>
	};
};

DefaultPresentation.story = {
	name: 'Default Presentation',
	parameters: {
		notes: {
			markdown: [
				'# Story Source',
				htmlFence(defaultPresentationTemplate),
				require('./README.md').default
			].join('\n\n')
		}
	}
};

/**
 * Template for UseChildComponents story
 * The template is extracted into a template so it can be shown in the Notes tab.
 */
let usingChildComponentsTemplate = `
<porcelain-expando [iconPosition]="iconPosition">
	<porcelain-expando-header>
		<h3>Using Header and Body components</h3>
	</porcelain-expando-header>
	<porcelain-expando-body>
		<p>This Expando example is using two child components, porcelain-expando-header and porcelain-expando-body, to show content.</p>
		<p>By using child components, you can put whatever you want in the header/body areas.</p>
		<p>${lorem('50w')}</p>
		<p>${lorem('50w')}</p>
	</porcelain-expando-body>
</porcelain-expando>
`.trim();

export const UsingChildComponents = () => ({
	component: ExpandoComponent,
	template: usingChildComponentsTemplate,
	props: { iconPosition: 'after' } as Partial<ExpandoComponent>
});

UsingChildComponents.story = {
	name: 'Using Child Components',
	parameters: {
		notes: {
			markdown: [
				'# Story Source',
				htmlFence(usingChildComponentsTemplate),
				require('./README.md').default
			].join('\n\n')
		}
	}
};
