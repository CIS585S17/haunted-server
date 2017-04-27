
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
  constructor (id, io, name, roomGraph) {
    this.id = id
    this.io = io
    this.name = name
    this.roomGraph = roomGraph
    this.players = []
    this.chatLog = []
    this.updateChat = false
    this.available = true
  }

  addPlayer (player) {
    this.players.push(player)
  }

  startGame () {
    for (let player of this.players) {
      // join the game
      player.socket.join(this.id)

      // Handle chat messages sent by players
      player.socket.on('newChatMsg', (msg) => {
        this.io.to(this.id).emit('updateChatLog', `${player.tag} : ${msg}`)
      })
    }
    this.io.to(this.id).emit('start-game', true)
  }
}

module.exports = {
  Game: Game
}
