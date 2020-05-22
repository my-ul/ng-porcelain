import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input/password-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const INPUTS_COMPONENTS = [PasswordInputComponent, TextInputComponent];
export const INPUTS_IMPORTS = [CommonModule, FormsModule, FontAwesomeModule];

@NgModule({
	imports: INPUTS_IMPORTS,
	declarations: INPUTS_COMPONENTS,
	exports: INPUTS_COMPONENTS
})
export class InputsModule {}
