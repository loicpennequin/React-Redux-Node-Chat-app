const User = require('./model.js').model;
const ContactService = () => require('./../contact').service;
const slugify = require('slugify');
const nullPrune = require('null-prune');

class UserService {
    constructor() {}

    async createUser(body) {
        logger.debug('UserService.createUser()');
        const user = await User.create({
            ...body,
            slug: slugify(body.username)
        });
        return user.toJSON();
    }

    async getUserBySlug(slug) {
        logger.debug('UserService.getUserBySlug()');
        const user = await User.findOne({ slug });
        return Object.assign(nullPrune(user.toJSON()), {
            contacts: await ContactService().getUserContacts(user.get('id'))
        });
    }

    async getUserById(id) {
        logger.debug('UserService.getUserById()');
        const user = await User.findById(id);
        return Object.assign(nullPrune(user.toJSON()), {
            contacts: await ContactService().getUserContacts(id)
        });
    }

    async getSelf(id) {
        logger.debug('UserService.getSelf()');
        const user = await User.findById(id);
        return Object.assign(nullPrune(user.toJSON()), {
            contacts: await ContactService().getUserContacts(id),
            requests: await ContactService().getUserRequests(id)
        });
    }

    async getLatestUsers() {
        logger.debug('UserService.getLatestUsers()');
        const users = await User.getList(
            {
                order_by: '-created_at',
                limit: cfg.DEFAULT_QUERY_PARAMS.LATEST_USERS.LIMIT
            },
            ['id', 'username', 'slug']
        );

        return users.toJSON();
    }

    async incrementFriendCount(id) {
        logger.debug('UserService.IncrementFriendCount()');
        return await User.query()
            .where('id', id)
            .increment('friends_count', 1);
    }

    async setOnline(id) {
        logger.debug(`UserService.SetOnline()`);
        return await User.update(
            { status: cfg.ENUMS.USER_STATUS.ONLINE },
            { id }
        );
    }

    async setOffline(id) {
        logger.debug(`UserService.SetOffine()`);
        return await User.update(
            { status: cfg.ENUMS.USER_STATUS.OFFLINE },
            { id }
        );
    }
}

module.exports = new UserService();
