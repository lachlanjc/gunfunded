import states from '../../data/states.json'
import records from '../../data/records.json'
import { orderBy, sum, map, filter, round } from 'lodash'

export default (req, res) => {
  const { abbrev } = req.query
  if (!map(states, 'abbrev').includes(abbrev.toUpperCase())) {
    return res.status(422).json({ error: 'Valid abbrev required' })
  }
  const profiles = orderBy(
    filter(records, ['state', abbrev.toUpperCase()]),
    'rank'
  )
  const count = profiles.length

  const totals = map(profiles, 'gunRightsTotal')
  const funds = filter(totals, t => t > 0)
  const total = sum(totals)
  const avg = round(total / count)
  const p = (a, b) => round((a / b) * 100)
  const percent = p(funds.length, count)

  const profilesMale = filter(profiles, ['gender', 'M'])
  const male = p(profilesMale.length, count)
  const fundedMale =
    p(filter(profilesMale, ['fundingType', 'rights']).length, funds.length) || 0

  const profilesRep = filter(profiles, ['party', 'Republican'])
  const rep = p(profilesRep.length, count)
  const fundedRep =
    p(filter(profilesRep, ['fundingType', 'rights']).length, funds.length) || 0

  const stats = { total, avg, percent, male, fundedMale, rep, fundedRep }

  res.json({ abbrev, stats, profiles })
}
