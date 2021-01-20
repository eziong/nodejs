var socket = io("http://localhost:3000");
var messageContainer = document.getElementById("message-container");
var roomContainer = document.getElementById("room-container");
var messageForm = document.getElementById("send-container");
var messageInput = document.getElementById("message-input");

if (messageForm !== null) {
    const name = prompt("What is your name?");
    appendMessage("You Joined");
    socket.emit("new-user", roomName, name);

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = messageInput.value;
        appendMessage(`You: ${message}`);
        socket.emit("send-chat-message", roomName, message);
        messageInput.value = "";
    });
}

socket.on("room-created", (room) => {
    const roomElement = document.createElement("div");
    roomElement.innerText = room;
    const roomLink = document.createElement("a");
    roomLink.href = `/${room}`;
    roomLink.innerText = "join";
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});

socket.on("chat-message", (data) => {
    console.log("chat-message");
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
    appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
    appendMessage(`${name} disconnected`);
});

function appendMessage(message) {
    console.log("appendMessage");
    const messageElemet = document.createElement("div");
    messageElemet.innerText = message;
    messageContainer.append(messageElemet);
}
