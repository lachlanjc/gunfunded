import useSWR from 'swr'
import Link from 'next/link'
import { Box, Container, Heading, Card, Button } from '@theme-ui/components'
import Meta from '../../components/meta'
import Profile from '../../components/profile'
import Methodology from '../../components/profile-methodology.mdx'
import states from '../../data/states.json'
import { find, last } from 'lodash'

const Page = ({ profile }) => {
  const state = find(states, ['abbrev', profile.state.toUpperCase()])
  return (
    <Box as="main" sx={{ bg: 'background' }}>
      <Meta
        title={`${profile.role === 'sen' ? 'Sen.' : 'Rep.'} ${
          profile.name.full
        }`}
        description={`View ${
          profile.role === 'sen' ? 'Senator' : 'Representative'
        } ${profile.name.full} of ${
          state.name
        }’s gun lobby funding on Gun Funded.`}
      />
      <Container sx={{ py: [3, 4] }}>
        <Profile data={profile} full />
        <Box as="section" sx={{ mt: [3, 4] }}>
          <Link
            href="/states/[state]"
            as={`/states/${state.abbrev.toLowerCase()}`}
          >
            <Card variant="nav">See all from {state.name}</Card>
          </Link>
        </Box>
        <Card
          variant="sunken"
          sx={{
            color: 'secondary',
            mt: [3, 4],
            a: { color: 'accent' },
            'p:last-of-type': { mb: 0 }
          }}
        >
          <Methodology />
        </Card>
      </Container>
    </Box>
  )
}

Page.getInitialProps = async ({ req }) => {
  const id = last(
    (req ? req.url : window.location.pathname).split('/')
  ).toUpperCase()
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?id=${id}`)
  if (data.ok) {
    const profile = await data.json()
    return { profile }
  } else {
    return { statusCode: 404 }
  }
}

export default Page
