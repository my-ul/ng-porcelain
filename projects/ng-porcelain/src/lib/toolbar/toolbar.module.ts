import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarTextComponent } from './toolbar-text/toolbar-text.component';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { ToolbarSelectComponent } from './toolbar-select/toolbar-select.component';
import { ToolbarOptionComponent } from './toolbar-option/toolbar-option.component';
import { ToolbarCellComponent } from './toolbar-cell/toolbar-cell.component';
import { ToolbarSelectedTemplateComponent } from './toolbar-selected-template/toolbar-selected-template.component';
import { ToolbarsComponent } from './toolbars/toolbars.component';
import { SearchInputComponent } from '../search-input/search-input/search-input.component';

export const TOOLBAR_IMPORTS = [CommonModule, FontAwesomeModule];
export const TOOLBAR_DIRECTIVES = [
	ToolbarsComponent,
	ToolbarComponent,
	ToolbarTextComponent,
	ToolbarButtonComponent,
	ToolbarSelectComponent,
	ToolbarOptionComponent,
	ToolbarCellComponent,
	ToolbarSelectedTemplateComponent,
	SearchInputComponent
];

@NgModule({
	declarations: TOOLBAR_DIRECTIVES,
	imports: TOOLBAR_IMPORTS,
	exports: TOOLBAR_DIRECTIVES
})
export class ToolbarModule {}
