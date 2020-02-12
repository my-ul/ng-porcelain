import { configure, addDecorator, addParameters } from '@storybook/angular';

function loadStories() {
	require('../projects/ng-porcelain/src/lib/applicator/applicator/applicator.stories');
	require('../projects/ng-porcelain/src/lib/refiners/refiners/refiners.stories');
	require('../projects/ng-porcelain/src/lib/date-refiner/date-refiner/date-refiner.component');
	require('../projects/ng-porcelain/src/lib/simple-refiner/simple-refiner/simple-refiner.stories');
	require('../projects/ng-porcelain/src/lib/footer/footer/footer.stories');
	require('../projects/ng-porcelain/src/lib/spinner/spinner/spinner.stories');
	require('../projects/ng-porcelain/src/lib/search-input/search-input/search-input.stories');
}

addParameters({
	backgrounds: [
		{ name: 'UL White', value: '#fff', default: true },
		{ name: 'UL Black', value: '#000' },
		{ name: 'UL Gray', value: '#939598' },
		{ name: 'UL Gray Dark', value: '#424242' },
		{ name: 'UL Steel', value: '#e4ebf5' },
		{ name: 'UL Steel Medium', value: '#cdd6e4' },
		{ name: 'UL Steel Dark', value: '#9fadbb' },
		{ name: 'UL Action Danger', value: '#e54c50' },
		{ name: 'UL Action Primary', value: '#4a92e2' },
		{ name: 'UL Blue', value: '#55bab7' },
		{ name: 'UL Blue Medium', value: '#007987' },
		{ name: 'UL Blue Dark', value: '#002b45' },
		{ name: 'UL Green', value: '#8fd400' },
		{ name: 'UL Green Medium', value: '#3d9b35' },
		{ name: 'UL Green Dark', value: '#235937' },
		{ name: 'UL Red', value: '#b10820' },
		{ name: 'UL Red Medium', value: '#850416' },
		{ name: 'UL Red Dark', value: '#5f3032' },
		{ name: 'UL Sand', value: '#cbc0b7' },
		{ name: 'UL Sand Medium', value: '#ab9c8f' },
		{ name: 'UL Sand Dark', value: '#675545' },
		{ name: 'UL Yellow', value: '#ffd451' },
		{ name: 'UL Yellow Medium', value: '#ef8200' },
		{ name: 'UL Yellow Dark', value: '#9e6214' }
	]
});

configure(loadStories, module);
