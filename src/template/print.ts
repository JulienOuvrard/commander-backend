import * as pdf from 'html-pdf';
import * as path from 'path';
import * as fs from 'fs';
var templateName = 'print.template.html';
var template = path.join(__dirname, templateName)
var filename = path.join(__dirname, '../recepit', templateName.replace('.html', '.pdf'))
var templateHtml = fs.readFileSync(template, 'utf8')

// var image = path.join('file://', __dirname, 'image.png')
// templateHtml = templateHtml.replace('{{image}}', image)

var options = {
    width: '80mm',
    height: '100mm'
}

pdf
    .create(templateHtml, options)
    .toFile(filename, ()=> {})