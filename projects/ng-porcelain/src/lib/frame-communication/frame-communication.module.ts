import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameGuestService } from './frame-guest/frame-guest.service';
import { FrameHostService } from './frame-host/frame-host.service';
import { WindowService } from './window/window.service';

@NgModule({
	imports: [CommonModule],
	declarations: [],
	providers: [FrameGuestService, FrameHostService, WindowService]
})
export class FrameCommunicationModule {}
