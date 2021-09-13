import io from 'socket.io-client';

export const on = (cb) => {
    const connection = io('ec2-18-223-136-40.us-east-2.compute.amazonaws.com');
    connection.on('connect_error', err => {
        console.log(`connect_error due to ${err.message}`);
    });
    connection.on('tcpudp created', cb(connection));
};
