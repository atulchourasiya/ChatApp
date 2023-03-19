const io = require('socket.io')("https://livechat-9l9u.onrender.com", {
	cors: {
		origin: 'https://atulchourasiya.github.io/'
	}
});

const users = {};

io.on('connection', (socket) => {
	socket.on('new-user-joined', (name) => {
		users[socket.id] = name;
		socket.broadcast.emit('user-joined', name);
	});
   
	socket.on('send', (message) => {
		socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('left', users[socket.id]);
	});
});
