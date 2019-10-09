import records from '../../data/records.json'
import { orderBy, filter, capitalize, slice } from 'lodash'

export default (req, res) => {
  const { role, party, state, gender, order = 'rank', limit } = req.query
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
  // profiles = filter(profiles, ['district', 53])
  // profiles = map(
  //   filter(
  //     profiles,
  //     p => p.role !== 'sen' //&& typeof p.district === 'undefined'
  //   ),
  //   'district'
  // ).sort()

  // profiles = filter(profiles, p => typeof p.gunRightsTotal !== 'number')
  res.json(profiles)
}
