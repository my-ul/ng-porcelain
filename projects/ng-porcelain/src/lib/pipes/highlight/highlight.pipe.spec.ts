import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
	it('create an instance', () => {
		const pipe = new HighlightPipe();
		expect(pipe).toBeTruthy();
	});

	let highlightPipe = new HighlightPipe();

	it('should return highlighted HTML', () => {
		const expected = `This <mark class="highlight__query">string</mark> is highlighted.`;
		const actual = highlightPipe.transform('This string is highlighted.', 'string');
		expect(actual).toEqual(expected);
	});

	it('should highlight all instances of the search string', () => {
		const expected = `<mark class="highlight__query">highlight</mark> the <mark class="highlight__query">highlight</mark>ed text.`;
		const actual = highlightPipe.transform('highlight the highlighted text.', 'highlight');
		expect(actual).toEqual(expected);
	});

	it('should not be case sensitive', () => {
		const expected = `<mark class="highlight__query">highlight</mark> <mark class="highlight__query">hIgHlIgHt</mark> <mark class="highlight__query">HIGHLIGHT</mark>`;
		const actual = highlightPipe.transform('highlight hIgHlIgHt HIGHLIGHT', 'highlight');
		expect(actual).toEqual(expected);
	});

	it('should maintain case when highlighting the query', () => {
		const expected = `<mark class="highlight__query">Highlight</mark> must maintain case: <mark class="highlight__query">hIgHlIgHt</mark>`;
		const actual = highlightPipe.transform('Highlight must maintain case: hIgHlIgHt', 'highlight');
		expect(actual).toEqual(expected);
	});
});
