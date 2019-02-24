const MessageService = require('./service.js');
const AuthService = require('./../auth/service.js');

module.exports = router => {
    router.get(
        '/message/conversation/:id',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const conversation = await MessageService.getConversation(
                req,
                req.params.id
            );

            res.json(conversation);
        }
    );

    router.post(
        '/message',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const message = await MessageService.createMessage(
                req.body,
                req.user.id
            );

            res.json(message);
        }
    );

    router.put(
        '/message/:id/markasread',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const message = await MessageService.markMessageAsRead(
                req.params.id
            );

            res.json(message);
        }
    );
};
