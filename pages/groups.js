import fetch from 'isomorphic-unfetch'
import { Box, Flex, Heading, Text } from '@theme-ui/components'
import Stat, { StatGrid } from '../components/stat'
import commaNumber from 'comma-number'
import { map, sum } from 'lodash'

const Group = ({ id, pac, cycle, amount, type }) => (
  <Flex
    sx={{
      borderBottom: '1px solid',
      borderColor: 'smoke',
      justifyContent: 'space-between'
    }}
  >
    <Text sx={{ fontWeight: 'bold', my: 0 }}>{pac}</Text>
    <Stat>{commaNumber(amount)}</Stat>
  </Flex>
)

const Page = ({ groups }) => (
  <Box as="main" sx={{ bg: 'background' }}>
    <Box
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
        PACs
      </Heading>
      <Text as="h2" sx={{ mt: [2, 3], fontWeight: 'body' }}>
        These are the top PACs giving money to Congress on gun issues.
      </Text>
    </Box>
    <Box as="article" variant="container" sx={{ py: [3, 4] }}>
      {children}
      {profiles.map(profile => (
        <Profile data={profile} key={profile.id} />
      ))}
    </Box>
    <StatGrid sx={{ mt: [2, 3], mb: [4, 5] }}>
      <Stat
        lg
        value={commaNumber(stats.total)}
        label="total in gun rights money"
      />
    </StatGrid>
  </Box>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/groups`)
  const groups = await data.json()
  // const totals = map(profiles, 'amount')
  // const stats = {
  //   total: sum(totals)
  // }
  return { groups }
}

export default Page
