import { number, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

import { SKELETON_DIRECTIVES, SKELETON_IMPORTS } from './skeletons.module';

import { SkeletonBlockComponent } from './block/block.component';
import { SkeletonLineComponent } from './line/line.component';
import { SkeletonParagraphComponent } from './paragraph/paragraph.component';
import { SkeletonWordComponent } from './word/word.component';
import { withNotes } from '@storybook/addon-notes';

export default {
	title: 'Blocks/Skeletons',
	decorators: [
		moduleMetadata({
			declarations: SKELETON_DIRECTIVES,
			imports: SKELETON_IMPORTS
		}),
		withKnobs,
		withNotes
	],
	parameters: {
		notes: {
			markdown: require('./README.md')
		}
	}
};

export const Block = () => ({
	component: SkeletonBlockComponent,
	props: {}
});

export const Word = () => ({
	component: SkeletonWordComponent,
	props: { characters: number('Characters', 5) }
});

export const Line = () => ({
	component: SkeletonLineComponent,
	props: {
		minLength: number('Minimum number of characters', 7),
		maxLength: number('Maximum number of characters', 15)
	} as Partial<SkeletonLineComponent>
});

export const Paragraph = () => ({
	component: SkeletonParagraphComponent,
	props: { lines: number('Number of lines', 4) }
});
