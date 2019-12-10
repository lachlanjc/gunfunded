import records from '../../data/records.json'
import { find } from 'lodash'
import fetch from 'isomorphic-unfetch'

export default (req, res) => {
  const { address } = req.query
  const payload = {
    key: 'AIzaSyAC098ZQK-jP_Q5fRpG_0of9LCTvOtdEFA',
    address,
    fields: 'divisions,officials',
    includeOffices: true.toString()
  }
  const query = Object.keys(payload)
    .map(key => [key, payload[key]].map(encodeURIComponent).join('='))
    .join('&')
  const keyMatch = key =>
    key.match(
      /ocd-division\/country:us\/(?:state|district):(\w+)(?:\/cd:)(\d+)/
    )
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?${query}`
  fetch(url)
    .then(civic => civic.json())
    .then(civic => {
      const divKey = find(Object.keys(civic.divisions), keyMatch)
      const record = civic.divisions[divKey]
      if (typeof record === 'undefined') {
        res.status(422).json({ error: 'Invalid address' })
        return
      }
      const rep = civic.officials[record.officeIndices[0] + 1]
      const state = keyMatch(divKey)[1]
        .toString()
        .toUpperCase()
      let dist = keyMatch(divKey)[2].toString()
      if (dist.length === 1) dist = `0${dist}`
      const id = `${state}-${dist}`
      const result = find(records, ['id', id])
      console.log(divKey, state, dist, id, result)
      res.json(result || rep)
    })
    .catch(e => {
      console.error(e)
      res.status(500).json({ error: 'Something went wrong' })
    })
}
