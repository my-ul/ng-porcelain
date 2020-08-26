import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'lists',
		loadChildren: () => import('./list-docs/list-docs.module').then(m => m.ListDocsModule)
	},
	{
		path: 'rack',
		loadChildren: () => import('./rack-docs/rack-docs.module').then(m => m.RackDocsModule)
	},
	{
		path: 'inputs',
		loadChildren: () => import('./inputs-docs/inputs-docs.module').then(m => m.InputsDocsModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
