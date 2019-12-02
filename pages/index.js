import fetch from 'isomorphic-unfetch'
import Grouping from '../components/grouping'
import Search from '../components/search'
import Link from 'next/link'
import Map from 'react-usa-map'
import { Card, Link as A, Flex, Grid, Heading } from '@theme-ui/components'

const Page = ({ profiles }) => (
  <Grouping
    title="Gun Funded"
    desc={
      <>
        In progress, fall 2019, by{' '}
        <A href="https://lachlanjc.me" sx={{ color: 'inherit' }}>
          @lachlanjc
        </A>
      </>
    }
    profiles={profiles}
    centeredHeader
  >
    <Heading as="h2" variant="headline">
      Find your Representative
    </Heading>
    <Search />
    <Heading as="h2" variant="headline" sx={{ mt: 4 }}>
      Explore
    </Heading>
    <Grid gap={3} columns={[1, 2, 4]}>
      <Link href="/states">
        <Card
          variant="nav"
          sx={{
            gridColumn: [null, null, 'span 2'],
            fontSize: [2, 3, 4],
            svg: {
              fill: 'sunken',
              mr: [2, 3]
            }
          }}
        >
          <Map width={256} height={128} />
          Explore States
        </Card>
      </Link>
      <Link href="/groups">
        <Card
          variant="nav"
          sx={{
            gridColumn: [null, null, 'span 2'],
            fontSize: [2, 3, 4]
          }}
        >
          Explore PACs
        </Card>
      </Link>
      <Link href="/top-senators">
        <Card variant="nav">Top Senators</Card>
      </Link>
      <Link href="/top-representatives">
        <Card variant="nav">Top Reps</Card>
      </Link>
      <Link href="/profiles">
        <Card variant="nav">All Congress</Card>
      </Link>
      <Link href="/search">
        <Card variant="nav">Search</Card>
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
