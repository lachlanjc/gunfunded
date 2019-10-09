const fs = require('fs')
const _ = require('lodash')
const neatCsv = require('neat-csv')
const writeJsonFile = require('write-json-file')

const csv = fs.readFileSync('./data/raw/outside-by-cycle.csv')

neatCsv(csv)
  .then(groups =>
    _.map(groups, group => {
      group.amount = _.toNumber(group.total)
      if (group.gunControl > group.gunRights) {
        group.type = 'control'
      } else {
        group.type = 'rights'
      }
      delete group.gunRights
      delete group.gunControl
      delete group.total
      return group
    })
  )
  .then(groups => _.filter(groups, group => group.amount > 0))
  .then(data => writeJsonFile('./data/groups.json', data, { indent: '' }))
