const AuthService = require('./service.js');

module.exports = router => {
    router.post('/login', (req, res) => AuthService.authenticate(req, res));
    router.get('/ensurelogin', AuthService.ensureAuthenticated, (req, res) =>
        res.json({ authenticated: true })
    );
    router.get('/logout', AuthService.logout);
};
