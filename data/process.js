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
  // let flag
  // flag = p.name.last.split(' ').length > 1

  // This is seriously battle-tested
  const record = _.find(congressData, c => {
    // Yes, this line has a regex for last names starting with both "de" & "des"
    const ln = a =>
      _.lowerCase(_.last(_.split(_.deburr(a), ' '))).replace(
        /de(s?)\s+/,
        'de$1'
      )
    const rLastName = ln(c.name.split(',')[0]).replace("'", '’')
    const pLastName = ln(p.name.last)
    const state = c.id.substring(0, 2)
    // if (flag && p.state === state)
    //   console.log(pLastName === rLastName, pLastName, rLastName)
    return pLastName === rLastName && p.state === state
  })

  const fields = _.mapValues(_.pick(record, congressFields), _.toNumber)
  const gunRightsTotal = _.sum([
    fields.gunRightsDirect,
    fields.gunRightsSupport,
    fields.gunControlOpposition
  ])
  const gunControlTotal = _.sum([
    fields.gunControlDirect,
    fields.gunControlSupport,
    fields.gunRightsOpposition
  ])
  const fundingType =
    fields.gunRightsTotal < fields.gunControlTotal ? 'control' : 'rights'
  const net = gunRightsTotal - gunControlTotal

  const result = {
    ...p,
    ...fields,
    gunRightsTotal,
    gunControlTotal,
    net,
    fundingType
  }

  // let flag = !(gunRightsTotal >= 0)
  // if (flag) console.log('Issue!', result)

  return result
}

const setRank = (p, i) => {
  p.rank = i + 1
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
    .then(profiles => _.orderBy(profiles, ['net'], ['desc']))
    .then(profiles => _.map(profiles, (p, i) => setRank(p, i)))
    .then(data => writeJsonFile('./data/records.json', data, { indent: '' }))
})
