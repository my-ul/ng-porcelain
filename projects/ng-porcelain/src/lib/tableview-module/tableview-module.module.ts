import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableviewListComponent } from './tableview-list/tableview-list.component';
import { TableviewListBodyComponent } from './tableview-list-body/tableview-list-body.component';
import { TableviewListItemComponent } from './tableview-list-item/tableview-list-item.component';
import { TableviewListItemCellComponent } from './tableview-list-item-cell/tableview-list-item-cell.component';
import { TableviewHeaderComponent } from './tableview-header/tableview-header.component';
import { TableviewHeaderItemComponent } from './tableview-header-item/tableview-header-item.component';
import { TableviewTextHeaderComponent } from './tableview-text-header/tableview-text-header.component';
import { TableviewSortHeaderComponent } from './tableview-sort-header/tableview-sort-header.component';
import { TableviewSearchHeaderComponent } from './tableview-search-header/tableview-search-header.component';
import { BackgroundColorDirective } from './color-directive/background-color.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const TABLEVIEW_IMPORTS = [CommonModule, FormsModule, FontAwesomeModule];

export const TABLEVIEW_DIRECTIVES = [
	TableviewListComponent,
	TableviewListBodyComponent,
	TableviewListItemComponent,
	TableviewListItemCellComponent,
	TableviewHeaderComponent,
	TableviewHeaderItemComponent,
	TableviewTextHeaderComponent,
	TableviewSortHeaderComponent,
	TableviewSearchHeaderComponent,
	BackgroundColorDirective
];

@NgModule({
	declarations: TABLEVIEW_DIRECTIVES,
	imports: TABLEVIEW_IMPORTS,
	exports: TABLEVIEW_DIRECTIVES
})
export class TableviewModule {}
