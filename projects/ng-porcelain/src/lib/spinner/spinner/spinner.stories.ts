import { SPINNER_IMPORTS, SPINNER_DIRECTIVES } from '../spinner.module';

export default {
	title: 'Blocks/Spinner'
};

export const DefaultPresentation = () => ({
	//component: SpinnerComponent,
	moduleMetadata: {
		imports: SPINNER_IMPORTS,
		declarations: SPINNER_DIRECTIVES
	},
	template: `
            <porcelain-spinner></porcelain-spinner>
        `
});
