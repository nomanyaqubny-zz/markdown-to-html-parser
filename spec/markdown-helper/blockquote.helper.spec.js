var markdown = require('../../app/modules/markdown-html-ny/helpers/markdown');

describe('Markdown Helper Unit Testing: BlockQuote', function() {

	it('should convert to blockquote', function() {
		expect(markdown.toHtmlBlockQuote('> string')).toContain('<blockquote>string</blockquote>');
	});

	it('should convert to blockquote if it is multiline', function() {
		expect(markdown.toHtmlBlockQuote('> string\n lala nanan. 11111\n - Author')).toEqual('<blockquote>string\n lala nanan. 11111\n - Author</blockquote>');
	});

	it('should not convert to blockquote if text is empty', function() {
		expect(markdown.toHtmlBlockQuote('> ')).toEqual('> ');
	});

	it('should not convert to blockquote if > is not followed by a space', function() {
		expect(markdown.toHtmlBlockQuote('>A')).toEqual('>A');
	});

});