# PDF2Text

Extract text from a pdf into an array of pages / text arrays.  Useful for parsing on structured pdf text. Uses no external dependecies other than npm modules.

Modified from Brian C's [pdf-text](https://github.com/brianc/node-pdf-text) and using Mozilla's [pdf.js](http://mozilla.github.io/pdf.js/) via [pdf2json](https://github.com/modesty/pdf2json).
## install

```sh
npm install pdf-text
```

## use

```js
var pdf2Text = require('pdf2text')
var pathToPdf = __dirname + "/info.pdf"

pdf2Text(pathToPdf, function(err, pages) {
  //pages is an array of string arrays 
  //loosely corresponding to text objects within the pdf
})

//or parse a buffer of pdf data
//this is handy when you already have the pdf in memory
//and don't want to write it to a temp file
var fs = require('fs')
var buffer = fs.readFileSync(pathToPdf)
pdf2Text(buffer, function(err, pages) {

})
```

Example output of parsing a W4 form:
```
[[ 'Form W-4 (2013)',
    'Purpose. ',
    'Complete Form W-4 so that your',
    'employer can withhold the correct federal income',
    'tax from your pay. Consider completing a new',
    'Form ',
    'W-4 each year and when your personal or',
    'financial ',
    'situation changes.',
    'Exemption from withholding. ',
    'If you are',
    'exempt, ',
    'complete ',
    ' only  ',
    'lines 1, 2, 3, 4, and 7',
    'and sign the ',
    ...
  ],
  [ ... ]
]
```

## api

#### pdf2text(string pathToPdfFile, function callback(error, [string[]]))

Callback receives `[string[]]` of all the text objects within the pdf.  The array is ordered similarly to how the text appears on the page, making it possible to extract key pieces by finding them based on how they relate to other 'known' pieces of text in the page.

#### pdfText(Buffer bufferOfPdfContents, function callback(error, [string[]]))

Optionally pass a buffer of pdf data instead of a path to the file.

