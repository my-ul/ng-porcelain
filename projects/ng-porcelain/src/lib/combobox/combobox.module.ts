import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Import Directives
import { ComboboxComponent } from './combobox/combobox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../pipes/pipes.module';

export const COMBOBOX_DIRECTIVES = [ComboboxComponent];
export const COMBOBOX_IMPORTS = [CommonModule, FormsModule, PipesModule, FontAwesomeModule];

@NgModule({
	declarations: COMBOBOX_DIRECTIVES,
	imports: COMBOBOX_IMPORTS,
	exports: COMBOBOX_DIRECTIVES
})
export class ComboboxModule {}
