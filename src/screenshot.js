const puppeteer = require('puppeteer');

const WIDTH = 1024;
const HEIGHT = 768;

let browser;

const screenshotReady = async () => {
    browser = await puppeteer.launch({
        args: ['--incognito'],
        headless: true,
        ignoreHTTPSErrors: true,
        timeout: 2000,
    });
}

const getScreenshot = async (url, filePath) =>  {

    const page = await browser.newPage();
    page.setViewport({
        width: WIDTH,
        height: HEIGHT,
    });

    await page.goto(url);
    await page.screenshot({
        path: filePath,
        type: 'jpeg',
        quality: 50,
        clip: {
            x: 0,
            y: 0,
            width: WIDTH,
            height: HEIGHT,
        }
    });
    await page.close();
}

module.exports = {
    screenshotReady,
    getScreenshot,
}
