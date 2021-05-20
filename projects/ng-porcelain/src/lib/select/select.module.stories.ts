import { moduleMetadata } from '@storybook/angular';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import { SELECT_DIRECTIVES, SELECT_IMPORTS } from './select.module';
import { SelectComponent } from './select/select.component';

import lorem from 'fast-lorem-ipsum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { htmlFence } from '../../../../../.storybook/StorybookUtilities';
import { usStatesHash } from '../simple-refiner/simple-refiner/simple-refiner.stories';
import { group } from '@angular/animations';

export default {
	title: 'Controls/Select',
	decorators: [
		moduleMetadata({
			declarations: SELECT_DIRECTIVES,
			imports: [BrowserAnimationsModule, ...SELECT_IMPORTS]
		}),
		withKnobs
	]
};

let groupedStates = Object.keys(usStatesHash)
	.map((key, idx) => usStatesHash[key])
	.reduce((reduced, current) => {
		const firstLetter = current[0];
		if (reduced[firstLetter] !== undefined) {
			reduced[firstLetter].push(current);
		} else {
			reduced[firstLetter] = [current];
		}
		return reduced;
	}, {});

let groupStrs = [];
for (let letter in groupedStates) {
	groupStrs.push('<div>');
	groupStrs.push(`<h4>Starts with ${letter}</h4>`);
	for (let state of groupedStates[letter]) {
		groupStrs.push(`<porcelain-option [value]="'${state}'">${state}</porcelain-option>`);
	}
	groupStrs.push('</div>');
}

console.log(groupedStates);

/**
 * Default Presentation Template
 * This is extracted into a variable so that it can be used in the Notes tab.
 */
let defaultPresentationTemplate = `
<porcelain-select [search]="search" [query]="">
    <porcelain-selected-window>
    
    </porcelain-selected-window>
    <porcelain-options>
        ${groupStrs.join('\n')}
    </porcelain-options>
</porcelain-select>
`.trim();

export const DefaultPresentation = () => {
	return {
		component: SelectComponent,
		template: defaultPresentationTemplate,
		props: {
			search: boolean('Allow search?', false)
		} as Partial<SelectComponent>
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
