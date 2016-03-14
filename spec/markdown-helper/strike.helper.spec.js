var markdown = require('../../app/modules/markdown-html-ny/helpers/markdown');

describe('Markdown Helper Unit Testing: Strike', function() {

	it('should convert ~~text~~ strike', function() {
		expect(markdown.toHtmlStrike("I am ~~single~~.")).toEqual("I am <strike>single</strike>.");
	});

	it('should convert all ~~text~~ strike', function() {
		expect(markdown.toHtmlStrike("I am ~~single~~ oh ~~not~~.")).toEqual("I am <strike>single</strike> oh <strike>not</strike>.");
	});

	it('should convert all ~~text~~ strike on multiple lines', function() {
		expect(markdown.toHtmlStrike("I am ~~single~~ oh ~~not~~. I am ~~single~~ oh ~~not~~.")).toEqual("I am <strike>single</strike> oh <strike>not</strike>. I am <strike>single</strike> oh <strike>not</strike>.");
	});

	it('should convert all 123~~text~~456 strike on multiple lines', function() {
		expect(markdown.toHtmlStrike("345 should not be there in 12~~345~~67.")).toEqual("345 should not be there in 12<strike>345</strike>67.");
	});

	it('should convert first word of the line too ', function() {
		expect(markdown.toHtmlStrike("~~345~~ is palindrome.")).toEqual("<strike>345</strike> is palindrome.");
	});

});