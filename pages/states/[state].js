import { Box, Heading, Card } from '@theme-ui/components'
import commaNumber from 'comma-number'
import Link from 'next/link'
import Map from 'react-usa-map'
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
  const partyKey = `circle:${stats.party === 'Democrat' ? 'last' : 'first'}-of-type`
  const partyValue = { opacity: '1 !important', stroke: 'dem' }
  return (
    <Grouping
      centered
      title={state.name}
      desc={`All U.S. Congress members from ${state.name}, sorted by gun money.`}
      profiles={reps}
      footer={[
        <Card
          key="search"
          sx={{
            textAlign: 'left',
            'input, a': { bg: 'sunken', boxShadow: 'none' }
          }}
        >
          <Heading as="h2" variant="headline" sx={{ mt: 0 }}>
            Find your Representative
          </Heading>
          <Search />
        </Card>,
        <Link href="/states" passHref key="states">
          <Card
            variant="nav"
            as="a"
            sx={{
              fontSize: [2, 3],
              py: 3,
              svg: {
                fill: 'sunken',
                mb: [2, 3]
              }
            }}
          >
            <Map width={256} height={128} />
            Other States
          </Card>
        </Link>
      ]}
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
          label={`total are ${stats.party}`}
          half
          sx={{ [partyKey]: partyValue }}
        />
        <Stat
          value={stats.fundedRep}
          unit="%"
          label={`funded are ${stats.party}`}
          half
          sx={{ [partyKey]: partyValue }}
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
  stats.party = 'Republican'
  const dem = stats.rep < 50 && stats.fundedRep < 50
  if (dem) {
    stats.party = 'Democrat'
    stats.rep = 100 - stats.rep
    stats.fundedRep = 100 - stats.fundedRep
  }
  return { profiles, abbrev, stats }
}

export default Page
