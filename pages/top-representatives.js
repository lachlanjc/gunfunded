import fetch from 'isomorphic-unfetch'
import Grouping from '../components/grouping'
import Stat, { StatGrid } from '../components/stat'
import commaNumber from 'comma-number'
import { map, sum } from 'lodash'

const Page = ({ profiles, stats }) => (
  <Grouping
    title="Top US Representatives"
    desc="Top 25 Representatives in the US Congress, ranked by their gun lobby funding."
    profiles={profiles}
  >
    <StatGrid sx={{ mt: [2, 3], mb: [4, 5] }}>
      <Stat
        lg
        value={commaNumber(stats.total)}
        label="total in gun rights money"
      />
    </StatGrid>
  </Grouping>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?role=rep&limit=25`)
  const profiles = await data.json()
  const totals = map(profiles, 'gunRightsTotal')
  const stats = {
    total: sum(totals)
  }
  return { profiles, stats }
}

export default Page
