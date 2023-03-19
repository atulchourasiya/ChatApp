const socket = io('https://worried-life-jacket-mite.cyclic.app/');

const formInput = document.getElementById('formInput');
const formName = document.getElementById('formName');
const messageInput = document.getElementById('messageInput');
const nameInput = document.getElementById('nameInput');
const messageContainer = document.getElementById('messageContainer');
let userName;

const scrollToBottom = ()=>{
	messageContainer.scrollTop = messageContainer.scrollHeight;
}

document.addEventListener('load',()=>{
	scrollToBottom();
})

formName.addEventListener('submit', (event) => {
	event.preventDefault();
	 userName = nameInput.value;
	if (userName === '') {
		return;
	} else {
		formInput.classList.remove('d-none');
		formName.classList.add('d-none');
		socket.emit('new-user-joined', userName);
	}
	nameInput.value = '';
});

const append = (data, event) => {
	let Element;
	if (event === 'joined') {
		Element = `<div class=" d-flex justify-content-center ">
                                  <p class="p-1 rounded border fw-light wrap" style="background-color: aliceblue;max-width: 18rem">${captilize(
																		data.name
																	)} Joined The Chat</p>
                               </div>`;
	} else if (event === 'left') {
		Element = `<div class=" d-flex justify-content-center ">
                                  <p class="p-1 rounded border fw-light wrap" style="background-color: aliceblue;max-width: 18rem">${captilize(
																		data.name
																	)} Left The Chat</p>
                               </div>`;
	} else if (event === 'receive') {
		Element = ` <div class=" d-flex ">
					  <img src="https://cdn-icons-png.flaticon.com/512/1057/1057231.png" class="m-2" alt="" style="width: 40px; height: 100%;">
					  <p class="p-1 mt-2 rounded border textbg" style="max-width: 15.5rem">${captilize(
							data.name
						)}: ${data.message}</p>
				  </div>`;
	} else if (event === 'send') {
		Element = `<div class="d-flex flex-row-reverse">
					  <img src="https://cdn-icons-png.flaticon.com/512/1057/1057231.png" class="m-2" alt="" style="width: 40px; height: 100%;">
					  <p class="p-1 mt-2 rounded border textbg" style="max-width: 15.5rem">${captilize(
							data.name
						)}: ${data.message}</p>
				  </div>`;
	}
	messageContainer.insertAdjacentHTML('beforeend', Element);
	scrollToBottom();
};

const captilize = (string) => {
	string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	return string;
};

formInput.addEventListener('submit', (event) => {
	event.preventDefault();
	const message = messageInput.value;
	append({ name: userName, message }, 'send');
	socket.emit('send', message);
	messageInput.value = '';
});

socket.on('user-joined', (name) => {
	append({ name }, 'joined');
});

socket.on('left', (name) => {
	append({ name }, 'left');
});

socket.on('receive', (data) => {
	append({ name: data.name, message: data.message }, 'receive');
});
