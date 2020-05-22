import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'lists',
		loadChildren: './list-docs/list-docs.module#ListDocsModule'
	},
	{
		path: 'rack',
		loadChildren: './rack-docs/rack-docs.module#RackDocsModule'
	},
	{
		path: 'inputs',
		loadChildren: './inputs-docs/inputs-docs.module#InputsDocsModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
