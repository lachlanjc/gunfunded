import records from '../../data/groups.json'
import { orderBy, filter, capitalize } from 'lodash'

export default (req, res) => {
  // const {  } = req.query
  let profiles = orderBy(records, ['cycle', 'amount'])
  // if (role) {
  //   profiles = filter(profiles, ['role', role.toLowerCase()])
  // }
  // if (party) {
  //   profiles = filter(profiles, ['party', capitalize(party)])
  // }
  // if (state) {
  //   profiles = filter(profiles, ['state', state.toUpperCase()])
  // }
  // if (gender) {
  //   profiles = filter(profiles, ['gender', gender.toUpperCase()])
  // }
  res.json(profiles)
}
