
'use strict'

// module.exports = exports = Game;

// const Player = require('./player.js');

const serverTag = '<span style="color: red"><b>Server </b></span>';

// function Game(io, sockets, room) {
//     this.io = io;
//     this.players = [];
//     this.room = room;
//     this.updateChat = false;

//     // Initialize players and chat
//     this.players.push(new Player(1, sockets[0]));
//     this.players.push(new Player(2, sockets[1]));

//     var game = this;
//     var chatLog = [];

//     this.players.forEach(function (player, i) {

//         // Join the room
//         player.socket.join(room);

//         // Handle chat messages sent by players
//         player.socket.on('newChatMsg', function (msg) {
//             io.to(room).emit('updateChatLog', (player.Tag + " : " + msg));
//         });
//     });

//     io.to(room).emit('updateChatLog', (serverTag + ": Game has begun!"));
//     console.log("The game has begun!")
// }

// Game.prototype.update = function()
// {

// }


class Game {
  constructor (characters, id, io, items, name, roomGraph) {
    this.characters = characters
    this.id = id
    this.io = io
    this.items = items
    this.name = name
    this.roomGraph = roomGraph
    this.players = []
    this.chatLog = []
    this.updateChat = false
    this.available = true
  }

  addPlayer (player) {
    this.players.push(player)
    player.socket.on('get-characters', (callback) => {
      // player.socket.emit('available-characters', this.characters.characters)
      callback(this.characters.characters)
    })
    // player.socket.on('select-character', (id, callback) => {
    //   player.setCharacter(id)
    //   this.characters.removeCharacter(id)
    //   callback(this.characters.characters)
    // })
    player.socket.on('select-character', (id, callback) => {
      // player.setCharacter(id)
      let selectedCharacter = this.characters.removeCharacter(id)
      player.setCharacter(selectedCharacter[0])
      callback(this.characters.characters, selectedCharacter[0])
    })
  }

  selectCharacters () {
    this.io.to(this.id).emit('selected-characters', this.characters.characters)
  }

  startGame () {
    for (let player of this.players) {
      // join the game
          player.socket.join(this.id)

      // Handle chat messages sent by players
          player.socket.on('newChatMsg', (msg) => {
              this.io.to(this.id).emit('updateChatLog', `${player.tag} : ${msg}`)
          })

      /**
      * Socket Event to handle requests for a player entering a different room
      */
          player.socket.on('room-request', (direction, callback)  => {
              console.log('hurr')
              for (var i = 0; i < this.roomGraph.rooms.length; i++) {                
                  // Check which door the user is planning on using
                  if (direction == 'forward' && i != player.prevRoomIndex) {
                      // Find a connecting room
                      for (var j = 0; j < this.roomGraph.rooms[i].length; j++) {
                          if (this.roomGraph.rooms[i].name == this.roomGraph.rooms[i].edges[j]){ 
                              player.prevRoomIndex = currRoomIndex
                              player.currRoomIndex = i
                              break
                          }
                      }
                      break
                  }
                  else if (i == player.prevRoomIndex) {
                      var ind = player.prevRoomIndex
                      player.prevRoomIndex = player.currRoomIndex
                      player.currRoomIndex = ind
                      
                      break
                  }
              }
              console.log(this.roomGraph.rooms[player.currRoomIndex].path)
              callback(this.roomGraph.rooms[player.currRoomIndex])
              //player.socket.emit('room-return', this.roomGraph.rooms[player.currRoomIndex])
          })
      }
      this.io.to(this.id).emit('start-game', true)
  }

}

module.exports = {
  Game: Game
}
