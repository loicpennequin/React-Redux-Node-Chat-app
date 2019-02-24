const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), 'config/.env') });
const { DATABASE } = require(path.resolve(__dirname, './config/config.js'));

module.exports = DATABASE;
