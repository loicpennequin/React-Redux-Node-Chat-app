const UserService = () => require('./../user').service;
const ContactService = () => require('./../contact').service;
const {
    onConnectHandler,
    emitToContacts
} = require('./../../services/websockets.js');

onConnectHandler(async (io, socket) => {
    await UserService().setOnline(socket.userId);
    emitToContacts(socket, 'CONTACT LOGGED IN', { id: socket.userId });

    socket.on('disconnect', () => {
        UserService().setOffline(socket.userId);
        emitToContacts(socket, 'CONTACT LOGGED OUT', { id: socket.userId });
    });
});
