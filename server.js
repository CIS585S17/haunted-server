
var http = require('http')
var server = http.createServer()
var io = require('socket.io')(server)

var lookingForGame = []
var games = []
let availableGames = []

const {Game} = require('./server/game')
const {Player} = require('./server/plaer')
const {RoomGraph} = require('./server/room')
const roomFileNames = require('./server/room-files.json')
// let graph = new RoomGraph(roomFileNames)

// Server starts listening on port 5000
server.listen('5000', () => {
  console.log('Listening at http://localhost:5000')
})

// Handles a player connection
io.on('connection', function (socket) {
  console.log('A user connected')
  // socket.emit('games', )

  // Add event handlers
  socket.on('join', (data) => {
    games[data.gameIndex].addPlayer(new Player(2, socket))
  })

  socket.on('host-game', (data) => {
    games.push(new Game((games.length - 1), io, data.name, new RoomGraph(roomFileNames)))
    games[games.length - 1].addPlayer(new Player(1, socket))
  })
})
