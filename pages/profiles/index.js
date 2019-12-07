import fetch from 'isomorphic-unfetch'
import commaNumber from 'comma-number'
import Grouping from '../../components/grouping'
import Stat, { StatGrid } from '../../components/stat'
import { find, last, sum, map, filter, round } from 'lodash'

const Page = ({ profiles, abbrev, stats }) => (
  <Grouping
    title="All Members of&nbsp;Congress"
    desc={`All US Congress members, sorted by gun money.`}
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

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?order=rank`)
  const profiles = await data.json()
  const totals = map(profiles, 'gunRightsTotal')
  const stats = {
    total: sum(totals),
    percent: round((filter(totals, t => t > 0).length / totals.length) * 100)
  }
  return { profiles, stats }
}

export default Page
