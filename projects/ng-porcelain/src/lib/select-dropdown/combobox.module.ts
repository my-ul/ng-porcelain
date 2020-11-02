import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Import Directives
import { ComboboxComponent } from './select-dropdown/combobox.component';

//Import custom search pipe
import { SearchPipePipe } from './pipes/search-pipe.pipe';

export const SELECT_DROPDOWN_DIRECTIVES = [ComboboxComponent, SearchPipePipe];
export const SELECT_DROPDOWN_IMPORTS = [CommonModule, FormsModule];

@NgModule({
	declarations: SELECT_DROPDOWN_DIRECTIVES,
	imports: SELECT_DROPDOWN_IMPORTS,
	exports: SELECT_DROPDOWN_DIRECTIVES
})
export class ComboboxModule {}
