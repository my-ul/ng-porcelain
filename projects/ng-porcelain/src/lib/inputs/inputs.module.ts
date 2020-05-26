import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PasswordInputComponent } from './password-input/password-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { SearchInputComponent } from './search-input/search-input.component';

export const INPUTS_COMPONENTS = [PasswordInputComponent, TextInputComponent, SearchInputComponent];
export const INPUTS_IMPORTS = [CommonModule, FormsModule, FontAwesomeModule];

@NgModule({
	imports: INPUTS_IMPORTS,
	declarations: INPUTS_COMPONENTS,
	exports: INPUTS_COMPONENTS
})
export class InputsModule {}
