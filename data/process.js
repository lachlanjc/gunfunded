const fs = require('fs')
const _ = require('lodash')
const neatCsv = require('neat-csv')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')

const congressDataCsv = fs.readFileSync('./data/raw/career-congress.csv')
const congressFields = 'gunRightsDirect,gunRightsSupport,gunRightsOpposed,gunControlDirect,gunControlSupport,gunControlOpposed'.split(
  ','
)

const process = (p, congressData) => {
  // const flag = typeof p.name === 'undefined'
  // if (flag) console.log('Flag!', p)
  const record = _.find(congressData, c => {
    const lastName = c.name.split(',')[0].replace("'", '’')
    const state = c.id.substring(0, 2)
    return _.deburr(p.name.last) === lastName && p.state === state
  })

  const fields = _.mapValues(_.pick(record, congressFields), _.toNumber)
  const gunRightsTotal = _.sum([fields.gunRightsDirect, fields.gunRightsSupport, fields.gunControlOpposition])
  const gunControlTotal = _.sum([fields.gunControlDirect, fields.gunControlSupport, fields.gunRightsOpposition])
  const fundingType = fields.gunRightsTotal < fields.gunControlTotal ? 'control' : 'rights'
  const net = gunRightsTotal - gunControlTotal

  return {
    ...p,
    ...fields,
    gunRightsTotal,
    gunControlTotal,
    fundingType,
    net
  }
}

const setRank = (p, i) => {
  if (p.net) p.rank = i
  // console.log(p.name.full, '        ', p.net, ' ', i)
  return p
}

neatCsv(congressDataCsv).then(congressData => {
  loadJsonFile('./data/people.json')
    .then(profiles =>
      _.filter(
        profiles,
        p => !_.includes(['VI', 'AS', 'PR', 'GU', 'MP', 'DC'], p.state)
      )
    )
    .then(profiles => _.map(profiles, p => process(p, congressData)))
    .then(profiles => _.sortBy(profiles, 'net'))
    .then(profiles => _.reverse(profiles))
    .then(profiles => {
      // const offset = _.filter(profiles, p => p.net == null).length
      profiles = _.map(profiles, (p, i) => {
        // console.log(offset, typeof p.net !== 'undefined')
        if (typeof p.net !== 'undefined') p.rank = i - 8
        return p
      })
      // set = _.map(set, (p, i) => setRank(p, i + 1))
      return profiles
    })
    .then(data => writeJsonFile('./data/records.json', data, { indent: '' }))
})
