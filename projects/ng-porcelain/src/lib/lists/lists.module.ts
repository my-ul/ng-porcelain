import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ListComponent } from './list/list.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListHeaderCellComponent } from './list-header-cell/list-header-cell.component';
import { ListBodyComponent } from './list-body/list-body.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemCellComponent } from './list-item-cell/list-item-cell.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { TextHeaderComponent } from './text-header/text-header.component';
import { DynamicHeaderComponent } from './dynamic-header/dynamic-header.component';

export const LISTS_IMPORTS = [CommonModule, FontAwesomeModule, DragDropModule, FormsModule];

export const LISTS_DIRECTIVES = [
	ListHeaderComponent,
	ListHeaderCellComponent,
	SortHeaderComponent,
	TextHeaderComponent,
	ListComponent,
	ListBodyComponent,
	ListItemComponent,
	ListItemCellComponent,
	DynamicHeaderComponent
];

@NgModule({
	declarations: LISTS_DIRECTIVES,
	imports: LISTS_IMPORTS,
	exports: LISTS_DIRECTIVES
})
export class ListsModule {}
