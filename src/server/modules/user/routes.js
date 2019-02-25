const UserService = require('./service.js');
const AuthService = require('./../auth/service.js');

module.exports = router => {
    router.post('/user', async (req, res) => {
        try{
            const user = await UserService.createUser(req.body);
            res.json(user);
        } catch(error){
            logger.error(error);
            res.status(500).json({error});
        }
    });

    router.get(
        '/user/me',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const user = await UserService.getSelf(req.user.id);
            res.json(user);
        }
    );

    router.get(
        '/user/latest',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const users = await UserService.getLatestUsers();
            res.json(users);
        }
    );

    router.get(
        '/user/:slug',
        AuthService.ensureAuthenticated,
        async (req, res) => {
            const user = await UserService.getUserBySlug(req.params.slug);
            res.json(user);
        }
    );
};
