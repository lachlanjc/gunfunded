const neatCsv = require('neat-csv')
const writeJsonFile = require('write-json-file')
const _ = require('lodash')
const records = require('./records.json')
const groups = require('./groups.json')
const fs = require('fs')
const rawLobbying = fs.readFileSync('./data/raw/lobbying.csv')

const getStats = () => ({
  gunRightsTotal: _.sum(_.map(records, 'gunRightsTotal')),
  gunControlTotal: _.sum(_.map(records, 'gunControlTotal')),
  unRightsCount: _.filter(records, ['gunRightsTotal', 0]).length
})

const getProfiles = () => ({
  sample: _.find(records, ['id', 'VA-sen-1']),
  highestRights: _.last(_.sortBy(records, 'net')),
  highestRightsDem: _.first(
    _.sortBy(_.filter(records, ['party', 'Democrat'], 'net'))
  ),
  highestRightsDirect: _.last(_.sortBy(records, 'gunRightsDirect')),
  highestControl: _.last(_.orderBy(records, 'gunControlTotal'))
})
const getLobbying = () => _.reverse(neatCsv(rawLobbying))

const getData = () =>
  Promise.all([getLobbying(), getProfiles(), getStats()])
    .catch(() => {
      console.error('🚨 ERROR')
    })
    .then(([lobbying, profiles, stats]) => ({ stats, profiles, lobbying }))
const save = data => {
  writeJsonFile('./data/about.json', data).then(() => {
    console.log(`✅ Saved`)
  })
}
getData().then(data => save(data))
