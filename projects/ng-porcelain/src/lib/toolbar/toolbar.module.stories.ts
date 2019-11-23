// Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import { storiesOf, moduleMetadata } from '@storybook/angular';

// Third Party
import {
	faShare,
	faArrowRight,
	faArrowLeft,
	faCaretLeft,
	faCaretRight,
	faSave
} from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

// Porcelain
import { TOOLBAR_DIRECTIVES, TOOLBAR_IMPORTS } from '.';

storiesOf('Toolbars', module)
	.addDecorator(withKnobs)
	.addDecorator(
		moduleMetadata({
			declarations: TOOLBAR_DIRECTIVES,
			imports: TOOLBAR_IMPORTS
		})
	)
	.add('Toolbar/Default Presentation', () => {
		return {
			template: `
			<porcelain-toolbar>
				<porcelain-toolbar-cell [flex]="'0 0 20%'">
					<porcelain-toolbar-button
						(onClick)="prevHandler()"
						[icon]="prevIcon"
						[isBlock]="true"
					>
						Previous
					</porcelain-toolbar-button>
				</porcelain-toolbar-cell>

				<porcelain-toolbar-cell [flex]="-1">
					<porcelain-toolbar-text [textCenter]="true">Page 1 of 20</porcelain-toolbar-text>
				</porcelain-toolbar-cell>

				<porcelain-toolbar-cell [flex]="'0 0 20%'">
					<porcelain-toolbar-button (onClick)="nextHandler()" [icon]="nextIcon" [isBlock]="true">Next</porcelain-toolbar-button>
				</porcelain-toolbar-cell>
			</porcelain-toolbar>`,
			props: {
				prevHandler: action('Previous Clicked'),
				nextHandler: action('Next Clicked'),
				prevIcon: faArrowLeft,
				nextIcon: faArrowRight
			}
		};
	})
	.add('Toolbar/Right-Aligned', () => {
		return {
			template: `
			<porcelain-toolbar [alignRight]="true">
				<porcelain-toolbar-cell [flex]="0">
					<porcelain-toolbar-button [icon]="icon">
						Share
					</porcelain-toolbar-button>
				</porcelain-toolbar-cell>

				<porcelain-toolbar-cell [flex]="0">
					<porcelain-toolbar-text>1,024 Results</porcelain-toolbar-text>
				</porcelain-toolbar-cell>
			</porcelain-toolbar>
			`,
			props: {
				icon: faCopy
			}
		};
	})
	.add('Buttons / Icon and Label', () => {
		return {
			template: `
			<porcelain-toolbar-button [icon]="icon">Text</porcelain-toolbar-button>
			`,
			props: {
				icon: faShare,
				label: 'Share'
			}
		};
	})
	.add('Buttons / Icon with Screen-Reader-Only Text', () => {
		return {
			template: `
			<porcelain-toolbar-button [icon]="icon" [isLabelSrOnly]="true" (onClick)="onClick()">Text</porcelain-toolbar-button>
			`,
			props: {
				icon: faShare,
				label: 'Share',
				onClick: action('Button Clicked')
			}
		};
	})
	.add('Dropdown Select', () => {
		return {
			template: `
				<porcelain-toolbar>
					<porcelain-toolbar-cell [flex]="'0 0 40%'">
						<porcelain-toolbar-text [textRight]="true">
							<strong>Selected:</strong> {{value}}
						</porcelain-toolbar-text>
					</porcelain-toolbar-cell>

					<porcelain-toolbar-cell [flex]="-1">
						<porcelain-toolbar-select [label]="label" [(value)]="value" [fullWidth]="true">
							<porcelain-toolbar-selected-template *ngIf="value">
								{{options[value].name}}
							</porcelain-toolbar-selected-template>
							<porcelain-toolbar-selected-template *ngIf="!value">
								&mdash;
							</porcelain-toolbar-selected-template>
							<porcelain-toolbar-option [value]="option.value" *ngFor="let option of getValues(options)">
								<strong>{{option.name}}</strong>&nbsp;&nbsp;<span style="font-size: 90%; color: #888">{{option.group}}</span><br>
								{{option.value}}@ul.com
							</porcelain-toolbar-option>
						</porcelain-toolbar-select>
					</porcelain-toolbar-cell>

					<porcelain-toolbar-cell [flex]="'0 0 40%'">
						<porcelain-toolbar-text>
							something else
						</porcelain-toolbar-text>
					</porcelain-toolbar-cell>
				</porcelain-toolbar>
			`,
			props: {
				label: 'To:',
				value: null,
				getValues(dict) {
					return Object.values(dict);
				},
				options: {
					'keith.carmody': {
						value: 'keith.carmody',
						name: 'Keith Carmody',
						group: 'Northbrook, IL'
					},
					'brad.kovach': { value: 'brad.kovach', name: 'Brad Kovach', group: 'Laramie, WY' },
					'arjun.rapaka': { value: 'arjun.rapaka', name: 'Arjun Rapaka', group: 'Canada' },
					'matt.gardner': {
						value: 'matt.gardner',
						name: 'Matt Gardner',
						group: 'Laramie, WY'
					},
					'richard.heinig': {
						value: 'richard.heinig',
						name: 'Richard Heinig',
						group: 'Laramie, WY'
					}
				},
				onSelectedValueChange: action('new option selected')
			}
		};
	})
	.add('Full Example', () => {
		const pages = Array.from(Array(100).keys())
			.map(pageIdx => {
				return {
					value: pageIdx,
					pageLabel: (pageIdx + 1).toLocaleString()
				};
			})
			.reduce((obj, pag) => {
				obj[pag.value] = pag;
				return obj;
			}, {});

		return {
			template: `
				<porcelain-toolbars style="border: solid 1px #ddd">

					<porcelain-toolbar [alignRight]="true">
						<porcelain-toolbar-cell [flex]="'0 0 auto'">
							<porcelain-toolbar-button [icon]="copyLinkIcon" (onClick)="copy()">
								Copy Link
							</porcelain-toolbar-button>
						</porcelain-toolbar-cell>

						<porcelain-toolbar-cell [flex]="'0 0 auto'">
							<porcelain-toolbar-button [icon]="saveSearchIcon" (onClick)="save()">
								Save Search
							</porcelain-toolbar-button>
						</porcelain-toolbar-cell>
					</porcelain-toolbar>

					<porcelain-toolbar>
						<porcelain-toolbar-cell [flex]="'0 0 20%'">
							<porcelain-search-input
								[borders]="false"
								(submitHandler)="searchSubmitted($event)"
								(emptyHandler)="searchCleared()"></porcelain-search-input>
						</porcelain-toolbar-cell>

						<porcelain-toolbar-cell [flex]="'1 1 auto'">
							<porcelain-toolbar-select 
								[label]="sortLabel()"  
								[(value)]="sortValue" 
								[fullWidth]="true"
								[disabled]="!isSortEnabled">
								<porcelain-toolbar-selected-template *ngIf="sortValue">
									{{sorts[sortValue].fieldLabel}} : {{sorts[sortValue].fieldDirection}}
								</porcelain-toolbar-selected-template>

								<porcelain-toolbar-selected-template *ngIf="!sortValue">
									&mdash;
								</porcelain-toolbar-selected-template>

								<porcelain-toolbar-option [value]="option.value" *ngFor="let option of getValues(sorts)">
									<strong>{{option.fieldLabel}}</strong> : {{option.fieldDirection}}
								</porcelain-toolbar-option>
							</porcelain-toolbar-select>
						</porcelain-toolbar-cell>

						<porcelain-toolbar-cell [flex]="'0 0 10%'">
							<porcelain-toolbar-text [textRight]="true" [noWrap]="true">
								2,048 Results
							</porcelain-toolbar-text>
						</porcelain-toolbar-cell>

						<porcelain-toolbar-cell>
							<porcelain-toolbar-select [(value)]="currentPage" [label]="pageLabel">
								<porcelain-toolbar-selected-template *ngIf="currentPage != null">
									{{pages[currentPage].pageLabel}}
								</porcelain-toolbar-selected-template>

								<porcelain-toolbar-selected-template *ngIf="currentPage == null">
									&mdash;
								</porcelain-toolbar-selected-template>

								<porcelain-toolbar-option [value]="option.value" *ngFor="let option of getValues(pages)">
										{{option.pageLabel}}
								</porcelain-toolbar-option>
							</porcelain-toolbar-select>
						</porcelain-toolbar-cell>

						<porcelain-toolbar-cell>
							<porcelain-toolbar-button 
								[icon]="caretLeft" 
								(onClick)="prevClicked()" 
								[isLabelSrOnly]="true"
								[disabled]=" currentPage === 0 ">
								Previous Page
							</porcelain-toolbar-button>
						</porcelain-toolbar-cell>

						<porcelain-toolbar-cell>
							<porcelain-toolbar-button 
								[icon]="caretRight" 
								(onClick)="nextClicked()" 
								[isLabelSrOnly]="true"
								[disabled]=" currentPage === 99 ">
								Next Page
							</porcelain-toolbar-button>
						</porcelain-toolbar-cell>
					</porcelain-toolbar>
				</porcelain-toolbars>
			`,
			props: {
				caretLeft: faCaretLeft,
				caretRight: faCaretRight,
				saveSearchIcon: faSave,
				copyLinkIcon: faCopy,

				save: action('Save Search Clicked'),
				copy: action('Copy Link Clicked'),
				searchSubmitted: action('Search Submitted'),
				searchCleared: action('Search Cleared'),
				getValues(obj) {
					return Object.values(obj);
				},
				isSortEnabled: boolean('Enable Sort', true),
				sortLabel: function() {
					if (this.isSortEnabled) {
						return 'Sort:';
					}
					return 'Sort (disabled):';
				},
				sortValue: 'dateAsc',
				sorts: {
					dateAsc: {
						value: 'dateAsc',
						fieldLabel: 'Date',
						fieldDirection: 'Oldest First'
					},
					dateDesc: {
						value: 'dateDesc',
						fieldLabel: 'Date',
						fieldDirection: 'Newest First'
					},
					titleAsc: {
						value: 'titleAsc',
						fieldLabel: 'Title',
						fieldDirection: 'A-Z'
					},
					titleDesc: {
						value: 'titleDesc',
						fieldLabel: 'Title',
						fieldDirection: 'Z-A'
					},
					statusAsc: {
						value: 'statusAsc',
						fieldLabel: 'Status',
						fieldDirection: 'A-Z'
					},
					statusDesc: {
						value: 'statusDesc',
						fieldLabel: 'Status',
						fieldDirection: 'Z-A'
					}
				},

				currentPage: 0,
				prevClicked: function() {
					this.currentPage = Math.max(0, this.currentPage - 1);
				},
				nextClicked: function() {
					this.currentPage = Math.min(Object.keys(pages).length - 1, this.currentPage + 1);
				},
				pageLabel: 'Page:',
				pages
			}
		};
	})
	.add('Split-Bind Select', () => {
		const pages = Array.from(Array(100).keys())
			.map(pageIdx => {
				return {
					value: pageIdx,
					pageLabel: (pageIdx + 1).toLocaleString()
				};
			})
			.reduce((obj, pag) => {
				obj[pag.value] = pag;
				return obj;
			}, {});

		const pageValueChanged = action('Page Value Changed');
		return {
			template: `
				<porcelain-toolbar>
					<porcelain-toolbar-cell>
						<porcelain-toolbar-select 
							[value]="currentPage" 
							(valueChange)="onValueChange($event)" 
							[label]="pageLabel">

							<porcelain-toolbar-selected-template *ngIf="currentPage != null">
								{{pages[currentPage].pageLabel}}
							</porcelain-toolbar-selected-template>

							<porcelain-toolbar-selected-template *ngIf="currentPage == null">
								&mdash;
							</porcelain-toolbar-selected-template>

							<porcelain-toolbar-option [value]="option.value" *ngFor="let option of getValues(pages)">
									{{option.pageLabel}}
							</porcelain-toolbar-option>

						</porcelain-toolbar-select>
					</porcelain-toolbar-cell>
				</porcelain-toolbar>
			`,
			props: {
				currentPage: 0,
				pageLabel: 'Page:',
				onValueChange: function(currentPage) {
					if (this.currentPage !== currentPage) {
						this.currentPage = currentPage;
						console.log('page value changed', { currentPage });
					}
				},
				pages,
				getValues(obj) {
					return Object.values(obj);
				}
			}
		};
	});
