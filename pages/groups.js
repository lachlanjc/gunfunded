import fetch from 'isomorphic-unfetch'
import {
  Container,
  Box,
  Badge,
  Flex,
  Grid,
  Heading,
  Text
} from '@theme-ui/components'
import Header from '../components/header'
import Breakdown from '../components/breakdown'
import Stat from '../components/stat'
import commaNumber from 'comma-number'
import { capitalize } from 'lodash'

const Group = ({ id, pac, cycle, amount, type }) => (
  <Flex
    sx={{
      flexWrap: 'wrap',
      borderTop: '1px solid',
      borderColor: 'border',
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

const CycleHeader = ({ cycle }) => (
  <Box
    as="header"
    sx={{
      display: 'grid',
      gridRowGap: [2, null, 3],
      gridColumnGap: [3, null, 4],
      gridTemplateColumns: [null, null, '1fr auto'],
      alignItems: 'end',
      mb: [2, 3]
    }}
  >
    <Heading
      as="h2"
      variant="headline"
      sx={{
        color: 'text',
        fontSize: [5, 6],
        lineHeight: 1,
        mb: 0
      }}
    >
      {cycle.year}
    </Heading>
    <Grid gap={[2, null, 3, 4]} columns={[null, 2]} sx={{ alignItems: 'end' }}>
      <Stat
        value={commaNumber(cycle.stats.total)}
        label="total funding"
        sx={{
          justifySelf: [null, null, null, 'end']
        }}
      />
      <Breakdown
        segments={[
          {
            color: 'rep',
            value: cycle.stats.rightsTotal / cycle.stats.total,
            label: 'rights'
          },
          {
            color: 'dem',
            value: cycle.stats.controlTotal / cycle.stats.total,
            label: 'control'
          }
        ]}
      />
    </Grid>
  </Box>
)

const Page = ({ cycles }) => (
  <Box as="main" sx={{ bg: 'background' }}>
    <Header
      title="PACs"
      desc="These are the top PACs giving money to Congress on gun issues."
    />
    <Container as="article" sx={{ py: [3, 4] }}>
      {cycles.map(cycle => (
        <Box
          as="section"
          key={cycle.year}
          sx={{ mb: [3, 4], borderBottom: '1px solid', borderColor: 'border' }}
        >
          <CycleHeader cycle={cycle} />
          {cycle.groups.map(group => (
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
  const cycles = await data.json()
  return { cycles }
}

export default Page
