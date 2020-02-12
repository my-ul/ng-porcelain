import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Other Modules
import { SearchInputModule } from '../search-input/search-input.module';

// This module
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarTextComponent } from './toolbar-text/toolbar-text.component';
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { ToolbarSelectComponent } from './toolbar-select/toolbar-select.component';
import { ToolbarOptionComponent } from './toolbar-option/toolbar-option.component';
import { ToolbarCellComponent } from './toolbar-cell/toolbar-cell.component';
import { ToolbarSelectedTemplateComponent } from './toolbar-selected-template/toolbar-selected-template.component';
import { ToolbarsComponent } from './toolbars/toolbars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const TOOLBAR_IMPORTS = [
	CommonModule,
	FontAwesomeModule,
	SearchInputModule,
	BrowserAnimationsModule
];
export const TOOLBAR_DIRECTIVES = [
	ToolbarsComponent,
	ToolbarComponent,
	ToolbarTextComponent,
	ToolbarButtonComponent,
	ToolbarSelectComponent,
	ToolbarOptionComponent,
	ToolbarCellComponent,
	ToolbarSelectedTemplateComponent
];

@NgModule({
	declarations: TOOLBAR_DIRECTIVES,
	imports: TOOLBAR_IMPORTS,
	exports: TOOLBAR_DIRECTIVES
})
export class ToolbarModule {}
