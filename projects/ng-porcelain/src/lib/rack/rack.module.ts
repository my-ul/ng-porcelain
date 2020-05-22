import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RackComponent } from './rack/rack.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

export const RACK_IMPORTS = [CommonModule, FontAwesomeModule, FormsModule];
export const RACK_DIRECTIVES = [RackComponent];

@NgModule({
	imports: RACK_IMPORTS,
	declarations: RACK_DIRECTIVES,
	exports: RACK_DIRECTIVES
})
export class RackModule {}
