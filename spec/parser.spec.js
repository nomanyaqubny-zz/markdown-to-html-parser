var markdown = require('../app/modules/markdown-html-ny/helpers/markdown');

var markdownText = "### Heading 3 \n It's very #easy ![Image of Git!416@#Hub Yaktocat](https://octodex.github.com/images/yaktocat.png)"
	+ " to make `var example = true` some words **bold** and \n[![Image of Git!416@#Hub Yaktocat](https://octodex.github.com/images/yaktocat.png)](https://google.com?id=123)\n"
	+ " other words *italic* with ~~Markdown~~. _You **can** combine them_. You can even [link to Google!](http://google.com)\n\n"
	+ "```\n	if (isAwesome) {\n		return true\n	} \n``` \n\n"
	+ "> Coffee. The finest organic suspension http://www.github.com/ ever devised... I beat the Borg with it > - Captain Janeway\n"
	+ "Dont include this in block quote.";

/*

Proper testing should done manually by rendering the HTML into browser

*/

describe('markdown-html-parser full markdownText to html test', function() {

	it('should get back the html', function() {

		var response;

		markdown.toHtml(markdownText, function( err, result) {
			// set result to a local variable
			response = result;
		});

		// wait for async call to be finished
		waitsFor(function() {
			return response !== undefined;
		}, 'should return a status that is not undefined', 1000);

		// run the assertion after response has been set
		runs(function() {
			expect(response).toNotBe('');
		});

	});

});