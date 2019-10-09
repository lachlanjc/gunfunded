import fetch from 'isomorphic-unfetch'
import toNumber from 'lodash/toNumber'
import round from 'lodash/round'

export default (req, res) =>
  fetch('http://www.hqcasanova.com/co2/?callback=callback')
    .then(data => data.text())
    .then(txt => {
      const match = txt.match(/callback\((.*)\)/)
      if (!match) throw new Error('Invalid JSONP response')
      return JSON.parse(match[1])
    })
    .then(json => ({
      now: round(toNumber(json['0'])),
      one: round(toNumber(json['1'])),
      ten: round(toNumber(json['10'])),
      date: json.date,
      delta: json.delta
    }))
    .then(json => res.json(json))
    .catch(error => {
      console.error(error)
    })
