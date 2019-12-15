import commaNumber from 'comma-number'
import fetch from '../../lib/fetch'
import Grouping from '../../components/grouping'
import Stat, { StatGrid } from '../../components/stat'
import { sum, map, filter, round } from 'lodash'

const Page = ({ profiles, abbrev, stats }) => (
  <Grouping
    title="All Members of&nbsp;Congress"
    desc={`All members of the U.S. Congress, sorted by gun lobby funding.`}
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
      <Stat value={stats.male} unit="%" label="total are male" half />
      <Stat value={stats.fundedMale} unit="%" label="funded are male" half />
      <Stat
        value={stats.rep}
        unit="%"
        label="total are Republicans"
        half
        sx={{
          'circle:first-of-type': { opacity: '1 !important', stroke: 'blue' }
        }}
      />
      <Stat
        value={stats.fundedRep}
        unit="%"
        label="funded are Republicans"
        half
        sx={{
          'circle:first-of-type': { opacity: '1 !important', stroke: 'blue' }
        }}
      />
    </StatGrid>
  </Grouping>
)

Page.getInitialProps = async ({ req }) => {
  const profiles = await fetch(req, '/profiles?order=rank')
  const count = profiles.length
  if (count < 100) return { statusCode: 422 }

  const totals = map(profiles, 'gunRightsTotal')
  const funds = filter(totals, t => t > 0)
  const total = sum(totals)
  const avg = round(total / count)
  const p = (a, b) => round((a / b) * 100)
  const percent = p(funds.length, count)

  const profilesMale = filter(profiles, ['gender', 'M'])
  const male = p(profilesMale.length, count)
  const fundedMale = p(
    filter(profilesMale, ['fundingType', 'rights']).length,
    funds.length
  )

  const profilesRep = filter(profiles, ['party', 'Republican'])
  const rep = p(profilesRep.length, count)
  const fundedRep = p(
    filter(profilesRep, ['fundingType', 'rights']).length,
    funds.length
  )

  const stats = { total, avg, percent, male, fundedMale, rep, fundedRep }
  return { profiles, stats }
}

export default Page
