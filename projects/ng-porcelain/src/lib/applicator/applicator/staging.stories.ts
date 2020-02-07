import { storiesOf, moduleMetadata } from '@storybook/angular';
import { APPLICATOR_DIRECTIVES, APPLICATOR_IMPORTS } from '../applicator.module';

storiesOf('Staging System', module)
	.addDecorator(
		moduleMetadata({
			declarations: APPLICATOR_DIRECTIVES,
			imports: APPLICATOR_IMPORTS
		})
	)
	.add('External State', () => {
		return {
			template: `
                <div>
                    
                </div>
            `
		};
	});
