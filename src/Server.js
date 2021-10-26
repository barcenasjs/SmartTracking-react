import io from "socket.io-client";

export const on = (cb) => {
  const connection = io("http://192.168.20.22:3030/");
  connection.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  connection.on("position created", cb(connection));
};
