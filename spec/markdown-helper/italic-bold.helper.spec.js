var markdown = require('../../app/modules/markdown-html-ny/helpers/markdown');

describe('Markdown Helper Unit Testing: Italic Bold', function() {

	it('should convert the _text_ to Italic', function() {
		expect(markdown.toHtmlItalicWithUnderscore("I am _single_ line paragraph.")).toEqual("I am <i>single</i> line paragraph.");
	});

	it('should convert the *text* to Italic too', function() {
		expect(markdown.toHtmlItalicWithStar("I am *single* line paragraph.")).toEqual("I am <i>single</i> line paragraph.");
	});

	it('should convert the __text__ to bold', function() {
		expect(markdown.toHtmlBoldWithUnderscore("I am __single__ line paragraph.")).toEqual("I am <b>single</b> line paragraph.");
	});

	it('should convert the **text** to bold too', function() {
		expect(markdown.toHtmlBoldWithStar("I am **single** line paragraph.")).toEqual("I am <b>single</b> line paragraph.");
	});

	it('should convert the *text* and _text_ to Italic using both tags at a time', function() {
		expect(markdown.toHtmlItalicBold("I am *single* line _paragraph_.")).toEqual("I am <i>single</i> line <i>paragraph</i>.");
	});

	it('should convert the **text** and __text__ to bold using both tags at a time', function() {
		expect(markdown.toHtmlItalicBold("I am **single** line __paragraph__.")).toEqual("I am <b>single</b> line <b>paragraph</b>.");
	});

	it('should convert the *text* and __text__ to italic and bold resp', function() {
		expect(markdown.toHtmlItalicBold("I am *single* line __paragraph__.")).toEqual("I am <i>single</i> line <b>paragraph</b>.");
	});

	it('should convert the **text** and _text_ to bold and italic resp', function() {
		expect(markdown.toHtmlItalicBold("I am **single** line _paragraph_.")).toEqual("I am <b>single</b> line <i>paragraph</i>.");
	});

	it('should convert the composed text', function() {
		expect(markdown.toHtmlItalicBold("**I am _single_ line paragraph**")).toEqual("<b>I am <i>single</i> line paragraph</b>");
	});

	it('should convert the composed text other way too', function() {
		expect(markdown.toHtmlItalicBold("__I am *single* line paragraph__")).toEqual("<b>I am <i>single</i> line paragraph</b>");
	});

	it('should not convert the disturb the text if __ comes without any purpose', function() {
		expect(markdown.toHtmlItalicBold("__I am *single* line paragraph")).toEqual("__I am <i>single</i> line paragraph");
	});

	it('should not work if double and single operator of same kind used ** and *', function() {
		expect(markdown.toHtmlItalicBold("**I am *single* line paragraph**")).toNotEqual("<b>I am <i>single</i> line paragraph</b>");
	});

	it('should not work if double and single operator of same kind used __ and _', function() {
		expect(markdown.toHtmlItalicBold("__I am _single_ line paragraph__")).toNotEqual("<b>I am <i>single</i> line paragraph</b>");
	});

});