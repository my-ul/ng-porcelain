import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagingComponent } from './staging/staging.component';
import { ListsComponent } from './lists/lists.component';
import { DemosComponent } from './demos/demos.component';
import { HomeComponent } from './home/home.component';

import { ApplicatorModule } from '../../projects/ng-porcelain/src/lib/applicator/applicator.module';
import { ListsModule } from '../../projects/ng-porcelain/src/lib/lists/lists.module';
import { PipesModule } from '../../projects/ng-porcelain/src/lib/pipes/pipes.module';
import { SearchInputModule } from '../../projects/ng-porcelain/src/public_api';

@NgModule({
	declarations: [AppComponent, StagingComponent, ListsComponent, DemosComponent, HomeComponent],
	imports: [
		FormsModule,
		SearchInputModule,
		BrowserModule,
		AppRoutingModule,
		ApplicatorModule,
		ListsModule,
		PipesModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
