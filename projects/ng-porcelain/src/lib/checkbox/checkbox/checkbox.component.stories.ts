import { CheckboxComponent } from './checkbox.component';
import { Meta, moduleMetadata } from '@storybook/angular';
import { boolean, withKnobs, text } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { CHECKBOX_IMPORTS, CHECKBOX_DIRECTIVES } from '../checkbox.module';

export default {
	title: 'Controls/Checkbox',
	component: CheckboxComponent,
	decorators: [
		withKnobs,
		withNotes,
		moduleMetadata({ imports: CHECKBOX_IMPORTS, declarations: CHECKBOX_DIRECTIVES })
	],
	parameters: {
		notes: {
			markdown: require('./README.md').default
		}
	}
} as Meta;

export const Default = () => ({
	template: `
    <porcelain-checkbox [(checked)]="checked" [disabled]="disabled">{{label}}</porcelain-checkbox>
    `,
	props: {
		label: text('Label', 'Checkbox 1'),
		checked: boolean('Checked?', true),
		disabled: boolean('Disabled', false)
	} as Partial<CheckboxComponent>
});
