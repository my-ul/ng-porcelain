import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipPopupComponent } from './tooltip-popup/tooltip-popup.component';
import { TooltipHeadComponent } from './tooltip-head/tooltip-head.component';
import { TooltipContentComponent } from './tooltip-content/tooltip-content.component';
import { TooltipMsgComponent } from './tooltip-msg/tooltip-msg.component';

export const TOOLTIPPOPUP_DIRECTIVES = [
	TooltipPopupComponent,
	TooltipHeadComponent,
	TooltipContentComponent,
	TooltipMsgComponent
];
export const TOOLTIPPOPUP_IMPORTS = [CommonModule];

@NgModule({
	declarations: TOOLTIPPOPUP_DIRECTIVES,
	imports: TOOLTIPPOPUP_IMPORTS,
	exports: TOOLTIPPOPUP_DIRECTIVES
})
export class TooltipPopupModule {}
