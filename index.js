const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

app.use(express.json())

app.use(express.static('public'))

app.set("view engine", 'ejs')
app.set("views", 'views')


io.on("connection", function(client){
    console.log("có người kết nối");
    var room; //phòng chat
    //tham gia chat
    client.on("join", function(data){
        room = data;
        client.join(room);
    })
    client.on("message", function(data){
        io.to(room).emit("thread", data)
    })
})

app.get('/chat', (req, res) => {
    return res.render("chat.ejs")
});


server.listen(5000, ()=>{
    console.log("server run at port 5000");
})