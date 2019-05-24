import { configure, addDecorator } from '@storybook/angular';

function loadStories() {
	require('../src/stories/refiners/refiners.stories');
	require('../src/stories/date-refiner/date-refiner.stories');
	require('../src/stories/simple-refiner/simple-refiner.stories');
	require('../src/stories/applicator/applicator.stories');
	require('../src/stories/footer/footer.stories');
	require('../src/stories/spinner/spinner.stories');
}

configure(loadStories, module);
