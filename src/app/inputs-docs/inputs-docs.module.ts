import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { InputsModule, LegacySearchInputModule } from '@my-ul/ng-porcelain';

import { PasswordInputDocsComponent } from './password-input-docs/password-input-docs.component';
import { TextInputDocsComponent } from './text-input-docs/text-input-docs.component';
import { InputsDocsIndexComponent } from './inputs-docs-index/inputs-docs-index.component';
import { SearchInputDocsComponent } from './search-input-docs/search-input-docs.component';

export const routes: Routes = [
	{
		path: '',
		component: InputsDocsIndexComponent,
		children: [
			{ path: 'password-input', component: PasswordInputDocsComponent },
			{ path: 'text-input', component: TextInputDocsComponent },
			{ path: 'search-input', component: SearchInputDocsComponent }
		]
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), InputsModule, LegacySearchInputModule],
	declarations: [
		PasswordInputDocsComponent,
		TextInputDocsComponent,
		InputsDocsIndexComponent,
		SearchInputDocsComponent
	]
})
export class InputsDocsModule {}
