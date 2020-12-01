import { moduleMetadata } from '@storybook/angular';
import { BREADCRUMB_IMPORTS, BREADCRUMB_DIRECTIVES } from './breadcrumb.module';

export default {
	title: 'Blocks/Breadcrumbs',
	decorators: [
		moduleMetadata({
			declarations: BREADCRUMB_DIRECTIVES,
			imports: BREADCRUMB_IMPORTS
		})
	]
};

export const DefaultPresentation = () => ({
	template: `
        <porcelain-breadcrumbs>
            <porcelain-breadcrumb-item>
                <a href="https://ul.com">UL.com</a>
            </porcelain-breadcrumb-item>

            <porcelain-breadcrumb-item>
                <a href="https://app.myportal.ul.com">myUL Portal</a>
            </porcelain-breadcrumb-item>

            <porcelain-breadcrumb-item>
                Orders
            </porcelain-breadcrumb-item>
        </porcelain-breadcrumbs> 
    `,
	props: {}
});

DefaultPresentation.story = {
	name: 'Default Presentation'
};
