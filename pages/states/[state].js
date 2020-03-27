import { Box, Heading, Card } from 'theme-ui'
import commaNumber from 'comma-number'
import Error from 'next/error'
import Link from 'next/link'
import Map from 'react-usa-map'
import Grouping, { ProfileGrouping } from '../../components/grouping'
import Stat, { StatGrid } from '../../components/stat'
import Search from '../../components/search'
import states from '../../data/states.json'
import loadJsonFile from 'load-json-file'
import { find, orderBy, sum, map, filter, round } from 'lodash'

const Page = ({ profiles, abbrev, stats }) => {
  if (!abbrev || !profiles || !stats) return <Error statusCode={404} />
  const state = find(states, ['abbrev', abbrev.toUpperCase()])
  const sens = filter(profiles, ['role', 'sen'])
  const reps = filter(profiles, ['role', 'rep'])
  const partyKey = `circle:${
    stats.party === 'Democrat' ? 'last' : 'first'
  }-of-type`
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

export async function getStaticPaths() {
  const paths = map(map(states, 'abbrev'), state => ({ params: { state } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const abbrev = params.state.toUpperCase()
  let profiles = await loadJsonFile('./data/records.json')
  profiles = orderBy(filter(profiles, ['state', abbrev]), 'net', 'desc')
  const count = profiles.length

  const totals = map(profiles, 'gunRightsTotal')
  const funds = filter(totals, t => t > 0)
  const total = sum(totals)
  const avg = round(total / count)
  const p = (a, b) => round((a / b) * 100)
  const percent = p(funds.length, count)

  const profilesMale = filter(profiles, ['gender', 'M'])
  const male = p(profilesMale.length, count)
  const fundedMale =
    p(filter(profilesMale, m => m.gunRightsTotal > 0).length, funds.length) || 0

  const profilesRep = filter(profiles, ['party', 'Republican'])
  let rep = p(profilesRep.length, count)
  let fundedRep =
    p(filter(profilesRep, r => r.gunRightsTotal > 0).length, funds.length) || 0
  let party = 'Republican'
  const dem = rep < 50 && fundedRep < 50
  if (dem) {
    party = 'Democrat'
    rep = 100 - rep
    fundedRep = 100 - fundedRep
  }

  const stats = { total, avg, percent, male, fundedMale, rep, fundedRep, party }

  return { props: { profiles, abbrev, stats } }
}

export default Page
