const http = require('http');
const PORT = process.env.PORT || 8000;
const server = http.createServer(function(req,res){
 res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Server is up and running!');
  res.end();
}).listen(PORT);
const io = require('socket.io')(server, {
	cors: {
		origin: '*'
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
