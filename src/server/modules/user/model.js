const { bookshelf, ModelBase } = require('./../../services/bookshelf');
const bcrypt = require('bcrypt');
const Contacts = require('./../contact').collection;

const model = ModelBase.extend({
    tableName: 'users',
    hidden: ['password'],
    bcrypt: { field: 'password' },

    _filterRequests: function(statusValue) {
        return Contacts.query('where', 'status', statusValue)
            .query('andWhere', 'sendee_id', this.id)
            .query('orWhere', 'sender_id', this.id);
    },

    contacts: function() {
        return this._filterRequests(cfg.ENUMS.CONTACT_REQUEST_STATUS.ACCEPTED)
            .fetch({ withRelated: ['sendee', 'sender'] })
            .then(results => results.toJSON());
    },

    requests: function() {
        return this._filterRequests(cfg.ENUMS.CONTACT_REQUEST_STATUS.PENDING)
            .fetch({ withRelated: ['sendee', 'sender'] })
            .then(results => results.toJSON());
    },

    comparePassword: async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.get('password'));
    }
});

bookshelf.model('User', model);

const collection = bookshelf.Collection.extend({
    model
});

module.exports = {
    model,
    collection
};
