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
            'input, section': { bg: 'sunken', boxShadow: 'none' }
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
        <Breakdown
          sx={{ maxWidth: 256 }}
          segments={[
            {
              color: 'rep',
              value: stats.rep,
              label: 'total Republicans vs Democrats'
            },
            {
              color: 'dem',
              value: stats.dem
            }
          ]}
        />
        <Breakdown
          sx={{ maxWidth: 256 }}
          segments={[
            {
              color: 'rep',
              value: stats.fundedRep,
              label: 'funded Republicans vs Democrats'
            },
            {
              color: 'dem',
              value: stats.fundedDem
            }
          ]}
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
  const avg = round(total / profiles.length)
  const percent = round(funds.length / count) * 100

  const profilesRep = filter(profiles, ['party', 'Republican'])
  const profilesDem = filter(profiles, ['party', 'Democrat'])
  const rep = profilesRep.length / count
  const dem = profilesDem.length / count
  const fundedRep =
    filter(profilesRep, p => p.gunRightsTotal > 0).length / totals.length
  const fundedDem =
    filter(profilesDem, p => p.gunRightsTotal > 0).length / totals.length

  const stats = { total, avg, percent, rep, dem, fundedRep, fundedDem }

  return { statusCode, profiles, abbrev, stats }
}

export default Page
