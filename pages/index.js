import fetch from 'isomorphic-unfetch'
import Grouping from '../components/grouping'
import Search from '../components/search'
import Link from 'next/link'
import { Divider, Link as A, Flex, Heading, Button } from '@theme-ui/components'

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
    header={
      <Flex sx={{ justifyContent: 'center', mt: [3, 4] }}>
        <Link href="/states">
          <Button
            as="a"
            sx={{ bg: 'white', color: 'primary', cursor: 'pointer', mx: 3 }}
          >
            Explore States
          </Button>
        </Link>
        <Link href="/top-representatives">
          <Button
            as="a"
            sx={{ bg: 'white', color: 'primary', cursor: 'pointer', mx: 3 }}
          >
            Top Reps
          </Button>
        </Link>
      </Flex>
    }
  >
    <Heading as="h2" sx={{ fontSize: [3, 4], color: 'accent', mb: [2, 3] }}>Find your Representative</Heading>
    <Search />
    <Divider sx={{ mb: [3, 4] }} />
    <Heading as="h2" sx={{ fontSize: [3, 4], color: 'accent', mb: [2, 3] }}>Explore all profiles</Heading>
  </Grouping>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles`)
  const profiles = await data.json()
  return { profiles }
}

export default Page
