import fetch from 'isomorphic-unfetch'
import Grouping from '../components/grouping'
import Search from '../components/search'
import Link from 'next/link'
import Map from 'react-usa-map'
import { Box, Card, Link as A, Flex, Grid, Heading } from '@theme-ui/components'
import { Briefcase, Users, Search as SearchIcon } from 'react-feather'

const Page = ({ profiles }) => (
  <Grouping
    title="Gun&nbsp;Funded"
    desc="See & understand the gun lobby’s funding of the U.S. Congress."
    profiles={profiles}
    centered
    sx={{ h2: { textAlign: ['left', 'center'] } }}
  >
    <Heading as="h2" variant="headline">
      Find your Representative
    </Heading>
    <Search />
    <Heading as="h2" variant="headline" sx={{ mt: 4 }}>
      Explore
    </Heading>
    <Grid
      gap={3}
      columns={[2, 6]}
      sx={{ textAlign: 'left' }}
    >
      <Link href="/states" passHref>
        <Card
          variant="nav"
          as="a"
          sx={{
            gridColumn: ['span 2', null, 'span 3'],
            fontSize: [2, 3, 4],
            py: 3,
            svg: {
              fill: 'sunken',
              mb: [2, 3]
            }
          }}
        >
          <Map width={256} height={128} />
          Explore States
        </Card>
      </Link>
      <Link href="/groups" passHref>
        <Card
          variant="nav"
          as="a"
          sx={{
            gridColumn: [null, null, 'span 3'],
            fontSize: [2, 3, 4],
            svg: {
              stroke: 'orange',
              width: [48, 64],
              height: [48, 64]
            }
          }}
        >
          <Briefcase />
          Explore PACs
        </Card>
      </Link>
      <Link href="/top-senators" passHref>
        <Card variant="nav" as="a" sx={{ gridColumn: [null, null, 'span 2'] }}>
          Top US{' '}
          <br />
          Senators
        </Card>
      </Link>
      <Link href="/top-representatives" passHref>
        <Card variant="nav" as="a" sx={{ gridColumn: [null, null, 'span 2'] }}>
          Top US{' '}
          <br />
          Reps
        </Card>
      </Link>
      <Link href="/profiles" passHref>
        <Card
          variant="nav"
          as="a"
          sx={{ gridColumn: [null, null, 'span 2'], svg: { stroke: 'green' } }}
        >
          <Users size={32} />
          All Members{' '}
          <br />
          of Congress
        </Card>
      </Link>
    </Grid>
    <Heading as="h2" variant="headline" sx={{ mt: 4, mb: [3, 4] }}>
      Top 6 gun-funded Congresspeople
    </Heading>
  </Grouping>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?limit=6`)
  const profiles = await data.json()
  return { profiles }
}

export default Page
