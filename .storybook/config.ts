import { configure, addDecorator } from '@storybook/angular';

function loadStories() {
	require('../src/stories/refiners/refiners.stories');
	require('../src/stories/date-refiner/date-refiner.stories');
	require('../src/stories/simple-refiner/simple-refiner.stories');
}

configure(loadStories, module);
