const express = require("express");
const cors = require('cors')
const { PORT, SYNC } = require("./config/serverConfig");
const {setupDB} = require('./config/dbConfig')
const http = require('http')
const app = express();
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server, {
	cors: {
        origin: 'https://chat-application-assignment.vercel.app',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
})
const apiRouter = require("./routes/index");
const db = require('./models/index');


// DB connectivity
setupDB();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/api", apiRouter);

// io connection
let users = []
io.on('connection', socket => {
	console.log("new User connected", socket.id);
	socket.on('addUser', userId => {
		const isUserExist = users.find(user => user.userId === userId);
		if(!isUserExist){
			const user = { userId, socketId: socket.id, status: 'Online'};
			users.push(user);
			io.emit('getUsers', users);
		}
	});

	socket.on('sendMessage', ({senderId, receiverId, message}) => {
		const receiver = users.find(user => user.userId === receiverId)
		const sender = users.find(user => user.userId === senderId)
		if(receiver){
			console.log('Emitting message to receiver and sender:', { senderId, receiverId, message });
			io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
				senderId,
				receiverId,
				message  
			});
		} else{
			io.to(sender.socketId).emit('getMessage', {
				senderId,
				receiverId,
				message  
			});
		}
	})



	socket.on('disconnect', () => {
		users = users.filter((user) => user.socketId !== socket.id);
		io.emit('getUsers', users);
	})
})

server.listen(PORT, () => {
	// if(SYNC){
	// 	db.sequelize.sync({alter: true})
	// }
	console.log(`Server is running on PORT: ${PORT}`);
});
