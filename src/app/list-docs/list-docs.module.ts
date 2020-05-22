import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDocsIndexComponent } from './list-docs-index/list-docs-index.component';
import { Routes, RouterModule } from '@angular/router';
import { DynamicColumnsDocsComponent } from './dynamic-columns-docs/dynamic-columns-docs.component';
import { ListsModule } from '../../../projects/ng-porcelain/src/lib/lists/lists.module';
import { RackModule } from '../../../projects/ng-porcelain/src/lib/rack/rack.module';

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
