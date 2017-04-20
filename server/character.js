'use strict'
var roster = require('./charStats.json')

class Character {
  constructor (id) {
    this.id = id
    this.powerStats = roster[id].powerStats
    this.speedStats = roster[id].speedStats
    this.sanityStats = roster[id].sanityStats
    this.powIndex = 3
    this.spdIndex = 3
    this.sanIndex = 3
  }

  getPowerStat() {
    return this.powerStats[this.powIndex]
  }

  getSpeedStat() {
    return this.speedStats[this.spdIndex]
  }

  getSanityStat() {
    return this.sanityStats[this.sanIndex]
  }

  incrementPowStat() {}

  incrementSpdStat() {}

  incrementSanStat() {}

  decrementPowStat() {}

  decrementSpdStat() {}

  decrementSanStat() {}
}