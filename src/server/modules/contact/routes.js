const ContactService = require('./service');
const AuthService = require('./../auth/service.js');

module.exports = router => {
    router.post(
        '/request',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const request = await ContactService.createRequest(
                req.user.id,
                req.body.sendee_id
            );

            res.json(request);
        }
    );

    router.put(
        '/request/:id/accept',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const request = await ContactService.acceptRequest(req.params.id);

            res.json(request);
        }
    );

    router.delete(
        '/request/:id/decline',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const request = await ContactService.declineRequest(req.params.id);

            res.json(request);
        }
    );

    router.put(
        '/contact/:id/markasread',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const request = await ContactService.markMessagesAsRead(
                req.params.id,
                req.user.id
            );

            res.json(request);
        }
    );
};
