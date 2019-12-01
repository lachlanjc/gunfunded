import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { Box, Heading, Card, Button, Link as A } from '@theme-ui/components'
import Profile from '../../components/profile'
import Methodology from '../../components/profile-methodology.mdx'
import states from '../../data/states.json'
import { find, last } from 'lodash'

const Page = ({ profile }) => {
  const state = find(states, ['abbrev', profile.state.toUpperCase()])
  return (
    <Box as="main" sx={{ bg: 'background' }}>
      <Box as="article" variant="container" sx={{ py: [3, 4] }}>
        <Profile data={profile} full />
        <Link
          href="/states/[state]"
          as={`/states/${state.abbrev.toLowerCase()}`}
        >
          <Button>See all from {state.name}</Button>
        </Link>
        <Card
          sx={{
            mt: [3, 4],
            'p:first-of-type': { mt: 0 },
            'p:last-of-type': { mb: 0 },
            a: { color: 'accent' }
          }}
        >
          <Methodology components={{ link: A }} />
        </Card>
      </Box>
    </Box>
  )
}

Page.getInitialProps = async ({ req }) => {
  const id = last(req.url.split('/')).toUpperCase()
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?id=${id}`)
  const profile = await data.json()
  return { profile }
}

export default Page
