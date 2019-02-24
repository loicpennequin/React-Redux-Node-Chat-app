const path = require('path');
const next = require('next');
const dotenv = require('dotenv');

// Next App
const app = next({
    dir: path.resolve(__dirname, './../../client'),
    dev: process.env.NODE_ENV === 'development',
    quiet: true
});

const nextHandler = app.getRequestHandler();

const bootstrap = async expressApp => {
    try {
        await app.prepare();

        return function makeNextRoutes() {
            expressApp.get('/profile/:slug', (req, res) => {
                const queryParams = { slug: req.params.slug };
                app.render(req, res, '/profile', queryParams);
            });

            expressApp.get('/conversation/:slug', (req, res) => {
                const queryParams = { slug: req.params.slug };
                app.render(req, res, '/conversation', queryParams);
            });

            expressApp.get('*', (req, res) => {
                return nextHandler(req, res);
            });
        };
    } catch (err) {
        logger.error(err.stack);
        process.exit(1);
    }
};

module.exports = bootstrap;
