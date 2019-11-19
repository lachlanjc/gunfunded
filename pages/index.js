import fetch from 'isomorphic-unfetch'
import Grouping from '../components/grouping'
import Link from 'next/link'
import { Link as A, Flex, Button } from '@theme-ui/components'

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
  />
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles`)
  const profiles = await data.json()
  return { profiles }
}

export default Page
