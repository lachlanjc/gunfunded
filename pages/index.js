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
            variant="inverted"
            sx={{ mx: 3 }}
          >
            Explore States
          </Button>
        </Link>
        <Link href="/top-representatives">
          <Button
            as="a"
            variant="inverted"
            sx={{ mx: 3 }}
          >
            Top Reps
          </Button>
        </Link>
      </Flex>
    }
  >
    <Heading as="h2" sx={{ fontSize: [3, 4], color: 'accent', mb: [2, 3] }}>
      Find your Representative
    </Heading>
    <Search />
    <Heading
      as="h2"
      sx={{ fontSize: [3, 4], color: 'accent', mb: [2, 3] }}
    >
      Top 5 gun-funded Congresspeople
    </Heading>
  </Grouping>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?limit=5`)
  const profiles = await data.json()
  return { profiles }
}

export default Page
