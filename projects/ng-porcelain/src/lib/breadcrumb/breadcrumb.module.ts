import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';

export const BREADCRUMB_DIRECTIVES = [BreadcrumbsComponent, BreadcrumbItemComponent];
export const BREADCRUMB_IMPORTS = [CommonModule];

@NgModule({
	declarations: BREADCRUMB_DIRECTIVES,
	imports: BREADCRUMB_IMPORTS,
	exports: BREADCRUMB_DIRECTIVES
})
export class BreadcrumbModule {}
