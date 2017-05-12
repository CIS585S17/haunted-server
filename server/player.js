"use strict"

// module.exports = exports = Player;

// function Player(id, socket) {
//     this.id = id;
//     this.Tag = '<span style="color: royalblue">Player ' + id + '</span>';
//     this.socket = socket;

//     this.send = {
//         id: this.id
//     };
// }

// Player.prototype.update = function () {
//     this.send = {
//         id: this.id
//     };
// }

class Player {
  constructor (id, socket) {
      this.id = id
      this.currRoomIndex = 0
      this.prevRoomIndex = -1
    this.socket = socket
    this.tag = `<span style="color: royalblue">Player ${this.id}</span>`
    this.character = undefined
    this.inventory = []
    this.powIndex = 3
    this.spdIndex = 3
    this.sanIndex = 3
  }

  joinGame () {}

  setCharacter (character) {
    this.character = character
  }

  update () {
    // Update stats of current player
  }

  incrementPowStat () {

  }

  incrementSpdStat () {

  }

  incrementSanStat () {

  }

  decrementPowStat () {

  }

  decrementSpdStat () {

  }

  decrementSanStat () {

  }
}


module.exports = {
  Player: Player
}

