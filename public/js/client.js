const ip_name = document.getElementById("name")
const ip_room = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const ip_message = document.getElementById("ip_message")
const btn_send = document.getElementById("btn_send")

const ul_message = document.getElementById("ul_message")

var socket = io.connect()

socket.on("connect", function(data){
    console.log(data);
})

btn_join.addEventListener('click', ()=>{ 
    const room = ip_room.value
    socket.emit("join", room)
})

btn_send.addEventListener("click", ()=>{
    const message = ip_message.value
    const name = ip_name.value
    socket.emit("message", name + ": " + message)
})

socket.on("thread", function(data){
    const li = document.createElement("li")
    li.innerHTML = data;
    ul_message.appendChild(li)
})