import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PipesModule } from '../../projects/ng-porcelain/src/lib/pipes/pipes.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, PipesModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
