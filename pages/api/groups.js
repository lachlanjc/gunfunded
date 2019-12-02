import records from '../../data/groups.json'
import { orderBy, reverse, filter, capitalize, sum, map, groupBy } from 'lodash'

const getTotal = records => sum(map(records, 'amount'))

export default (req, res) => {
  // const {  } = req.query
  let groups = reverse(orderBy(records, ['cycle', 'amount']))
  // if (role) {
  //   profiles = filter(profiles, ['role', role.toLowerCase()])
  // }
  // if (party) {
  //   profiles = filter(profiles, ['party', capitalize(party)])
  // }
  // if (state) {
  //   profiles = filter(profiles, ['state', state.toUpperCase()])
  // }
  let cycles = groupBy(groups, 'cycle')
  cycles = Object.keys(cycles).map(cycle => {
    const groups = cycles[cycle]
    const rightsGroups = filter(groups, ['type', 'rights'])
    const controlGroups = filter(groups, ['type', 'control'])
    const stats = {
      total: getTotal(groups),
      rightsTotal: getTotal(rightsGroups),
      controlTotal: getTotal(controlGroups)
    }
    return { year: cycle, groups, stats }
  })
  // const totals = map(groups, 'amount')
  res.json(reverse(cycles))
}
