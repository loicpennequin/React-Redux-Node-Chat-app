const Chance = require('chance');
const cfg = require('./../../config/config.js');

const chance = new Chance();

const contact = (i, id, status) => ({
    created_at: new Date(),
    friend_id: i,
    user_id: id,
    status
});

const userContacts = id =>
    [...Array(cfg.SEED.HOW_MANY_FRIEDS)].reduce((acc, _, i) => {
        const status = chance.integer({ min: 0, max: 2 });
        return acc.concat([
            contact(i + 1, id, status),
            contact(id, i + 1, status)
        ]);
    }, []);

exports.seed = function(knex, Promise) {
    const contacts = [...Array(cfg.SEED.HOW_MANY_USERS)].reduce((acc, _, i) => {
        const c = userContacts(i + 1);
        return acc.concat(c);
    }, []);
    return knex.schema
        .raw('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => knex.schema.raw('TRUNCATE TABLE contacts'))
        .then(() => knex.schema.raw('SET FOREIGN_KEY_CHECKS = 1'))
        .then(() => knex('contacts').insert(contacts));
};
