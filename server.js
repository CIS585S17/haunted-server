
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
server.listen(5000, () => {
  console.log('Listening at https://haunted-server.herokuapp.com')
})

// Handles a player connection
io.on('connection', function (socket) {
  console.log('A user connected')

  function getGames () {
    let avGames = []
    for (let game of games) {
      if (game.available) {
        avGames.push({
          id: game.id,
          available: game.available,
          name: game.name
        })
      }
    }
    return avGames
  }

  socket.on('get', (msg) => {
    console.log('getGames')
    let avGames = getGames()
    console.log(avGames)
    socket.emit('get-games', avGames)
  })

  // Add event handlers
  socket.on('join', (id) => {
    games[id].addPlayer(new Player(2, socket))
    games[id].available = false
    games[id].startGame()
  })

  socket.on('host-game', (name) => {
    games.push(new Game(games.length, io, name, new RoomGraph(roomFileNames)))
    games[games.length - 1].addPlayer(new Player(1, socket))
  })
})
