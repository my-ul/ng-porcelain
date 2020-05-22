import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputDocsComponent } from './password-input-docs/password-input-docs.component';
import { TextInputDocsComponent } from './text-input-docs/text-input-docs.component';
import { InputsDocsIndexComponent } from './inputs-docs-index/inputs-docs-index.component';
import { Routes, RouterModule } from '@angular/router';

import { InputsModule } from '../../../projects/ng-porcelain/src/lib/inputs/inputs.module';

export const routes: Routes = [
	{
		path: '',
		component: InputsDocsIndexComponent,
		children: [
			{ path: 'password-input', component: PasswordInputDocsComponent },
			{ path: 'text-input', component: TextInputDocsComponent }
		]
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), InputsModule],
	declarations: [PasswordInputDocsComponent, TextInputDocsComponent, InputsDocsIndexComponent]
})
export class InputsDocsModule {}
