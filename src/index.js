const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true,
}));

const Config = require('../config.js');
const { ScreenshotCache } = require('./cache.js');
const { screenshotReady } = require('./screenshot.js');

const cache = new ScreenshotCache('./img');

const requestIsAuthorized = req => {
    return Config.AUTHORIZED_TOKENS.includes(req.query.token);
}

app.get('/screenshot', (req, res) => {
    const url = req.query.url;
    if (url) {
        if (requestIsAuthorized(req)) {
            res.status(200);
            res.set('Content-Type', 'image/png');
            cache.createAndGet(url).then(imageBlob => {
                res.send(imageBlob);
            });
        } else {
            res.status(401);
            res.set('Content-Type', 'text/plain');
            res.send('Authorized token required');
        }
    } else {
        res.status(400);
        res.set('Content-Type', 'text/plain');
        res.send('Invalid request');
    }
});

app.get('/', (_req, res) => {
    res.status(400);
    res.setHeader({'Content-Type': 'text/plain'});
    res.send('Invalid request');
});

screenshotReady().then(() => {
    app.listen(
        Config.PORT,
        _ => console.log(`Looking Glass running on :${Config.PORT}`)
    );
});
