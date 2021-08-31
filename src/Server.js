import io from 'socket.io-client';

export const on = (cb) => {
    const connection = io('http://bysj.servegame.com:3030');
    connection.on('connect_error', err => {
        console.log(`connect_error due to ${err.message}`);
    });
    connection.on('tcpudp created', cb(connection));
};
