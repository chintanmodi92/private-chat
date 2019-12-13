//DOM Query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');
const btnClicked = document.querySelectorAll('.clicked');



btnClicked.forEach(btn => console.log(btn))
// add a new chat
newChatForm.addEventListener('submit', e=> {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    console.log(message);
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch( err => console.log(err));
})

// update a new name
newNameForm.addEventListener('submit', e=> {
    e.preventDefault();
    const name = newNameForm.name.value.trim();
    console.log(name);
    chatroom.updateName(name);
    
    newNameForm.reset()

    //update and hide update message
    updateMsg.innerText = `User updated to ${name}`;
    setTimeout(() => {
        updateMsg.innerText= ""
    }, 3000)
})

// update the chat rooms

rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        chatUI.clear();
        console.log(e.target.id);

        btnClicked.forEach(btn => {
            if(e.target.id === btn.id) {
                e.target.classList.add('bgChange');
            }
            if (e.target.id !== btn.id && btn.classList.contains('bgChange')) {
                btn.classList.remove('bgChange');
            }
        });
        e.target.classList.add('clicked');
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))

    }
})

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anonymous';



//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

console.log(chatroom);


//get chats and render
chatroom.getChats((data) => {
    chatUI.render(data)
})

