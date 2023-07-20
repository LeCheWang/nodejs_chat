const ip_room = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const ip_message = document.getElementById("ip_message")
const btn_send = document.getElementById("btn_send")

const ul_message = document.getElementById("ul_message")

var socket = io.connect()

let my_name = localStorage.getItem("username");

socket.on("connect", function(data){
    console.log(data);
})

btn_join.addEventListener('click', ()=>{ 
    const room = ip_room.value 
    socket.emit("join", room)
    alert(`Join room ${room} thành công!`)
})

const sendMessage = ()=>{
    const message = ip_message.value
    if (!message){
        return;
    }
    const obj = {
        name: my_name,
        message: message
    }
    socket.emit("message", JSON.stringify(obj));
    ip_message.value = ''
    ip_message.focus();
}

btn_send.addEventListener("click", sendMessage)

ip_message.addEventListener('keydown', (event)=>{
    if (event.key === "Enter"){
        sendMessage()
    }
})

socket.on("thread", function(data){
    const obj = JSON.parse(data)

    const li = document.createElement("li")
    li.innerHTML = `
        <span>${obj.message}</span>
        <i onclick="show(event)" class="choose_emotion fa-regular fa-face-smile" style="color: #f5ed00;"></i> 
    `; 

    if (obj.name === my_name){
        li.classList.add("right")
    }

    ul_message.appendChild(li)

    ul_message.scrollTop = ul_message.scrollHeight
})
 
function show(e){
    if (e.target.classList.contains("choose_emotion")){
        if (e.target.innerHTML.toString().trim().length === 0){
            e.target.innerHTML = `
                <div class="emotions">
                    <i class="fa-sharp fa-solid fa-heart" style="color: #ff0000;"></i>
                    <i class="fa-solid fa-face-laugh-beam" style="color: #fbff00;"></i>
                    <i class="fa-solid fa-face-sad-tear" style="color: #fbff00;"></i>
                    <i class="fa-solid fa-face-angry" style="color: #ffc800;"></i> 
                </div>
            `
        }else {
            e.target.innerHTML = ''
        }
    } 
}

 