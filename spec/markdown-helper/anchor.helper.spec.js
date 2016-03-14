var markdown = require('../../app/modules/markdown-html-ny/helpers/markdown');

describe('Markdown Helper Unit Testing: Anchor', function() {

	it('should convert to tag tag with href and text', function() {
		expect(markdown.toHtmlAnchor('[GitHub](http://github.com)')).toEqual('<a href="http://github.com">GitHub</a>');
	});

	it('should not convert to anchor tag if text is empty', function() {
		expect(markdown.toHtmlAnchor('[](http://github.com)')).toEqual('[](http://github.com)');
	});

	it('should not convert to anchor tag if link is empty', function() {
		expect(markdown.toHtmlAnchor('[Github]()')).toEqual('[Github]()');
	});

	it('should convert to anchor tag if text is any thing', function() {
		expect(markdown.toHtmlAnchor('[Git!!$&87hub](http://github.com)')).toEqual('<a href="http://github.com">Git!!$&87hub</a>');
	});

	it('should not convert to anchor tag if text has "]"', function() {
		expect(markdown.toHtmlAnchor('[Git]hub](http://github.com)')).toEqual('[Git]hub](http://github.com)');
	});

	it('should convert to anchor tag even if text has "["', function() {
		expect(markdown.toHtmlAnchor('[Git[hub](http://github.com)')).toEqual('<a href="http://github.com">Git[hub</a>');
	});

	it('should convert to anchor tag if link has "]"', function() {
		expect(markdown.toHtmlAnchor('[Github](http://git]hub.com)')).toEqual('<a href="http://git]hub.com">Github</a>');
	});

	it('should convert to anchor tag even if text has "["', function() {
		expect(markdown.toHtmlAnchor('[Github](http://git[hub.com)')).toEqual('<a href="http://git[hub.com">Github</a>');
	});

	it('should not convert to anchor tag if link has "("', function() {
		expect(markdown.toHtmlAnchor('[Github](http://git(hub.com)')).toEqual('[Github](http://git(hub.com)');
	});

	it('should convert to anchor tag even if text has ")"', function() {
		expect(markdown.toHtmlAnchor('[Github](http://git)hub.com)')).toEqual('<a href="http://git)hub.com">Github</a>');
	});
	
});