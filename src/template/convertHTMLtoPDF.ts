const puppeteer = require('puppeteer');

export const convertHTMLToPDF = async (html, callback, options: any = null, puppeteerArgs: any = null, remoteContent: boolean = true, clipHeight: boolean = true) => {
    if (typeof html !== 'string') {
        throw new Error(
            'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
        );
    }
    let browser;
    if (puppeteerArgs) {
        browser = await puppeteer.launch(puppeteerArgs);
    } else {
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
    } else {
        //page.setContent will be faster than page.goto if html is a static
        await page.setContent(html);
    }

    //const height_weight_ratio = await page.evaluate( () => window.innerHeight / window.innerWidth)
    //const height = parseInt(options.width) * height_weight_ratio
    //options.scale = 1/height_weight_ratio
    //const windoweight = await page.evaluate(() => window.innerHeight);
    const clientHeight = await page.evaluate(() => document.getElementsByClassName('page')[0].clientHeight);
    const pageHeight = clientHeight + 40;
    options.height = pageHeight + 'px';


    await page.pdf(options).then(callback, function (error) {
        console.log(error);
    });
    await browser.close();
};
