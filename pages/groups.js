import fetch from 'isomorphic-unfetch'
import { Box, Badge, Flex, Heading, Card, Text } from '@theme-ui/components'
import Header from '../components/header'
import Stat, { StatGrid } from '../components/stat'
import commaNumber from 'comma-number'
import { capitalize, map, sum } from 'lodash'

const Group = ({ id, pac, cycle, amount, type }) => (
  <Flex
    sx={{
      borderBottom: '1px solid',
      borderColor: 'sunken',
      color: 'text',
      py: 2
    }}
  >
    <Text
      sx={{
        fontSize: 1,
        fontWeight: 'bold',
        my: 0,
        color: 'muted',
        transform: 'rotate(180deg)',
        writingMode: 'tb'
      }}
    >
      {cycle}
    </Text>
    <Box sx={{ ml: [2, 3], mr: 'auto' }}>
      <Text sx={{ fontSize: 1, fontWeight: 'bold', my: 0 }}>{pac}</Text>
      <Badge
        variant="pill"
        as="span"
        sx={{
          fontSize: 0,
          fontWeight: 'normal',
          bg: type === 'control' ? 'dem' : 'repub',
            px: 2
          // textTransform: 'uppercase'
        }}
      >
        Gun {capitalize(type)}
      </Badge>
    </Box>
    <Stat unit="$" value={commaNumber(amount)} />
  </Flex>
)

const Page = ({ groups }) => (
  <Box as="main" sx={{ bg: 'background' }}>
    <Header
      title="PACs"
      desc="These are the top PACs giving money to Congress on gun issues."
    />
    <Box as="article" variant="container" sx={{ py: [3, 4] }}>
      {groups.map(group => (
        <Group key={group.id} {...group} />
      ))}
    </Box>
  </Box>
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/groups`)
  const groups = await data.json()
  console.log(groups)
  // const totals = map(profiles, 'amount')
  // const stats = {
  //   total: sum(totals)
  // }
  return { groups }
}

export default Page
