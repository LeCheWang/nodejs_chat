const ip_room = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const ip_message = document.getElementById("ip_message")
const btn_send = document.getElementById("btn_send")

const ul_message = document.getElementById("ul_message")

var socket = io.connect()

let my_name = localStorage.getItem("username");
               
const emotions = [
    {
        id: 1,
        emotion: '<i class="fa-sharp fa-solid fa-heart" style="color: #ff0000;"></i>'
    },
    {
        id: 2,
        emotion: '<i class="fa-solid fa-face-laugh-beam" style="color: #fbff00;"></i>'
    },
    {
        id: 3,
        emotion: '<i class="fa-solid fa-face-sad-tear" style="color: #fbff00;"></i>'
    },
    {
        id: 4,
        emotion: '<i class="fa-solid fa-face-angry" style="color: #ffc800;"></i> '
    }
]

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

    let id = ''
    for (let i = 0; i<8; i++){
        id += Math.floor(Math.random()*10)
    }

    const obj = {
        id: +id,
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
        <span id="${obj.id}">
            <p>${obj.message}</p>
        </span>
        <i onclick="show(event, ${obj.id})" class="choose_emotion fa-regular fa-face-smile" style="color: #f5ed00;"></i> 
    `; 

    if (obj.name === my_name){
        li.classList.add("right")
    }

    ul_message.appendChild(li)

    ul_message.scrollTop = ul_message.scrollHeight
})
 
function show(e, id){
    if (e.target.classList.contains("choose_emotion")){
        if (e.target.innerHTML.toString().trim().length === 0){
            e.target.innerHTML = `
                <div class="emotions">
                    <i onclick="choose(event, ${id}, 1)" class="fa-sharp fa-solid fa-heart" style="color: #ff0000;"></i>
                    <i onclick="choose(event, ${id}, 2)" class="fa-solid fa-face-laugh-beam" style="color: #fbff00;"></i>
                    <i onclick="choose(event, ${id}, 3)" class="fa-solid fa-face-sad-tear" style="color: #fbff00;"></i>
                    <i onclick="choose(event, ${id}, 4)" class="fa-solid fa-face-angry" style="color: #ffc800;"></i> 
                </div>
            `
        }else {
            e.target.innerHTML = ''
        }
    } 
}

function choose(e, id, id_emotion){
    const span_message = document.getElementById(id+"");

    const emotion = e.target;
    emotion.style.position = 'absolute'
    emotion.style.top = '23px'
    emotion.style.left = '5px'
    emotion.style.backgroundColor = 'blue'
    emotion.style.borderRadius = "50%"
    
    span_message.appendChild(emotion) 
    const obj = {
        id: id,
        emotion: id_emotion
    }
    socket.emit("emotion", JSON.stringify(obj));
}

socket.on("emotion", (data)=>{
    const obj = JSON.parse(data);
    const span_message = document.getElementById(obj.id+"");

    let emotion = emotions[obj.emotion-1].emotion;
    const div = document.createElement("div")
    div.innerHTML = emotion
    emotion = div.firstChild;

    emotion.style.position = 'absolute'
    emotion.style.top = '23px'
    emotion.style.left = '5px'
    emotion.style.backgroundColor = 'blue'
    emotion.style.borderRadius = "50%"
    
    span_message.appendChild(emotion) 
})
 