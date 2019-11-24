import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { Box, Heading, Button } from '@theme-ui/components'
import Profile from '../../components/profile'
import states from '../../data/states.json'
import { find, last } from 'lodash'

const Page = ({ profile }) => {
  const state = find(states, ['abbrev', profile.state.toUpperCase()])
  return (
  <Box as="main" sx={{ bg: 'background' }}>
    {/* <Box
      as="header"
      sx={{
        bg: 'red',
        color: 'white',
        py: [4, 5],
        px: 2,
        textAlign: 'center'
      }}
    >
      <Heading as="h1" sx={{ fontSize: [5, 6] }}>
        Heading
      </Heading>
    </Box> */}
    <Box as="article" variant="container" sx={{ py: [3, 4] }}>
      <Profile data={profile} />
      <Link href="/states/[state]" as={`/states/${state.abbrev.toLowerCase()}`}>
        <Button>See all from {state.name}</Button>
      </Link>
    </Box>
  </Box>
)}

Page.getInitialProps = async ({ req }) => {
  const id = last(req.url.split('/')).toUpperCase()
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles?id=${id}`)
  const profile = await data.json()
  return { profile }
}

export default Page
