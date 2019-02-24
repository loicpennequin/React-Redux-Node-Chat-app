const bcrypt = require('bcrypt');
const Chance = require('chance');
const cfg = require('./../../config/config.js');

const chance = new Chance();

const user = i => ({
    username: 'user' + i,
    password: bcrypt.hashSync('azerty', cfg.SEED.PASSWORD_SALT_ROUNDS),
    email: chance.email({ domain: 'gmail.com' }),
    bio: chance.sentence({
        words: chance.integer({ min: 5, max: 15 })
    }),
    friends_count: cfg.SEED.HOW_MANY_FRIENDS,
    created_at: new Date()
});

exports.seed = function(knex, Promise) {
    return knex.schema
        .raw('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => knex.schema.raw('TRUNCATE TABLE users'))
        .then(() => knex.schema.raw('SET FOREIGN_KEY_CHECKS = 1'))
        .then(() =>
            knex('users').insert(
                [...Array(cfg.SEED.HOW_MANY_USERS)].map((_, i) => user(i + 1))
            )
        );
};
