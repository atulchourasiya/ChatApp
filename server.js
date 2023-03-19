<<<<<<< HEAD
const http = require('http');
const PORT = process.env.PORT || 8000;
const server = http.createServer(function(req,res){
 res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(PORT);

const io = require('socket.io')(server, {
=======
const io = require('socket.io')(https://livechat-9l9u.onrender.com, {
>>>>>>> 2a3a162fd33d3557cdb839c93fd5bbb43a7583dd
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
