import { storiesOf } from '@storybook/angular';
import { SPINNER_IMPORTS, SPINNER_DIRECTIVES } from '../spinner.module';

storiesOf('Spinner', module).add('Default Presentation', () => ({
	//component: SpinnerComponent,
	moduleMetadata: {
		imports: SPINNER_IMPORTS,
		declarations: SPINNER_DIRECTIVES
	},
	template: `
			<porcelain-spinner></porcelain-spinner>
		`
}));
