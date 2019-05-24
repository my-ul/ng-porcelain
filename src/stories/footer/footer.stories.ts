import { FOOTER_DIRECTIVES } from './../../../projects/ng-porcelain/src/lib/footer/footer.module';
import { storiesOf } from '@storybook/angular';

import { FooterComponent } from '../../../projects/ng-porcelain/src/lib/footer/footer/footer.component';
import { FOOTER_IMPORTS } from '../../../projects/ng-porcelain/src/lib/footer/footer.module';

storiesOf('Footer component', module).add('Default Presentation', () => ({
	//component: FooterComponent,
	moduleMetadata: {
		imports: FOOTER_IMPORTS,
		declarations: FOOTER_DIRECTIVES
	},
	template: `
		<porcelain-footer></porcelain-footer>
	`
}));
