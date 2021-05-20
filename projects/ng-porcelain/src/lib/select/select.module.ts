import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { OptionComponent } from './option/option.component';
import { OptgroupComponent } from './optgroup/optgroup.component';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './options/options.component';

export const SELECT_DIRECTIVES = [SelectComponent, OptionComponent, OptgroupComponent, OptionsComponent];

export const SELECT_IMPORTS = [CommonModule, FormsModule];

@NgModule({
	declarations: SELECT_DIRECTIVES,
	imports: SELECT_IMPORTS,
	exports: SELECT_IMPORTS
})
export class SelectModule {}
