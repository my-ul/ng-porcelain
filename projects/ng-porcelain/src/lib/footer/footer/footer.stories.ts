import { storiesOf } from '@storybook/angular';

import { FOOTER_DIRECTIVES, FOOTER_IMPORTS } from '../footer.module';
import { FooterComponent } from './footer.component';

storiesOf('Footer component', module).add('Default Presentation', () => ({
	component: FooterComponent,
	moduleMetadata: {
		imports: FOOTER_IMPORTS,
		declarations: FOOTER_DIRECTIVES
	},
	template: `
		<porcelain-footer></porcelain-footer>
	`
}));
