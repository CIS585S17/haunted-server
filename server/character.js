'use strict'
// var roster = require('./charStats.json')


class Character {
  constructor (id, powerStats, speedStats, sanityStats) {
    this.available = true
    this.id = id
    this.powerStats = powerStats
    this.speedStats = speedStats
    this.sanityStats = sanityStats
  }

  getPowerStat (index) {
    return this.powerStats[this.powIndex]
  }

  getSpeedStat (index) {
    return this.speedStats[this.spdIndex]
  }

  getSanityStat (index) {
    return this.sanityStats[this.sanIndex]
  }
}


class CharacterBuilder {
  constructor (roster) {
    this.roster = roster
    this.characters = []
    this.loadCharacters()
  }

  addCharacter (id) {
    let character = this.characters.find((element) => {
      return element.id === id
    })
    character.available = true
  }

  loadCharacters () {
    for (let character of this.roster) {
      this.characters.push(new Character(
        character.id,
        character.powerStats,
        character.speedStats,
        character.sanityStats
      ))
    }
  }

  removeCharacter (id) {
    let index = this.characters.findIndex((element) => {
      return element.id === id
    })
    this.characters.splice(index, 1)
    // let character = this.characters.find((element) => {
    //   return element.id === id
    // })
    // character.available = false
  }
}

module.exports = {
  CharacterBuilder: CharacterBuilder
}
