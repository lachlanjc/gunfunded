import fetch from 'isomorphic-unfetch'
import commaNumber from 'comma-number'
import Grouping from '../../components/grouping'
import Stat, { StatGrid } from '../../components/stat'
import states from '../../data/states.json'
import { find, last, sum, map, filter, round } from 'lodash'

const Page = ({ profiles, abbrev, stats }) => {
  const state = find(states, ['abbrev', abbrev.toUpperCase()])
  return (
    <Grouping
      title={state.name}
      desc={`All US Congress members from ${state.name}, sorted by gun money.`}
      profiles={profiles}
    >
      <StatGrid quad sx={{ mt: [2, 3], mb: [4, 5] }}>
        <Stat
          lg
          value={commaNumber(stats.total)}
          label="total gun rights money"
        />
        <Stat
          value={commaNumber(stats.avg)}
          unit="$"
          label="average funding"
          half
        />
        <Stat value={stats.percent} unit="%" label="gun-funded members" half />
      </StatGrid>
    </Grouping>
  )
}

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const abbrev = last(req.url.split('/')).toUpperCase()
  if (!map(states, 'abbrev').includes(abbrev)) return { statusCode: 404 }
  const api = await fetch(`${origin}/api/profiles?state=${abbrev}&order=rank`)
  const statusCode = api.ok ? 200 : 404
  const profiles = await api.json()
  const totals = map(profiles, 'gunRightsTotal')
  const funds = filter(totals, t => t > 0)
  const total = sum(totals)
  const avg = round(total / profiles.length)
  const percent = round(funds.length / totals.length) * 100
  const stats = { total, avg, percent }
  return { statusCode, profiles, abbrev, stats }
}

export default Page
