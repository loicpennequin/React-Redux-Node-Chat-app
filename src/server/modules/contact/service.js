const Contact = require('./model.js').model;
const UserService = () => require('./../user').service;
const MessageService = () => require('./../message').service;
const nullPrune = require('null-prune');

class ContactService {
    constructor() {}

    async getUserContacts(id) {
        logger.debug(`ContactService.getUserContacts()`);
        const requests = await Contact.getList(
            {
                status: cfg.ENUMS.CONTACT_REQUEST_STATUS.ACCEPTED,
                _and: {
                    sender_id: id,
                    _or: { sendee_id: id }
                },
                withRelated: ['sender', 'sendee']
            },
            ['id', 'sender_id', 'sendee_id', 'status']
        );

        const contactsPromises = requests.toJSON().map(async contact => ({
            ...(contact.sender_id === id ? contact.sendee : contact.sender),
            requestId: contact.id,
            unreadMessagesCount: await MessageService().getUnreadMessages(
                id,
                contact.sender_id === id ? contact.sendee_id : contact.sender_id
            )
        }));

        const contacts = await Promise.all(contactsPromises);
        return contacts;
    }

    async getUserRequests(id) {
        logger.debug(`ContactService.getUserRequests()`);
        const requests = await Contact.getList(
            {
                status: cfg.ENUMS.CONTACT_REQUEST_STATUS.PENDING,
                _and: {
                    sender_id: id,
                    _or: { sendee_id: id }
                },
                withRelated: ['sender', 'sendee']
            },
            ['id', 'sender_id', 'sendee_id', 'status']
        );

        return requests.toJSON();
    }

    async createRequest(sender_id, sendee_id) {
        logger.debug(`ContactService.createRequests()`);
        const request = await Contact.create({
            sender_id,
            sendee_id
        });

        return request.toJSON();
    }

    async acceptRequest(id) {
        logger.debug(`ContactService.acceptRequests()`);
        const request = await Contact.update(
            { status: cfg.ENUMS.CONTACT_REQUEST_STATUS.ACCEPTED },
            { id }
        );
        await Promise.all([
            UserService().incrementFriendCount(request.get('sender_id')),
            UserService().incrementFriendCount(request.get('sendee_id'))
        ]);

        return await UserService().getUserById(request.get('sender_id'));
    }

    async declineRequest(id) {
        logger.debug(`ContactService.declineRequests()`);
        const request = await Contact.destroy({ id });
        return request.toJSON();
    }

    async markMessagesAsRead(sender_id, sendee_id) {
        logger.debug(`ContactService.markMessagesAsRead()`);
        return await MessageService().markAsRead(sender_id, sendee_id);
    }
}

module.exports = new ContactService();
