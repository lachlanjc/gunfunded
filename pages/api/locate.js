import records from '../../data/records.json'
import { orderBy, filter } from 'lodash'

export default (req, res) => {
  const {
    query: { state, role, gender, party }
  } = req
  let profiles = orderBy(records, 'id')
  res.json(profiles)
}
