const fs = require('fs');

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

const getScreenshot = async (url, filePath) => {
    try {
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
    } catch (e) {
        console.error('Error rendering preview', e);
        return new Promise((res, rej) => {
            fs.readFile('./assets/error.jpg', (err, data) => {
                if (err) {
                    console.log('Error on attempting to copy error file', err);
                    rej(err);
                }
                fs.writeFile(filePath, data, (err) => {
                    if (err) {
                        console.log('Error on attempting to write error file', err);
                        rej(err);
                    }
                    res();
                });
            });
        });
    }
}

module.exports = {
    screenshotReady,
    getScreenshot,
}
