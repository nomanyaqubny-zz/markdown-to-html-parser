"use strict";

const regexObject = {
	'headings': /^(\#{1,6}\s)([^\#\n]+)$/m,
	'codeblock': /\`{3}\n?([^`]+)\`{3}/g,
	'image': /!\[([^\]]*)\]\(([^(]+)\)/g,
	'anchor': /\[([^\]]+)\]\(([^(]+)\)/g,
	'url1': /([^"])(https?:\/\/([^\s"]+))/g,
	'url2': /^(https?:\/\/([^\s"]+))/g,
	'inlineCode': /\`([^`]+)\`/g,
	'strike': /~~([^~]+)~~/g,
	'boldWithDoubleUnderscore': /__([^_]+)__/g,
	'boldWithDoubleStar': /\*\*([^*]+)\*\*/g,
	'italicWithUnderscore': /_([^_]+)_/g,
	'italicWithStar': /\*([^*]+)\*/g,
	'quote': /^>\s/,
};

function Markdown() {};

(function() {
    this.toHtml = function(markdownText, callback) {
		makeHtml(markdownText, function(err, result) {
			callback(err, result);
		});
    },
    /*
    	Expose following methods for unit testing purpose
    	otherwise there is no need
    */
    this.toHtmlHeading = function(string, callback) {
    	return makeHeading(string);
    },
    this.toHtmlImage = function(string) {
    	return makeImageTag(string);
    },
    this.toHtmlBlockCode = function(string) {
    	return makeBlockCode(string);
    },
    this.toHtmlBlockQuote = function(string) {
    	return makeBlockQuote(string);
    },
    this.toHtmlParagraph = function(string) {
    	return makeParagraph(string);
    },
    this.toHtmlAnchor = function(string) {
    	return makeAnchorTag(string);
    },
    this.toHtmlStrike = function(string) {
    	return makeStrikeTag(string);
    },
    this.toHtmlUrl = function(string) {
    	return makeHyperLink(string);
    },
    this.toHtmlInlineCode = function(string) {
    	return makeInlineCodeTag(string);
    },
    this.toHtmlBoldWithUnderscore = function(string) {
    	return makeBoldWithDoubleUnderscoreTag(string);
    },
    this.toHtmlBoldWithStar = function(string) {
    	return makeBoldWithDoubleStarTag(string);
    },
    this.toHtmlItalicWithStar = function(string) {
    	return makeItalicWithStarTag(string);
    },
    this.toHtmlItalicWithUnderscore = function(string) {
    	return makeItalicWithUnderscoreTag(string);
    },
    this.toHtmlImageAnchor = function(string) {
    	return makeAnchorTag(makeImageTag(string));
    },
    this.toHtmlItalicBold = function(string) {
		string = makeBoldWithDoubleUnderscoreTag(string);
		string = makeBoldWithDoubleStarTag(string);
		string = makeItalicWithUnderscoreTag(string);
		string = makeItalicWithStarTag(string);
    	return string;
    }
}).call(Markdown.prototype);

var markdown = new Markdown();
module.exports = markdown;

/*
	Helping function
	Should have moved to another file
*/
function makeHtml(markdownText, callback) {
	var html = '';

	function filter() {
		markdownText = markdownText.replace(/\r|\s+$/g, '').replace(/\t/g, '    ');
	}

	function convert() {
		// as per requriement: markdown tags should be separated by atleast two newlines
		markdownText.split(/\n\n+/).forEach(function(element, index, array) {
			/*
				TODO: write more ifs to convert list and table 
			*/
  			if (regexObject.headings.test(element)) {
	      		html += makeHeading(element);
  			} else if (regexObject.codeblock.test(element)) {
				html += makeBlockCode(element);
  			} else if (regexObject.quote.test(element)) {
  				html += makeBlockQuote(element);
  			} else { //convert rest into paragraphs
  				html += makeParagraph(element);
  			}
		});
	}
	filter();
	convert();
	callback(false, html);
}

/*
	catch the string starting with 1-6 numbders of # followed by a space
	chunk it
	and calculate the number of #
	make heading tag accordingly
*/
function makeHeading(string) {
	var headingChunks = regexObject.headings.exec(string);
	if(headingChunks !== null) {
		string = '<h' + (headingChunks[1].length-1) + '>' + headingChunks[2] + '</h' + (headingChunks[1].length-1) + '>';
	}
	return convertInlineTags(string);
}
/*
	make paragraphs and convert all inline tags first
*/
function makeParagraph(string) {
	//parse all  inline tags
	string = convertInlineTags(string);
	// only replace new lines with br if lines does not start with tag
	// could have been better
	// lets work more on it at the end
	if (/^[^<]/g.test(string)) {
		string = string.replace(/\n/g, '<br>')
	}
	return '<p>' + string + '</p>';
}
/*
	code block style
	there should not be empty line between statements
	damnit regex needs to be improved - it should read /n

	anything like below works
	```
	var i = 1;
	console.log(i);
	```
*/
function makeBlockCode(string) {
	function replacerBlockCode(match, p1, offset, string) {
  		return '<pre><code><br>' + p1.replace(/\n/g, '<br>') + '<br></code></pre>';
	}
	return string.replace(regexObject.codeblock, replacerBlockCode);
}
/*
	if string starts with '> ' put all the leading text until end into a block quote
*/
function makeBlockQuote(string) {
	if (string.substring(2)) {
		string = '<blockquote>' + string.substring(2).replace(/>\s/,"") + '</blockquote>';
	}
	return string;
}
/*	
	To make hyperlink image
	use both: 
	1. makeImageTag
	2. makeAnchorTag

	parse image tag first because image may be a clickable link itself
	[![GitHub](http://example.com/images/123.png)](https://google.com?id=123)

	convert all images

	true: ![GitHub](http://github.com)
	true: ![](http://github.com)
	true: ![Git!416@#Hub](http://github.com)
	false: ![GitHub]()
	false: ![Git]Hub](http://github.com)
	false: ![GitHub](http://gi(thub.com)
	invalid: ![Git[Hub](http://github.com)
	invalid: ![Git[Hub](http://git[hub.com)
	invalid: ![Git[Hub](http://git]hub.com)
	invalid: ![Git[Hub](http://git)hub.com)
*/
function makeImageTag(string) {
	return string.replace(regexObject.image, '<img alt="$1" src="$2">');
}
/*
	convert: 
	1.	links
	2.	email

	true: [GitHub](http://github.com)
	true: [Git!416@#Hub](http://github.com)
	true: [Git!416@#Hub](http://github.com%&#@@!)
	false: [](http://github.com)
	false: []()
	false: [GitHub]()
	false: [Git]Hub](http://github.com)
	false: [GitHub](http://gi(thub.com)
	false: [Git]Hub](http://gith(ub.com)
	invalid: [Git[Hub](http://github.com)
	invalid: [Git![Hub](http://github.com)
	invalid: [GitHub](http://git)hub.com)
	invalid: [Git![Hub](http://git)hub.com)
	invalid: [Git![Hub](http://git)hub.com)
*/
function makeAnchorTag(string) {
	return string.replace(regexObject.anchor, '$1'.link('$2'));
}
/*
	Automatic linking for URLs
	Any URL (like http://www.github.com/) will be automatically converted into a clickable link.
*/
function makeHyperLink(string) {
	return string.replace(regexObject.url1, '$1'+'$3'.link('$1$2'))
	.replace(regexObject.url2, '$2'.link('$1'));
}
/*
	inline code style
	anything like `var i = 1;`
*/
function makeInlineCodeTag(string) {
	return string.replace(regexObject.inlineCode, '<code>$1</code>');
}
/*
	Any word wrapped with two tildes (like ~~this~~) will appear crossed out
*/
function makeStrikeTag(string) {
	return string.replace(regexObject.strike, '<strike>$1</strike>');
}
/*
	any text wrapped around by double underscore is converted into bold
*/
function makeBoldWithDoubleUnderscoreTag(string) {
	return string.replace(regexObject.boldWithDoubleUnderscore, '<b>$1</b>');
}
/*
	any text wrapped around by double star is converted into bold
*/
function makeBoldWithDoubleStarTag(string) {
	return string.replace(regexObject.boldWithDoubleStar, '<b>$1</b>');
}
/*
	any text wrapped around by single underscore is converted into italic
*/
function makeItalicWithUnderscoreTag(string) {
	return string.replace(regexObject.italicWithUnderscore, '<i>$1</i>');
}
/*
	any text wrapped around by single * is converted into italic
*/
function makeItalicWithStarTag(string) {
	return string.replace(regexObject.italicWithStar, '<i>$1</i>');
}
/*
	convert inline tags all at once
	caution: order is important
*/
function convertInlineTags(string) {
	string = makeImageTag(string);
	string = makeAnchorTag(string);
	string = makeHyperLink(string);
	string = makeInlineCodeTag(string);
	string = makeStrikeTag(string);
	string = makeBoldWithDoubleUnderscoreTag(string);
	string = makeBoldWithDoubleStarTag(string);
	string = makeItalicWithUnderscoreTag(string);
	string = makeItalicWithStarTag(string);
	return string;
}
