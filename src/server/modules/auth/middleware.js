const User = require('./../user').model;
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const passport = require('passport');

module.exports = () => {
    passport.use(
        'local',
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            _localStrategy
        )
    );
    passport.use('jwt', new JWTStrategy(_JWTStrategyOpts, _JWTStrategy));
};

const _localStrategy = async (username, password, done) => {
    try {
        const user = await User.findOne({ username }, { require: true });

        if (!user || !(await user.comparePassword(password))) {
            return done(null, false, { message: 'InvalidLogin' });
        }

        return done(null, user);
    } catch (err) {
        console.log(err);
        return done(null, false, { message: 'InvalidLogin' });
    }
};

const _tokenExtractor = req => {
    return req.cookies && req.cookies['jwt'] ? req.cookies['jwt'] : null;
};

const _JWTStrategyOpts = {
    jwtFromRequest: _tokenExtractor,
    secretOrKey: process.env.SESSION_SECRET,
    ignoreExpiration: true
};

const _JWTStrategy = async (payload, done) => {
    try {
        const user = await User.findOne({ id: payload.sub }, { require: true });
        return done(null, user.toJSON());
    } catch (err) {
        return done(err);
    }
};
