const net =require("net");
const port=(3030);
const Server=  new  net.createServer((socket)=>{
    socket.on("data",(data)=>{
        
        
    })

}
)
Server.listen(port);
  console.log(port)
