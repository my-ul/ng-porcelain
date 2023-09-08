import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocsIndexComponent } from './list-docs-index/list-docs-index.component';
import { Routes, RouterModule } from '@angular/router';
import { DynamicColumnsDocsComponent } from './dynamic-columns-docs/dynamic-columns-docs.component';

// Ensure use of the "public api" file to ensure that the exports are wired up correctly.
import { ListsModule, RackModule } from '@my-ul/ng-porcelain';

export const routes: Routes = [
	{
		path: '',
		component: ListDocsIndexComponent,
		children: [{ path: 'dynamic-columns', component: DynamicColumnsDocsComponent }]
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), ListsModule, RackModule],
	declarations: [ListDocsIndexComponent, DynamicColumnsDocsComponent]
})
export class ListDocsModule {}
