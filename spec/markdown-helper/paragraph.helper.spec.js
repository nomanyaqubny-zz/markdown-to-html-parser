var markdown = require('../../app/modules/markdown-html-ny/helpers/markdown');

describe('Markdown Helper Unit Testing: Paragraphs', function() {

	it('should convert single line paragraph', function() {
		expect(markdown.toHtmlParagraph("I am single line paragraph.")).toEqual("<p>I am single line paragraph.</p>");
	});

	it('should convert multiline paragraph', function() {
		expect(markdown.toHtmlParagraph("I am muli line paragraph. I have more than one line.")).toEqual("<p>I am muli line paragraph. I have more than one line.</p>");
	});

	it('should convert multiline paragraph with new lines', function() {
		expect(markdown.toHtmlParagraph("I am muli line paragraph.\nI have more than one line.")).toEqual("<p>I am muli line paragraph.<br>I have more than one line.</p>");
	});

	it('should convert multiline paragraph having other inline tags', function() {
		expect(markdown.toHtmlParagraph("I am ~~striked~~ line paragraph.\nI have more than `one` line.")).toEqual("<p>I am <strike>striked</strike> line paragraph.<br>I have more than <code>one</code> line.</p>");
	});

	it('should convert multiline paragraph having some more other inline tags', function() {
		expect(markdown.toHtmlParagraph("I am __bold__ line _paragraph_.\nI have [url](url.com) more than one` line.")).toEqual('<p>I am <b>bold</b> line <i>paragraph</i>.<br>I have <a href="url.com">url</a> more than one` line.</p>');
	});

});