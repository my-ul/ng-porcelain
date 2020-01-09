import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicatorModule } from '../../projects/ng-porcelain/src/lib/applicator/applicator.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, ApplicatorModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
