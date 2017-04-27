'use strict'
var roster = require('./charStats.json')

class Character {
  constructor (id) {
    this.id = id
    this.powerStats = roster[id].powerStats
    this.speedStats = roster[id].speedStats
    this.sanityStats = roster[id].sanityStats
  }

  getPowerStat(index) {
    return this.powerStats[this.powIndex]
  }

  getSpeedStat(index) {
    return this.speedStats[this.spdIndex]
  }

  getSanityStat(index) {
    return this.sanityStats[this.sanIndex]
  }
}