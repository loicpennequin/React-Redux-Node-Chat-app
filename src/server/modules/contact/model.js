const { bookshelf, ModelBase } = require('./../../services/bookshelf');

const model = ModelBase.extend({
    tableName: 'contacts',
    sender: function() {
        return this.belongsTo('User', 'sender_id');
    },
    sendee: function() {
        return this.belongsTo('User', 'sendee_id');
    }
});

bookshelf.model('Contact', model);

const collection = bookshelf.Collection.extend({
    model
});

module.exports = {
    model,
    collection
};
