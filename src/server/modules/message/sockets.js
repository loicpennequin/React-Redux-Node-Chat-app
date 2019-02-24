const { io, sockets } = require('./../../services/websockets.js');

module.exports = {
    emitNewMessage(message) {
        const contact = [...sockets()].find(
            s => s.userId === message.sendee_id
        );
        if (contact) {
            io()
                .to(`${contact.socketId}`)
                .emit('Recieved new message', message);
        }
    }
};
