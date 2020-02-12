import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
	selector: 'porcelain-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
	@Input() loadingLabel: string = 'Loading…';

	constructor(private translationService: TranslationService) {
		console.group('SpinnerComponent > constructor()');

		this.translationService.getTranslations().subscribe(
			TranslationService.translate(this, {
				label_Loading: 'loadingLabel'
			})
		);

		console.groupEnd();
	}

	ngOnInit() {}
}
