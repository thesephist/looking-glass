# Looking Glass

Looking Glass is a simple web screenshot API using Puppeteer.

When I say simple, I really mean _simple_. It was designed to serve exactly one API endpoint with one use case, which is to generate thumbnail previews for my [Hacker News Reader](https://torushn.surge.sh).

## Installation and usage

To install ...

1. `git clone` the repository
2. Install Node's dependencies with `yarn install` (or `npm install`).
3. If you don't already have Chrome installed on your system and you're on a Linux system (like a server), you might also need to install required OS-level libraries. Because I run `looking-glass` almost exclusively on Debian-based Linux systems, I've checked the `install_os_deps.sh` script that you can run on a Debian system to bootstrap all required libraries.
4. You'll need a configuration file, `config.js`, at the root of the project. There's a mock config file checked into the repostory as `mock.config.js` -- feel free to use that as the base.
    - You'll need to set an API token or two that you can use to access the service, since Puppeteer isn't exactly the most lightweight service. I could use more sophisticated systems for managing access tokens, but since it's just me using it, I'm just embedding tokens in the `AUTHORIZED_TOKENS` field of my config file. If you feel adventurous, feel free to try to integrate a better system in. Otherwise, just put a string token in that array in the config file.
5. Once both sets of dependencies are installed, check that Puppeteer / Chromium launches with `yarn start` -- it should eventually log `Looking Glass running on <port>`.
6. Navigate to `<your server>:<port>/screenshot?url=https://google.com/&token=<your api token>`. If you see Google's home page, Looking Glass is working!

If you run into any bugs, please feel free to open an issue. But because it's such a narrow use case, if you have feature requests, I might just direct you to more full-featured screenshot services.
