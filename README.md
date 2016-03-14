# markdown-to-html-parser

The app is built in an attempt to learn [Hapi.js](http://hapijs.com) framework for node.js application.

The technology stack used is: 

1. **Nodejs**
2. **Hapijs**
3. **Mongodb**
4. **Jasmine**

Fork the code, install the application by running `npm install`, run the mogodb service `./mongod` and then launch the `npm start` and open localhost:8000 in your browser.


The application expose following APIs

1. {base_url}/markdown/save (receive in params markdown text, process it (transform to html), save to MongoDB and return ID of created record in MongoDB and created HTML.)
2. {base_url}/markdown/get/\[:id\] (receive one param ID and returns from MongoDB record with markdown and generated HTML associated with this record)
3. {base_url}/markdown (return list of all documents including id, markdown and html)


The following markdown tags are handled.

1. Inline tags
  - Image ( example: !\[Alt text here\]\(image URL here\) )
  - Linkable image ( example: \[!\[Alt text here\]\(image URL here\)\]\(Anchor href here\) )
  - Links ( example: \[text to show here\]\(achor href here\) )
  - Urls (example: https://github.com )
  - Email ( example: \[text to show here\]\(mailto: emailaddress here\) )
  - Italic ( example: \_some text\_ )
  - Italic ( example: \*some text\* )
  - Bold ( example: \_\_some text\_\_ )
  - Bold ( example: \*\*some text\*\* )
  - Emphasize ( example: \*some text to emphasize here\* )
  - Strong ( example: \*\*some text to strong here\*\* )
  - Strike ( example: \~\~some text to emphasize here\~\~ )
  - Code ( example: \`var i = 0;\` )
  - Combination of italic and bold is possible ( example: \_You \*\*can\*\* combine them\_ or \_\_You \*can\* combine them\_\_)
2. Headings
  - Heading 1 (# Heading 1)
  - Heading 2 (## Heading 2)
  - Heading 3 (### Heading 3)
  - Heading 4 (#### Heading 4)
  - Heading 5 (##### Heading 5)
  - Heading 6 (###### Heading 6)
3. Code blocks
  
  Use triple back ticks
  ```
  Code line 1;
  Code line 2;
  ```
4. Paragraphs
5. Quote
  You can quote text with a `>`
  
  \> Pardon my French
  > Pardon my French

  HTML Output: \<blockquote\>Pardon my French\</blockquote\>
