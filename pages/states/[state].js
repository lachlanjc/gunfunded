import { Box, Heading, Card } from '@theme-ui/components'
import commaNumber from 'comma-number'
import Grouping, { ProfileGrouping } from '../../components/grouping'
import Stat, { StatGrid } from '../../components/stat'
import Search from '../../components/search'
import states from '../../data/states.json'
import fetch from '../../lib/fetch'
import { find, map, filter } from 'lodash'

const Page = ({ profiles, abbrev, stats }) => {
  const state = find(states, ['abbrev', abbrev.toUpperCase()])
  const sens = filter(profiles, ['role', 'sen'])
  const reps = filter(profiles, ['role', 'rep'])
  return (
    <Grouping
      centered
      title={state.name}
      desc={`All U.S. Congress members from ${state.name}, sorted by gun money.`}
      profiles={reps}
      footer={
        <Card
          sx={{
            textAlign: 'left',
            'input, a': { bg: 'sunken', boxShadow: 'none' }
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

Page.getInitialProps = async ({ req, query }) => {
  const abbrev = query.state
  if (!map(states, 'abbrev').includes(abbrev.toUpperCase()))
    return { statusCode: 404 }
  const state = await fetch(req, `/state?abbrev=${abbrev}`)
  if (!state) return { statusCode: 422 }
  const { stats, profiles } = state
  return { profiles, abbrev, stats }
}

export default Page
