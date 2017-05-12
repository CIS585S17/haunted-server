
const http = require('http')
const server = http.createServer()
const io = require('socket.io')(server)
const {Game} = require('./server/game')
const {Player} = require('./server/player')
const {RoomGraph} = require('./server/room')
const {CharacterBuilder} = require('./server/character')
const {ItemBuilder} = require('./server/item')
const roomFileNames = require('./server/room-files.json')
const roster = require('./server/charStats.json')
const itemList = require('./server/itemList.json')



// var lookingForGame = []
let games = []
// let availableGames = []



// Server starts listening on port 5000
server.listen((process.env.PORT || 5000), () => {
  console.log('Listening at https://haunted-server.herokuapp.com')
})

// Handles a player connection
io.on('connection', function (socket) {
  function UserException (message) {
    this.message = message
    this.name = 'UserException'
  }

  /**
   * Function to get the current available games.
   * @return The array of available games.
   */
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

  /**
   * Socket Event to handle server errors.
   *
   * @param {Error} error The error thrown from server
   */
  socket.on('error', (error) => {
    console.log(error)
  })

  /**
   * Socket Event to handle request to get the list
   * of available games.
   */
  socket.on('get', (msg) => {
    let avGames = getGames()
    socket.emit('get-games', avGames)
  })

  /**
   * Socket Event to handle request to host/start a new game
   * instance.
   *
   * @param {string} name The name of the game the player wants to join.
   * @param {function} callback Error if game name already in use for a game instance.
   */
  socket.on('host-game', (name, callback) => {
    let game = games.find((element) => {
      return element.name === name
    })
    if (game) {
      callback(new UserException('Name is already in use! Please try again.'))
    } else {
      callback(null)
      games.push(new Game(
        new CharacterBuilder(roster),
        games.length,
        io,
        new ItemBuilder(itemList),
        name,
        new RoomGraph(roomFileNames)
      ))
      games[games.length - 1].addPlayer(new Player(1, socket))
    }
  })

  /**
   * Socket Event to handle request to join a game.
   *
   * @param {integer} id The identification number of game instance to join.
   */
  socket.on('join', (id) => {
    let game = games.find((element) => {
      return element.id === id
    })
    game.addPlayer(new Player(2, socket))
    game.available = false
    // game.startGame()
  })

  socket.on('start', (id) => {
    let game = games.find((element) => {
      return element.id === id
    })
    game.startGame()
  })

  // /**
  //  * Socket Event to handle request to exit the game instance.
  //  *
  //  * @param {integer} id The identification number of the game to leave
  //  */
  // socket.on('quit-game', (id) => {
  //   let index = games.findIndex((element) => {
  //     return element.id === id
  //   })
  //   games.splice(index, 1)
  // })

  // socket.on('select-character', (gameId, characterId) => {
  //   let game = games.find((element) => {
  //     return element.id === gameId
  //   })
  //   game.selectCharacter(characterId)
  // })
})
