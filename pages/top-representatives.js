import fetch from '../lib/fetch'
import Grouping from '../components/grouping'
import Stat, { StatGrid } from '../components/stat'
import commaNumber from 'comma-number'
import { map, filter, sum, round } from 'lodash'

const Page = ({ profiles, stats }) => (
  <Grouping
    title="Top U.S. Representatives"
    desc="The top 25 Representatives in U.S. Congress, ranked by their gun lobby funding."
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
        sx={{
          'circle:first-of-type': { opacity: '1 !important', stroke: 'blue' }
        }}
      />
      <Stat value={stats.male * 100} unit="%" label="male" />
    </StatGrid>
  </Grouping>
)

Page.getInitialProps = async ({ req }) => {
  const profiles = await fetch(req, '/profiles?role=rep&limit=25')
  if (profiles.length !== 25) return { statusCode: 422 }
  const total = sum(map(profiles, 'gunRightsDirect'))
  const avg = round(total / profiles.length)
  const repub =
    filter(profiles, ['party', 'Republican']).length / profiles.length
  const male = filter(profiles, ['gender', 'M']).length / profiles.length
  const stats = { total, avg, repub, male }
  return { profiles, stats }
}

export default Page
