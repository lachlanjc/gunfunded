import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  Heading,
  Card,
  Button,
  Link as A
} from '@theme-ui/components'
import Profile from '../../components/profile'
import StateShape from '../../components/state-shape'
import Methodology from '../../components/profile-methodology.mdx'
import states from '../../data/states.json'
import { find, last } from 'lodash'

const Page = ({ profile }) => {
  const state = find(states, ['abbrev', profile.state.toUpperCase()])
  return (
    <Box as="main" sx={{ bg: 'background' }}>
      <Container sx={{ py: [3, 4] }}>
        <Profile data={profile} full />
        <Box as="section" sx={{ mt: [3, 4] }}>
          <Link
            href="/states/[state]"
            as={`/states/${state.abbrev.toLowerCase()}`}
          >
            <Card variant="nav">
              <StateShape
                id={profile.state.toUpperCase()}
                sx={{
                  width: 512,
                  position: 'absolute',
                  top: -16,
                  left: 0,
                  fill: 'sunken',
                  zIndex: 0
                }}
              />
              See all from {state.name}
            </Card>
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
          <Methodology components={{ link: A }} />
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
  const profile = await data.json()
  return { profile }
}

export default Page
