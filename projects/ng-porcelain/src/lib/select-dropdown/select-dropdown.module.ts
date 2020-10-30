import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Import Directives
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';

//Import custom search pipe
import { SearchPipePipe } from './pipes/search-pipe.pipe';

export const SELECT_DROPDOWN_DIRECTIVES = [SelectDropdownComponent, SearchPipePipe];
export const SELECT_DROPDOWN_IMPORTS = [CommonModule, FormsModule];

@NgModule({
	declarations: SELECT_DROPDOWN_DIRECTIVES,
	imports: SELECT_DROPDOWN_IMPORTS,
	exports: SELECT_DROPDOWN_DIRECTIVES
})
export class SelectDropdownModule {}
