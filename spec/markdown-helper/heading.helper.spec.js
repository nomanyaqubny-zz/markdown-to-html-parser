var markdown = require('../../app/modules/markdown-html-ny/helpers/markdown');

describe('Markdown Helper Unit Testing: Headings', function() {

	it('should convert to Heading 1', function() {
		expect(markdown.toHtmlHeading("# I am Heading 1")).toEqual("<h1>I am Heading 1</h1>");
	});

	it('should convert to Heading 2', function() {
		expect(markdown.toHtmlHeading("## I am Heading 2")).toEqual("<h2>I am Heading 2</h2>");
	});

	it('should convert to Heading 3', function() {
		expect(markdown.toHtmlHeading("### I am Heading 3")).toEqual("<h3>I am Heading 3</h3>");
	});

	it('should convert to Heading 4', function() {
		expect(markdown.toHtmlHeading("#### I am Heading 4")).toEqual("<h4>I am Heading 4</h4>");
	});

	it('should convert to Heading 5', function() {
		expect(markdown.toHtmlHeading("##### I am Heading 5")).toEqual("<h5>I am Heading 5</h5>");
	});

	it('should convert to Heading 6', function() {
		expect(markdown.toHtmlHeading("###### I am Heading 6")).toEqual("<h6>I am Heading 6</h6>");
	});

	it('should not convert to Heading 7', function() {
		expect(markdown.toHtmlHeading("####### I am Heading 7")).not.toEqual("<h7>I am Heading 7</h7>");
	});

	it('should not convert to Heading if there is no # in front', function() {
		expect(markdown.toHtmlHeading("I am some Heading")).toEqual("I am some Heading");
	});

	it('should not convert to Heading if there is no space after #', function() {
		expect(markdown.toHtmlHeading("#I am some Heading")).toEqual("#I am some Heading");
	});

	it('should not convert to Heading if string is empty', function() {
		expect(markdown.toHtmlHeading("")).toEqual("");
	});

	it('should not convert to Heading if followed by some string', function() {
		expect(markdown.toHtmlHeading("abc # Heading 1")).toNotEqual("abc <h1>Heading 1</h1>");
	});

	it('should convert to Heading if there is new line', function() {
		expect(markdown.toHtmlHeading("\n# Heading 1")).toEqual("<h1>Heading 1</h1>");
	});

	it('should not convert to Heading if preceded by a \s or anyother special character other than \n', function() {
		expect(markdown.toHtmlHeading("\s# Heading 1")).toNotEqual("<h1>Heading 1</h1>");
	});

	it('should convert to Heading if there are inline tags present', function() {
		expect(markdown.toHtmlHeading("# _Heading_ 1 is *italic*")).toEqual("<h1><i>Heading</i> 1 is <i>italic</i></h1>");
	});

	it('should convert to Heading if there are inline tags present even make it anchor', function() {
		expect(markdown.toHtmlHeading("# [_Heading_ 1 is *italic*](http://github.com)")).toEqual('<h1><a href="http://github.com"><i>Heading</i> 1 is <i>italic</i></a></h1>');
	});

});