import io from 'socket.io-client';
import paths from 'constants/paths.js';

let socket = {
    close: () => {}
};

export const createSocketConnexion = () => {
    socket = io(paths.BASE_URL, { transports: ['websocket'] });
    return socket;
};

export const closeSocketConnexion = () => {
    socket.disconnect();
};

export default function() {
    return socket;
}
