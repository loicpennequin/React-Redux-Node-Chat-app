const passport = require('passport');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor() {
        this._generateJWT = this._generateJWT.bind(this);
    }

    authenticate(req, res) {
        passport.authenticate('local', { session: false }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({ login: false });
            }

            req.login(user, { session: false }, err => {
                if (err) {
                    res.send(err);
                }

                const token = this._generateJWT(user);
                res.cookie('jwt', token, {
                    path: cfg.COOKIE.PATH,
                    httpOnly: cfg.COOKIE.HTTPONLY,
                    secure: cfg.COOKIE.SECURE,
                    sameSite: cfg.COOKIE.SAMESITE,
                    secret: process.env.SESSION_SECRET,
                    maxAge: cfg.COOKIE.MAXAGE
                });
                return res.send(true);
            });
        })(req, res);
    }

    ensureAuthenticated(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                return res.status(401).send();
            }

            // const checkExp = _checkAndUpdateTokenExp(user, res);
            // if (!checkExp) res.status(401).redirect('/');
            // const token = this._generateJWT(user);

            req.login(user, { session: false }, async err => {
                if (err) {
                    return res.status(401).send();
                }
                next();
            });
        })(req, res);
    }

    _generateJWT(user) {
        const userData = {
            // token public claims
            sub: user.id,
            auth_time: new Date().getTime()
        };
        return jwt.sign(userData, process.env.SESSION_SECRET, {
            expiresIn: cfg.JWT.MAXAGE,
            issuer: cfg.JWT.ISSUER
        });
    }

    async logout(req, res, next) {
        req.logout();
        res.clearCookie('jwt');
        res.json({ authenticated: false });
    }
}

module.exports = new AuthService();
