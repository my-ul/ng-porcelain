import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RackDocsComponent } from './rack-docs/rack-docs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RackModule } from 'projects/ng-porcelain/src/lib/rack/rack.module';

export const routes: Routes = [{ path: '', component: RackDocsComponent }];

@NgModule({
	imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule.forChild(routes), RackModule],
	declarations: [RackDocsComponent]
})
export class RackDocsModule {}
