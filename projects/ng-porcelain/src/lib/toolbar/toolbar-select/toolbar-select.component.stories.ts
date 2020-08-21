// Storybook
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { TOOLBAR_DIRECTIVES, TOOLBAR_IMPORTS, ToolbarButtonComponent } from '..';
import {
	faSearch,
	faExpandArrowsAlt,
	faCaretLeft,
	faCaretRight,
	faShare
} from '@fortawesome/free-solid-svg-icons';
export default {
	title: 'Toolbar System/Select',

	decorators: [
		moduleMetadata({
			declarations: TOOLBAR_DIRECTIVES,
			imports: TOOLBAR_IMPORTS
		})
	]
};

export const ExampleSimple = () => {
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
};

ExampleSimple.story = {
	name: 'Example: Simple Name Select'
};

export const SplitBindSelect = () => {
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

                            <porcelain-toolbar-selected-template *ngIf="currentPage !== null">
                                {{pages[currentPage].pageLabel}}
                            </porcelain-toolbar-selected-template>

                            <porcelain-toolbar-selected-template *ngIf="currentPage === null">
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
				}
			},
			pages,
			getValues(obj) {
				return Object.values(obj);
			}
		}
	};
};

SplitBindSelect.story = {
	name: 'Split-Bind Select'
};
