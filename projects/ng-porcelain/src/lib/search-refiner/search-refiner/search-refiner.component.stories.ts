import * as lipsum from 'fast-lorem-ipsum';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, number, object } from '@storybook/addon-knobs';

const notes = require('./README.md');

import { SimpleOption } from '../../shared/types/Options/SimpleOption';
import {
	SimpleRefinerDefinition,
	SimpleRefiner
} from '../../shared/types/Refiners/SimpleRefinerDefinition';
import { SearchRefinerComponent } from './search-refiner.component';
import { SEARCH_REFINER_IMPORTS, SEARCH_REFINER_DIRECTIVES } from '../search-refiner.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SEARCH_INPUT_DIRECTIVES } from '../../search-input/search-input.module';
import { usStatesFull } from '../../simple-refiner/simple-refiner/simple-refiner.stories';

export default {
	title: 'Refiner System/SearchRefiner',
	decorators: [withNotes, withKnobs]
};

export const ShortSelector = () => {
	const refiner = new SimpleRefinerDefinition({
		slug: 'state',
		title: 'States, via <p-simple-refiner>',
		options: usStatesFull
	});

	refiner.valueSubject.subscribe(action('[REFINER] valueSubject fire'));

	return {
		component: SearchRefinerComponent,
		template: `
		<button (click)="reset()">Set to Wyoming</button>
		<p-search-refiner 
			[refiner]="refiner"
			(onRefinerChange)="onRefinerChange($event)"
			(activeKeysChange)="activeKeysChange($event)"
			></p-search-refiner>`.trim(),
		moduleMetadata: {
			declarations: SEARCH_REFINER_DIRECTIVES,
			imports: [BrowserAnimationsModule, ...SEARCH_REFINER_IMPORTS]
		},
		props: {
			onRefinerChange: action('[COMPONENT] onRefinerChange fire') as any,
			activeKeysChange: action('[COMPONENT] activeKeysChange fire') as any,
			refiner,
			reset: function() {
				refiner.valueSubject.next(['WY']);
				//refiner.valueSubject.next(['WY'])
			}
		} as Partial<SearchRefinerComponent>
	};
};

ShortSelector.story = {
	name: 'Short Selectors',
	parameters: {
		notes: { markdown: notes }
	}
};

export const DefaultPresentation = () => {
	let options = [];
	// TODO: make this knob work
	let numberOfItems = number('# of options', 250, { min: 2, step: 1 });
	//let numberOfItems = 1000;
	for (let i = 1; i <= numberOfItems; i++) {
		options.push(
			new SimpleOption({
				label: `Option ${i.toLocaleString()}. ${lipsum('50w')}`,
				slug: `option-${i}`,
				badge: 1000 + i
			})
		);
	}

	let refiner = new SimpleRefinerDefinition({
		slug: 'optionsWithBadges',
		title: 'Options with Badges',
		options: options.reduce((opts, item) => {
			opts[item.slug] = item;
			return opts;
		}, {})
	});

	return {
		component: SearchRefinerComponent,
		moduleMetadata: {
			imports: [BrowserAnimationsModule, ...SEARCH_REFINER_IMPORTS]
		},
		props: {
			isOpen: true,
			onRefinerChange: action('[REFINER] onRefinerChange fired'),
			activeKeysChange: action('[COMPONENT] activeKeysChange fired'),
			refiner
		}
	};
};

DefaultPresentation.story = {
	name: 'Default Presentation',
	parameters: {
		notes: { markdown: notes }
	}
};

export const LotsOfOptions = () => {
	let options = [];
	// TODO: make this knob work
	let numberOfItems = number('# of options', 1500, { min: 2, step: 1 });
	//let numberOfItems = 1000;
	for (let i = 1; i <= numberOfItems; i++) {
		options.push(
			new SimpleOption({
				label: `Option ${i.toLocaleString()}. ${lipsum('50w')}`,
				slug: `option-${i}`,
				badge: 1000 + i
			})
		);
	}

	let refiner = new SimpleRefinerDefinition({
		slug: 'optionsWithBadges',
		title: 'Lots of Options',
		options: options.reduce((opts, item) => {
			opts[item.slug] = item;
			return opts;
		}, {})
	});

	return {
		component: SearchRefinerComponent,
		moduleMetadata: {
			imports: [BrowserAnimationsModule, ...SEARCH_REFINER_IMPORTS]
		},
		props: {
			isOpen: true,
			onRefinerChange: action('[REFINER] onRefinerChange fired'),
			activeKeysChange: action('[COMPONENT] activeKeysChange fired'),
			refiner
		}
	};
};

LotsOfOptions.story = {
	name: 'Lots of `SimpleOption`s',
	parameters: {
		notes: { markdown: notes }
	}
};

export const smallListRefiners = {
	AL: new SimpleOption({ badge: 4888949, label: 'Alabama', slug: 'AL' }),
	AK: new SimpleOption({ badge: 738068, label: 'Alaska', slug: 'AK' }),
	AZ: new SimpleOption({ badge: 7123898, label: 'Arizona', slug: 'AZ' }),
	AR: new SimpleOption({ badge: 3020327, label: 'Arkansas', slug: 'AR' }),
	CA: new SimpleOption({ badge: 39776830, label: 'California', slug: 'CA' }),
	CO: new SimpleOption({ badge: 5684203, label: 'Colorado', slug: 'CO' }),
	CN: new SimpleOption({ badge: 3588683, label: 'Connecticut', slug: 'CN' })
};

export const samllList = () => {
	const refiner = new SimpleRefinerDefinition({
		slug: 'state',
		title: 'Small List',
		options: smallListRefiners
	});

	refiner.valueSubject.subscribe(action('[REFINER] valueSubject fire'));

	return {
		component: SearchRefinerComponent,
		template: `
		<button (click)="reset()">Set to Wyoming</button>
		<p-search-refiner 
			[refiner]="refiner"
			(onRefinerChange)="onRefinerChange($event)"
			(activeKeysChange)="activeKeysChange($event)"
			></p-search-refiner>`.trim(),
		moduleMetadata: {
			declarations: SEARCH_REFINER_DIRECTIVES,
			imports: [BrowserAnimationsModule, ...SEARCH_REFINER_IMPORTS]
		},
		props: {
			onRefinerChange: action('[COMPONENT] onRefinerChange fire') as any,
			activeKeysChange: action('[COMPONENT] activeKeysChange fire') as any,
			refiner,
			reset: function() {}
		} as Partial<SearchRefinerComponent>
	};
};

samllList.story = {
	name: 'small list',
	parameters: {
		notes: { markdown: notes }
	}
};
