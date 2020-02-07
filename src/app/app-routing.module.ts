import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { StagingComponent } from './staging/staging.component';
import { DemosComponent } from './demos/demos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{
		path: 'demos',
		component: DemosComponent,
		children: []
	},
	{
		path: 'lists',
		component: ListsComponent,
		children: []
	},
	{
		path: 'staging',
		component: StagingComponent,
		children: []
	},
	{
		path: 'home',
		component: HomeComponent,
		children: []
	},
	{
		path: '',
		redirectTo: '/demos',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
