import records from '../../data/groups.json'
import { orderBy, reverse, filter, sum, map, groupBy } from 'lodash'

const getTotal = records => sum(map(records, 'amount'))

export default (req, res) => {
  let groups = reverse(orderBy(records, ['cycle', 'amount']))
  let cycles = groupBy(groups, 'cycle')
  cycles = Object.keys(cycles).map(cycle => {
    const groups = cycles[cycle]
    const rightsGroups = filter(groups, ['type', 'rights'])
    rightsGroups.map(g => {
      if (g.pac === 'National Rifle Assn') g.pac = 'NRA'
      return g
    })
    const controlGroups = filter(groups, ['type', 'control'])
    const stats = {
      total: getTotal(groups),
      rightsTotal: getTotal(rightsGroups),
      controlTotal: getTotal(controlGroups)
    }
    return { year: cycle, groups, stats }
  })
  res.json(reverse(cycles))
}
