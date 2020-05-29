import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PipesModule, LegacySearchInputModule } from '../../projects/ng-porcelain/src/public_api';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, PipesModule, LegacySearchInputModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
