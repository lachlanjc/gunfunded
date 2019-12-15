const fs = require('fs')
const _ = require('lodash')
const neatCsv = require('neat-csv')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')

const congressDataCsv = fs.readFileSync('./data/raw/career-congress.csv')
const congressFields = 'gunRightsDirect,gunRightsSupport,gunRightsOpposed,gunControlDirect,gunControlSupport,gunControlOpposed,net,rank'.split(
  ','
)

const process = (profile, congressData) => {
  // const flag = profile.name.last === 'Schultz'
  const record = _.find(congressData, c => {
    const lastName = c.name.split(',')[0].replace("'", '’')
    const state = c.id.substring(0, 2)
    return _.deburr(profile.name.last) === lastName && profile.state === state
  })
  // if (flag) console.log('Flag!', profile, record)

  const fields = _.mapValues(_.pick(record, congressFields), _.toNumber)
  fields.gunRightsTotal = _.sum([fields.gunRightsDirect, fields.gunRightsSupport, fields.gunControlOpposition])
  fields.gunControlTotal = _.sum([fields.gunControlDirect, fields.gunControlSupport, fields.gunRightsOpposition])
  fields.fundingType = fields.gunRightsTotal < fields.gunControlTotal ? 'control' : 'rights'

  return {
    ...profile,
    ...fields
  }
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
    .then(data => writeJsonFile('./data/records.json', data, { indent: '' }))
})
