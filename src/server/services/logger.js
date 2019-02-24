/**
 * Logger configuration.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const { combine, timestamp, label, printf, colorize } = format;
const { LOGGER, PATH } = cfg;

if (!fs.existsSync(PATH.LOGS)) {
    fs.mkdirSync(PATH.LOGS);
}

const logger = createLogger({
    level: LOGGER.LOG_LEVEL,
    format: format.combine(colorize(), LOGGER.FORMAT(printf)),
    // defaultMeta: {service: 'user-service'},
    transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({
            filename: path.join(PATH.LOGS, 'error.log'),
            level: 'error',
            format: format.json()
        })
    ]
});

module.exports = logger;
