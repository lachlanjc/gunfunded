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
      <StatGrid sx={{ mt: [2, 3], mb: [4, 5] }}>
        <Stat
          lg
          value={commaNumber(stats.total)}
          label="total in gun rights money"
        />
        <Stat lg value={stats.percent} unit="%" label="gun-funded members" />
      </StatGrid>
    </Grouping>
  )
}

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const abbrev = last(req.url.split('/')).toUpperCase()
  const data = await fetch(`${origin}/api/profiles?state=${abbrev}&order=rank`)
  const profiles = await data.json()
  const totals = map(profiles, 'gunRightsTotal')
  const stats = {
    total: sum(totals),
    percent: round((filter(totals, t => t > 0).length / totals.length) * 100)
  }
  return { profiles, abbrev, stats }
}

export default Page
