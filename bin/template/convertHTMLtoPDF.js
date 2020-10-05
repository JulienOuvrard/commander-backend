"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require('puppeteer');
exports.convertHTMLToPDF = async (html, callback, options = null, puppeteerArgs = null, remoteContent = true, clipHeight = true) => {
    if (typeof html !== 'string') {
        throw new Error('Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.');
    }
    let browser;
    if (puppeteerArgs) {
        browser = await puppeteer.launch(puppeteerArgs);
    }
    else {
        browser = await puppeteer.launch();
    }
    const page = await browser.newPage();
    if (!options) {
        options = { format: 'Letter' };
    }
    if (remoteContent === true) {
        await page.goto(`data:text/html;base64,${Buffer.from(html).toString('base64')}`, {
            waitUntil: 'networkidle0'
        });
    }
    else {
        await page.setContent(html);
    }
    const clientHeight = await page.evaluate(() => document.getElementsByClassName('page')[0].clientHeight);
    const pageHeight = clientHeight + 40;
    options.height = pageHeight + 'px';
    await page.pdf(options).then(callback, function (error) {
        console.log(error);
    });
    await browser.close();
};
//# sourceMappingURL=convertHTMLtoPDF.js.map