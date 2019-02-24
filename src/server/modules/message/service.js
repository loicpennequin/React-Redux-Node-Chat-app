const Message = require('./model.js').model;
const slugify = require('slugify');
const nullPrune = require('null-prune');
const messageSockets = require('./sockets');

class MessageService {
    constructor() {}

    async getConversation(req, userId) {
        logger.debug(`MessageService.getConversation()`);
        const messages = await Message.getList(
            {
                order_by: 'created_at',
                withRelated: ['sendee', 'sender'],
                sender_id: userId,
                _or: { sendee_id: userId },
                _and: {
                    sender_id: req.params.id,
                    _or: { sendee_id: req.params.id }
                }
            },
            ['id', 'sender_id', 'sendee_id', 'body', 'is_read']
        );
        return messages.toJSON();
    }

    async createMessage(body, sender_id) {
        logger.debug(`MessageService.createMessage()`);
        const _message = await Message.create({
            ...body,
            sender_id
        });
        // @FIXME there must be a better way to fetch relations with bookshelf on a newly created model
        const message = (await Message.findById(_message.get('id'), {
            withRelated: ['sender', 'sendee']
        })).toJSON();

        messageSockets.emitNewMessage(message);

        return message;
    }

    async markAsRead(sender_id, sendee_id) {
        logger.debug(`MessageService.markAsRead()`);
        // @FIXME can't figure out how bulkUpdate workd in modelBase plus, and standard Model.save() returns the wrong list of ids;
        const messageIds = (await Message.findAll(
            {
                sender_id,
                sendee_id,
                is_read: false
            },
            { columns: ['id'] }
        )).toJSON();

        if (messageIds.length > 0) {
            const messages = await Message.query(qb => {
                qb.where('sender_id', '=', sender_id)
                    .andWhere('sendee_id', '=', sendee_id)
                    .andWhere('is_read', '=', false);
            }).save({ is_read: true }, { patch: true });
        }

        return messageIds;
    }

    async getUnreadMessages(userId, contactId) {
        logger.debug(`MessageService.getUnreadMessages()`);
        const unreadMessages = await Message.query(qb => {
            qb.where('sender_id', '=', contactId)
                .andWhere('sendee_id', '=', userId)
                .andWhere('is_read', '=', false);
        });

        return unreadMessages.count();
    }
}

module.exports = new MessageService();
