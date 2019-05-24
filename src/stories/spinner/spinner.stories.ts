import { SPINNER_DIRECTIVES } from './../../../projects/ng-porcelain/src/lib/spinner/spinner.module';
import { storiesOf } from '@storybook/angular';
import { SpinnerComponent } from 'projects/ng-porcelain/src/lib/spinner/spinner/spinner.component';
import { SPINNER_IMPORTS } from 'projects/ng-porcelain/src/lib/spinner/spinner.module';

storiesOf('Spinner Component', module).add('Default Presentation', () => ({
	//component: SpinnerComponent,
	moduleMetadata: {
		imports: SPINNER_IMPORTS,
		declarations: SPINNER_DIRECTIVES
	},
	template: `
			<porcelain-spinner></porcelain-spinner>
		`
}));
