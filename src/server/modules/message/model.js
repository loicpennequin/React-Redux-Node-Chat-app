const { bookshelf, ModelBase } = require('./../../services/bookshelf');

const model = ModelBase.extend({
    tableName: 'messages',
    sender: function() {
        return this.belongsTo('User', 'sender_id');
    },
    sendee: function() {
        return this.belongsTo('User', 'sendee_id');
    }
});

bookshelf.model('Message', model);

const collection = bookshelf.Collection.extend({
    model
});

module.exports = {
    model,
    collection
};
