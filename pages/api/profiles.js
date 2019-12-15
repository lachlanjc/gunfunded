import records from '../../data/records.json'
import { find, orderBy, filter, capitalize, slice } from 'lodash'

export default (req, res) => {
  const { id, role, party, state, gender, order = 'rank', limit } = req.query
  if (id) {
    const profile = find(records, r => r.id.toLowerCase() === id.toLowerCase())
    if (profile) {
      return res.json(profile)
    } else {
      return res.status(422).json({ error: 'Profile not found' })
    }
  }
  let profiles = orderBy(records, order)
  if (role) {
    profiles = filter(profiles, ['role', role.toLowerCase()])
  }
  if (party) {
    profiles = filter(profiles, ['party', capitalize(party)])
  }
  if (state) {
    profiles = filter(profiles, ['state', state.toUpperCase()])
  }
  if (gender) {
    profiles = filter(profiles, ['gender', gender.toUpperCase()])
  }
  if (limit) {
    profiles = slice(profiles, 0, limit)
  }
  res.json(profiles)
}
