"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
var templateName = 'print.template.html';
var template = path.join(__dirname, templateName);
var filename = path.join(__dirname, '../recepit', templateName.replace('.html', '.pdf'));
var templateHtml = fs.readFileSync(template, 'utf8');
var options = {
    width: '80mm',
    height: '100mm'
};
pdf
    .create(templateHtml, options)
    .toFile(filename, () => { });
//# sourceMappingURL=print.js.map