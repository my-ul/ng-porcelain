import { FOOTER_DIRECTIVES, FOOTER_IMPORTS } from '../footer.module';
import { FooterComponent } from './footer.component';

export default {
	title: 'Blocks/Footer'
};

export const DefaultPresentation = () => ({
	component: FooterComponent,
	moduleMetadata: {
		imports: FOOTER_IMPORTS,
		declarations: FOOTER_DIRECTIVES
	},
	template: `
        <porcelain-footer></porcelain-footer>
    `
});
