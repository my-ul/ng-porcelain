import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonDocsComponent } from './skeleton-docs/skeleton-docs.component';
import { SkeletonDocsIndexComponent } from './skeleton-docs-index/skeleton-docs-index.component';
import { SkeletonWordDocsComponent } from './skeleton-word-docs/skeleton-word-docs.component';
import { Routes, RouterModule } from '@angular/router';

import { SkeletonsModule } from '@my-ul/ng-porcelain';

export const routes: Routes = [
	{
		path: '',
		component: SkeletonDocsIndexComponent,
		children: [
			{
				path: 'word',
				component: SkeletonWordDocsComponent
			}
		]
	}
];

@NgModule({
	declarations: [SkeletonDocsComponent, SkeletonDocsIndexComponent, SkeletonWordDocsComponent],
	imports: [RouterModule.forChild(routes), CommonModule, SkeletonsModule]
})
export class SkeletonDocsModule {}
