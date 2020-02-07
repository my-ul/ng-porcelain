import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListHeaderCellComponent } from './list-header-cell/list-header-cell.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemCellComponent } from './list-item-cell/list-item-cell.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListBodyComponent } from './list-body/list-body.component';
import { SearchInputModule } from '../search-input/search-input.module';

export const LISTS_IMPORTS = [CommonModule, FontAwesomeModule, SearchInputModule];

export const LISTS_DIRECTIVES = [
	ListHeaderComponent,
	ListHeaderCellComponent,
	SortHeaderComponent,
	ListComponent,
	ListBodyComponent,
	ListItemComponent,
	ListItemCellComponent
];

@NgModule({
	imports: LISTS_IMPORTS,
	declarations: LISTS_DIRECTIVES,
	exports: LISTS_DIRECTIVES
})
export class ListsModule {}
