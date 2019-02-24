const path = require('path');
const { DATABASE } = cfg;
const knex = require('knex')(DATABASE);
const bookshelf = require('bookshelf')(knex);
const bookshelfBcrypt = require('bookshelf-bcrypt');
const modelBasePlus = require('bookshelf-modelbase-plus');

bookshelf.plugin(bookshelfBcrypt);
bookshelf.plugin('registry');
bookshelf.plugin('visibility');
bookshelf.plugin('pagination');
bookshelf.plugin(modelBasePlus);

const ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = { bookshelf, ModelBase };
