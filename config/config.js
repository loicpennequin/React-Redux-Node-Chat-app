const path = require('path');
const config = Object.freeze({
    PATH: Object.freeze({
        NEXT_: path.resolve(__dirname, './../src/client'),
        LOGS: 'logs'
    }),
    LOGGER: Object.freeze({
        FORMAT: printf => printf(info => `${info.level}: ${info.message}`),
        LOGLEVEL: 'debug'
    }),
    DATABASE: Object.freeze({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD || '',
            charset: 'utf8'
        },
        debug: false,
        migrations: {
            directory: './tools/migrations'
        },
        seeds: {
            directory: './tools/seeds'
        }
    }),
    SEED: Object.freeze({
        PASSWORD_SALT_ROUNDS: 12,
        HOW_MANY_USERS: 10,
        HOW_MANY_FRIENDS: 5
    }),
    ENUMS: Object.freeze({
        CONTACT_REQUEST_STATUS: Object.freeze({
            PENDING: 0,
            ACCEPTED: 1,
            DECLINED: 2
        }),
        USER_STATUS: Object.freeze({
            OFFLINE: 0,
            ONLINE: 1,
            AWAY: 2
        })
    }),
    JWT: Object.freeze({
        MAXAGE: '15m',
        ISSUER: 'http://dariahub.com'
    }),
    COOKIE: Object.freeze({
        PATH: '/',
        HTTPONLY: true,
        SECURE: false,
        SAMESITE: false,
        MAXAGE: 604800000
    }),
    DEFAULT_QUERY_PARAMS: Object.freeze({
        LATEST_USERS: Object.freeze({
            LIMT: 10
        })
    })
});

module.exports = config;
