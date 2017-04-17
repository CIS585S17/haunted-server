
var http = require('http')
var server = http.createServer()
var io = require('socket.io')(server)

var lookingForGame = []
var games = []
// let availableGames = []

const {Game} = require('./server/game')
const {Player} = require('./server/player')
const {RoomGraph} = require('./server/room')
const roomFileNames = require('./server/room-files.json')
// let graph = new RoomGraph(roomFileNames)

// Server starts listening on port 5000
server.listen('3000', () => {
  console.log('Listening at http://localhost:3000')
})

// Handles a player connection
io.on('connection', function (socket) {
  console.log('A user connected')
  function availableGames (game) {
    return games.available
    // if (game.available) {
      // return {
      //   gameIndex: game.gameIndex,
      //   name: game.name
      // }
    // }
  }
  for (let game of games) {
    console.log('start', game.available)
  }
  console.log(games.filter(availableGames))
  socket.emit('get-games', games.filter(availableGames))

  // Add event handlers
  socket.on('join', (data) => {
    games[data.gameIndex].addPlayer(new Player(2, socket))
    games[data.gameIndex].available = false
  })

  socket.on('host-game', (name) => {
    games.push(new Game(games.length, io, name, new RoomGraph(roomFileNames)))
    games[games.length - 1].addPlayer(new Player(1, socket))
    socket.emit('get-games', games.filter(availableGames))
    for (let game of games) {
      console.log('host', game.available)
    }
  })
})
