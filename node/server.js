var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const axios = require('axios');
const Redis = require('ioredis');

const redis = new Redis();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/app', function (req, res) {
	res.sendFile(__dirname + '/index.html')
})

//Redis channel
const channel = 'order_notification';
redis.subscribe(channel, (error, count) => {
	if (error) {
		throw new Error(error);
	}
	console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
});
redis.on("message", function(channel, message) {
	io.emit('order_notification', message);
	console.log("Receive message %s from channel %s", message, channel);
 });

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000,  function() {
	console.log('localhost:3000 Working!');
})