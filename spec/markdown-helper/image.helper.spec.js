var markdown = require('../../app/modules/markdown-html-ny/helpers/markdown');

describe('Markdown Helper Unit Testing: Image', function() {

	it('should convert to image tag with alt text and src link', function() {
		expect(markdown.toHtmlImage('![GitHub](http://github.com)')).toEqual('<img alt="GitHub" src="http://github.com">');
	});
	
	it('should convert to image tag with empty alt text and valid src link', function() {
		expect(markdown.toHtmlImage('![](http://github.com)')).toEqual('<img alt="" src="http://github.com">');
	});

	it('should convert to image tag with alt text can be any thing', function() {
		expect(markdown.toHtmlImage('![Git!416@#Hub](http://github.com)')).toEqual('<img alt="Git!416@#Hub" src="http://github.com">');
	});

	it('should not convert to image tag if src is empty', function() {
		expect(markdown.toHtmlImage('![GitHub]()')).toNotEqual('<img alt="Git!416@#Hub" src="">');
	});

	it('should not convert to image tag if src is empty keep the format', function() {
		expect(markdown.toHtmlImage('![GitHub]()')).toEqual('![GitHub]()');
	});

	it('should not convert to image tag alt text has ]', function() {
		expect(markdown.toHtmlImage('![Git]Hub](http://github.com)')).toEqual('![Git]Hub](http://github.com)');
	});

	it('should not convert to image tag src text "(" ]', function() {
		expect(markdown.toHtmlImage('![GitHub](http://gi(thub.com)')).toEqual('![GitHub](http://gi(thub.com)');
	});

	it('should convert to image tag even src text has ")" ]', function() {
		expect(markdown.toHtmlImage('![GitHub](http://gi)thub.com)')).toEqual('<img alt="GitHub" src="http://gi)thub.com">');
	});

	it('should convert to image leaving behind the anchor markdown in case link has to linked somewhere', function() {
		expect(markdown.toHtmlImage('[![GitHub](http://github.com/image/sample.png)](http://github.com)')).toEqual('[<img alt="GitHub" src="http://github.com/image/sample.png">](http://github.com)');
	});

	it('should convert to linkable image]', function() {
		expect(markdown.toHtmlImageAnchor('[![GitHub](http://github.com/image/sample.png)](http://github.com)')).toEqual('<a href="http://github.com"><img alt="GitHub" src="http://github.com/image/sample.png"></a>');
	});

});