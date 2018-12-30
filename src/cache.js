const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { getScreenshot } = require('./screenshot.js');

const hashURL = url => {
    const hash = crypto.createHash('sha256');
    hash.update(url);
    return hash.digest('hex');
}

class ScreenshotCache {

    constructor(basePath) {
        this.basePath = basePath;
        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath);
        }
    }

    getHashedURLPath(url) {
        return path.join(this.basePath, `${hashURL(url)}.jpg`);
    }

    async has(imagePath) {
        return new Promise((res, rej) => {
            fs.access(imagePath, fs.constants.R_OK, (err) => {
                res(!err);
            });
        });
    }

    async getFromFS(imagePath) {
        return new Promise((res, rej) => {
            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    rej(err);
                    res(null);
                } else {
                    res(data);
                }
            });
        });
    }

    async createAndGet(url) {
        const imagePath = this.getHashedURLPath(url);
        if (await this.has(imagePath)) {
            return this.getFromFS(imagePath);
        } else {
            await getScreenshot(url, imagePath);
            return this.getFromFS(imagePath);
        }
    }

}

module.exports = {
    ScreenshotCache,
}
