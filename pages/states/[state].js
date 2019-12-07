import fetch from 'isomorphic-unfetch'
import { Box, Heading, Card } from '@theme-ui/components'
import commaNumber from 'comma-number'
import Grouping, { ProfileGrouping } from '../../components/grouping'
import Breakdown from '../../components/breakdown'
import Stat, { StatGrid } from '../../components/stat'
import Search from '../../components/search'
import states from '../../data/states.json'
import { find, last, sum, map, filter, round } from 'lodash'

const Page = ({ profiles, abbrev, stats }) => {
  const state = find(states, ['abbrev', abbrev.toUpperCase()])
  const sens = filter(profiles, ['role', 'sen'])
  const reps = filter(profiles, ['role', 'rep'])
  return (
    <Grouping
      centered
      title={state.name}
      desc={`All US Congress members from ${state.name}, sorted by gun money.`}
      profiles={reps}
      footer={
        <Card
          sx={{
            textAlign: 'left',
            'input, a': { bg: 'sunken', boxShadow: 'none' },
            a: { display: 'block', textDecoration: 'none' }
          }}
        >
          <Heading as="h2" variant="headline" sx={{ mt: 0 }}>
            Find your Representative
          </Heading>
          <Search />
        </Card>
      }
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
      <Heading as="h2" variant="headline">
        Senators
      </Heading>
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <ProfileGrouping profiles={sens} />
      </Box>
      <Heading as="h2" variant="headline" sx={{ mt: 4 }}>
        Representatives
      </Heading>
    </Grouping>
  )
}

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const url = typeof window === 'undefined' ? req.url : window.location.href
  const abbrev = last(url.split('/')).toUpperCase()
  if (!map(states, 'abbrev').includes(abbrev)) return { statusCode: 404 }

  const api = await fetch(`${origin}/api/profiles?state=${abbrev}&order=rank`)
  const statusCode = api.ok ? 200 : 404
  const profiles = await api.json()
  const count = profiles.length

  const totals = map(profiles, 'gunRightsTotal')
  const funds = filter(totals, t => t > 0)
  const total = sum(totals)
  const avg = round(total / count)
  const p = (a, b) => round((a / b) * 100)
  const percent = p(funds.length, count)

  const profilesMale = filter(profiles, ['gender', 'M'])
  const male = p(profilesMale.length, count)
  const fundedMale = p(
    filter(profilesMale, n => n.gunRightsTotal > 0).length,
    funds.length
  ) || 0

  const profilesRep = filter(profiles, ['party', 'Republican'])
  const rep = p(profilesRep.length, count)
  const fundedRep = p(
    filter(profilesRep, n => n.gunRightsTotal > 0).length,
    funds.length
  ) || 0

  const stats = { total, avg, percent, male, fundedMale, rep, fundedRep }

  return { statusCode, profiles, abbrev, stats }
}

export default Page
