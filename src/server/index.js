// environnement config
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), 'config/.env') });

// globals
global.cfg = require('./../../config/config.js');
global.logger = require('./services/logger.js');

// dependencies
const express = require('express');
const next = require('./next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
const http = require('http');

// express app
const app = express();
const server = http.Server(app);

// app modules
const auth = require('./modules/auth');
const contact = require('./modules/contact');
const user = require('./modules/user');
const message = require('./modules/message');

app.disable('x-powered-by');
app.use(helmet());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static('public'));
app.use(cors());

// passport config
auth.middleware();

// start websocket server;
const websockets = require('./services/websockets.js');
websockets.start(server);

// first call next then declare API routes then start server
next(app).then(async nextRoutes => {
    // declare API routes
    const APIRouter = express.Router();
    APIRouter.use(require('./middlewares/requestLogger.js'));
    auth.routes(APIRouter);
    user.routes(APIRouter);
    contact.routes(APIRouter);
    message.routes(APIRouter);
    app.use('/api', APIRouter);

    nextRoutes();

    // websockets.start(server);
    // start server
    server.listen(process.env.PORT, err => {
        if (err) throw err;
        logger.info(`> Ready on http://localhost:${process.env.PORT}`);
    });
});
