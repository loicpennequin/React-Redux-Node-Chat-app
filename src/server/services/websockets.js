const socketio = require('socket.io');
const socketIoCookieParser = require('socket.io-cookie-parser');
const jwt = require('jsonwebtoken');
const ContactService = () => require('./../modules/contact').service;
const chalk = require('chalk');

let io;
let sockets = new Set();
let _handlers = [];
let _onConnectHandlers = [];

module.exports.start = server => {
    io = socketio(server);

    io.use(socketIoCookieParser(process.env.SESSION_SECRET));

    io.on('connection', socket => {
        logger.debug(
            chalk.magentaBright(`socket connected, socketId : ${socket.id}`)
        );

        const token = jwt.decode(socket.request.cookies.jwt) || {};
        sockets.add({ socketId: socket.id, userId: token.sub });
        console.log(sockets);

        socket.userId = token.sub;

        _onConnectHandlers.forEach(handler => {
            handler(io, socket);
        });

        socket.on('disconnect', () => {
            logger.debug(
                chalk.magentaBright(
                    `disconnecting socket, socketId : ${socket.id}`
                )
            );
            for (const s of sockets) {
                if (s.userId === socket.userId) {
                    sockets.delete(s);
                    break;
                }
            }
            logger.debug(
                chalk.magentaBright(
                    `socket disconnected, socketId : ${
                        socket.id
                    }, sockets remaining: ${sockets.size}`
                )
            );
        });

        _handlers.forEach(handler => {
            handler(io, socket);
        });
    });
};

module.exports.handler = handlerFunction => {
    _handlers.push(handlerFunction);
};

module.exports.onConnectHandler = handlerFunction => {
    _onConnectHandlers.push(handlerFunction);
};

module.exports.sockets = () => sockets;

module.exports.io = () => io;

module.exports.emitToContacts = async (socket, event, data) => {
    const contactIds = (await ContactService().getUserContacts(
        socket.userId
    )).map(c => c.id);
    logger.debug(
        chalk.magentaBright(
            `Websockets.emitToContacts - contact ids : ${contactIds}`
        )
    );

    [...sockets].forEach(s => {
        if (contactIds.indexOf(s.userId) !== -1) {
            logger.debug(chalk.magentaBright(`emitting to ${s.socketId}`));
            io.to(s.socketId).emit(event, data);
        }
    });
};
