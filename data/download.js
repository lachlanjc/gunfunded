const { map, find, last, isEmpty, pick } = require('lodash')
const fetch = require('isomorphic-unfetch')
const writeJsonFile = require('write-json-file')

const USIO = 'https://theunitedstates.io/congress-legislators'

const getProfiles = () =>
  fetch(`${USIO}/legislators-current.json`)
    .then(res => res.json())
    .then(data => {
      console.log('🛬 downloaded main list')
      // writeJsonFile('./data/legislators.json', data)
      return data
    })
const getAccounts = () =>
  fetch(`${USIO}/legislators-social-media.json`)
    .then(res => res.json())
    .then(data => {
      console.log('🍭 downloaded social media')
      // writeJsonFile('./data/social.json', data)
      return data
    })
const findAccount = (profile, accounts) =>
  find(accounts, ['id.bioguide', profile.id.bioguide])
const sens = {}
const makeId = term => {
  if (term.type === 'rep') {
    let { district } = term
    if (district.toString().length === 1) district = `0${district}`
    return `${term.state}-${district}`
  } else if (term.type === 'sen') {
    sens[term.state] = (sens[term.state] || 0) + 1
    return `${term.state}-sen-${sens[term.state]}`
  }
}
const processProfile = (profile, account) => {
  const term = last(profile.terms)
  return {
    id: makeId(term),
    name: {
      first: profile.name.first,
      last: profile.name.last,
      full: profile.name.official_full
    },
    role: term.type,
    gender: profile.bio.gender,
    ...pick(term, ['party', 'state', 'district']),
    termStart: term.start,
    termEnd: term.end,
    ids: pick(profile.id, ['opensecrets', 'bioguide']),
    contact: {
      form: term.contact_form,
      phone: term.phone,
      url: term.url,
      ...(!isEmpty(account) &&
        pick(account.social, ['twitter', 'instagram', 'facebook']))
    }
  }
}
const getData = () =>
  Promise.all([getProfiles(), getAccounts()])
    .catch(() => {
      console.error('🚨 ERROR GETTING PEOPLE')
    })
    .then(([profiles, accounts]) =>
      map(profiles, p => processProfile(p, findAccount(p, accounts)))
    )
const save = data => {
  writeJsonFile('./data/people.json', data).then(() => {
    console.log(`\n✅ Saved ${data.length} people`)
  })
}
getData().then(data => save(data))
