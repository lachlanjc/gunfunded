import fetch from 'isomorphic-unfetch'
import {
  Container,
  Box,
  Badge,
  Flex,
  Heading,
  Card,
  Text
} from '@theme-ui/components'
import Header from '../components/header'
import Stat, { StatGrid } from '../components/stat'
import commaNumber from 'comma-number'
import { capitalize, map, sum, groupBy, reverse } from 'lodash'

const Group = ({ id, pac, cycle, amount, type }) => (
  <Flex
    sx={{
      borderTop: '1px solid',
      borderColor: 'sunken',
      color: 'text',
      py: 2
    }}
  >
    <Box sx={{ mr: 'auto' }}>
      <Text sx={{ fontSize: 1, fontWeight: 'bold', my: 0 }}>{pac}</Text>
      <Badge
        variant="pill"
        as="span"
        sx={{
          fontSize: 0,
          fontWeight: 'normal',
          bg: type === 'control' ? 'dem' : 'repub',
          px: 2
        }}
      >
        Gun {capitalize(type)}
      </Badge>
    </Box>
    <Stat unit="$" value={commaNumber(amount)} />
  </Flex>
)

const Page = ({ cycles }) => (
  <Box as="main" sx={{ bg: 'background' }}>
    <Header
      title="PACs"
      desc="These are the top PACs giving money to Congress on gun issues."
    />
    <Container as="article" sx={{ py: [3, 4] }}>
      {Object.keys(cycles).map(year => (
        <Box
          as="section"
          key={year}
          sx={{ mb: [3, 4], borderBottom: '1px solid', borderColor: 'sunken' }}
        >
          <Heading as="h2" variant="heading" sx={{ color: 'accent', mb: 2 }}>
            {year}
          </Heading>
          {cycles[year].map(group => (
            <Group key={group.id} {...group} />
          ))}
        </Box>
      ))}
    </Container>
  </Box>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/groups`)
  const groups = await data.json()
  const cycles = groupBy(groups, 'cycle')
  // const totals = map(profiles, 'amount')
  // const stats = {
  //   total: sum(totals)
  // }
  return { cycles }
}

export default Page
