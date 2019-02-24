const chalk = require('chalk');

module.exports = (req, res, next) => {
    try {
        logger.debug(
            chalk.bold(
                chalk.cyan(
                    `ROUTER - ${req.method.toUpperCase()} /api${req.url}`
                )
            )
        );
        next();
    } catch (err) {
        next();
    }
};
