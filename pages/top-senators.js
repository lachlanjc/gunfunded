import fetch from 'isomorphic-unfetch'
import Grouping from '../components/grouping'
import Stat, { StatGrid } from '../components/stat'
import commaNumber from 'comma-number'
import { map, filter, sum, round } from 'lodash'

const Page = ({ profiles, stats }) => (
  <Grouping
    title="Top US Senators"
    desc="The top 25 Senators in the U.S. Congress, ranked by their gun lobby funding."
    profiles={profiles}
  >
    <StatGrid sx={{ mt: [2, 3], mb: [4, 5] }}>
      <Stat
        lg
        value={commaNumber(stats.total)}
        label="total gun rights money"
      />
      <Stat
        lg
        value={commaNumber(stats.avg)}
        unit="$"
        label="average funding"
      />
      <Stat
        value={stats.repub * 100}
        unit="%"
        label="Republican"
      />
      <Stat
        value={stats.male * 100}
        unit="%"
        label="male"
      />
    </StatGrid>
  </Grouping>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?role=sen&limit=25`)
  const profiles = await data.json()
  const total = sum(map(profiles, 'gunRightsTotal'))
  const avg = round(total / profiles.length)
  const repub = filter(profiles, ['party', 'Republican']).length / profiles.length
  const male = filter(profiles, ['gender', 'M']).length / profiles.length
  const stats = { total, avg, repub, male }
  return { profiles, stats }
}

export default Page
