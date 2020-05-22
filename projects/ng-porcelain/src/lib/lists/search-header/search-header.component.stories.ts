import { storiesOf, moduleMetadata } from '@storybook/angular';
import { LISTS_DIRECTIVES, LISTS_IMPORTS } from '../lists.module';
import { SearchHeaderComponent } from './search-header.component';

storiesOf('Refiners/Applicator Component', module)
	.addDecorator(
		moduleMetadata({
			declarations: LISTS_DIRECTIVES,
			imports: LISTS_IMPORTS
		})
	)
	.add('Default', () => {
		return {
			//component: SearchHeaderComponent,
			props: {},
			template: `
                <porcelain-search-header></porcelain-search-header>
            `
		};
	});
