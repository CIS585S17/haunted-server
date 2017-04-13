
var http = require('http');
var server = http.createServer();
var io = require('socket.io')(server);

var lookingForGame = [];
var games = [];

const Game = require('./server/game');
const {RoomGraph} = require('./server/room');
const roomFileNames = require('./server/room-files.json');
let graph = new RoomGraph(roomFileNames);

// Server starts listening on port 5000
server.listen('5000', ()=>{
    console.log('Listening at http://localhost:5000');
});

// Handles a player connection
io.on('connection', function (socket) {
    console.log('A user connected');

    // Add event handlers

});
