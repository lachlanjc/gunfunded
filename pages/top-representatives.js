import loadJsonFile from 'load-json-file'
import Grouping from '../components/grouping'
import Stat, { StatGrid } from '../components/stat'
import commaNumber from 'comma-number'
import { map, filter, sum, round, orderBy } from 'lodash'

const Page = ({ profiles, stats }) => (
  <Grouping
    title="Top U.S. Representatives"
    desc="The top 30 Representatives in U.S. Congress, ranked by their gun lobby funding."
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

export async function getStaticProps() {
  let profiles = await loadJsonFile('./data/records.json')
  profiles = orderBy(
    filter(profiles, ['role', 'rep']),
    'gunRightsTotal',
    'desc'
  ).slice(0, 30)
  const total = sum(map(profiles, 'gunRightsTotal'))
  const avg = round(total / profiles.length)
  const repub = round(
    filter(profiles, ['party', 'Republican']).length / profiles.length
  )
  const male = round(filter(profiles, ['gender', 'M']).length / profiles.length)
  const stats = { total, avg, repub, male }
  return {
    props: { profiles, stats }
  }
}

export default Page
