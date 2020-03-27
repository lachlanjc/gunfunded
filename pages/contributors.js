import { useEffect, useRef, useState } from 'react'
import { Box, Card, Container, Divider, Grid, Input, Label } from 'theme-ui'
import Meta from '../components/meta'
import Header from '../components/header'
import { Group, CycleHeader, CycleStats } from '../components/cycle'
import useFocusable from '../lib/use-focusable'
import loadJsonFile from 'load-json-file'
import { orderBy, reverse, filter, sum, map, groupBy, flatten } from 'lodash'

const Page = ({ cycles }) => {
  const [jump, setJump] = useState('')
  const [list, setList] = useState(cycles)
  const [stats, setStats] = useState({
    total: null,
    rightsTotal: null,
    controlTotal: null
  })

  const onChange = e =>
    setJump(e.target.value.toString().match(/[A-Za-z\s]+/g) || '')
  const onGroupClick = e => setJump(e.currentTarget.getAttribute('data-filter'))

  const calculateStats = src => {
    const getTotal = g => sum(map(g, 'amount'))
    const groups =
      src.length > 0
        ? src
        : [
            { amount: 0, type: 'rights' },
            { amount: 0, type: 'control' }
          ]
    const total = getTotal(groups)
    const rightsTotal = getTotal(filter(groups, ['type', 'rights']))
    const controlTotal = getTotal(filter(groups, ['type', 'control']))
    return { total, rightsTotal, controlTotal }
  }
  useEffect(() => {
    const groups = flatten(map(list, 'groups'))
    setStats(calculateStats(groups))
  }, [list])

  useEffect(() => {
    if (jump.toString().length > 0) {
      const j = jump.toString().toLowerCase()
      let nextCycles = JSON.parse(JSON.stringify(cycles))
      nextCycles = map(nextCycles, c => {
        c.groups = filter(c.groups, g => g.pac.toLowerCase().includes(j))
        c.stats = calculateStats(c.groups)
        return c
      })
      nextCycles = filter(nextCycles, c => c.groups.length > 0)
      setList(nextCycles)
    } else {
      setList(cycles)
    }
  }, [jump])

  const input = useRef(null)
  useFocusable(input)

  return (
    <Box as="main" sx={{ bg: 'background' }}>
      <Meta
        title="Top Gun Money PACs"
        description="Explore the top gun lobby and gun control PACs giving money to U.S. Congress every year."
      />
      <Header
        title="Contributors"
        desc="These are the top PAC groups giving money to Congress on gun issues."
      />
      <Container as="article" sx={{ py: [3, 4] }}>
        <Grid
          as="header"
          gap={[2, null, 3, 4]}
          sx={{
            alignItems: 'end',
            gridTemplateColumns: [null, null, '1fr auto']
          }}
        >
          <div>
            <Label htmlFor="filter">Filter list</Label>
            <Input
              type="search"
              name="filter"
              placeholder="NRA"
              onChange={onChange}
              value={jump}
              ref={input}
            />
          </div>
          <CycleStats {...stats} totalLabel="total funding since 2010" />
        </Grid>
        <Divider sx={{ mt: [4, 5], mb: [3, 4] }} />
        {list.map(cycle => (
          <Box
            as="section"
            key={cycle.year}
            sx={{
              mt: [3, 4],
              borderBottom: '1px solid',
              borderColor: 'border'
            }}
          >
            <CycleHeader cycle={cycle} />
            {cycle.groups.map(group => (
              <Group
                key={group.id}
                data-filter={group.pac}
                onClick={onGroupClick}
                {...group}
              />
            ))}
          </Box>
        ))}
        {list.length === 0 && (
          <Card variant="error" sx={{ mt: [3, 4] }}>
            No results found
          </Card>
        )}
      </Container>
    </Box>
  )
}

export async function getStaticProps() {
  const getTotal = records => sum(map(records, 'amount'))

  const records = await loadJsonFile('./data/groups.json')
  let groups = reverse(orderBy(records, ['cycle', 'amount']))
  let cycles = groupBy(groups, 'cycle')
  cycles = Object.keys(cycles).map(cycle => {
    const groups = cycles[cycle]
    const rightsGroups = filter(groups, ['type', 'rights'])
    rightsGroups.map(g => {
      if (g.pac === 'National Rifle Assn') g.pac = 'NRA'
      return g
    })
    const controlGroups = filter(groups, ['type', 'control'])
    const stats = {
      total: getTotal(groups),
      rightsTotal: getTotal(rightsGroups),
      controlTotal: getTotal(controlGroups)
    }
    return { year: cycle, groups, stats }
  })

  return { props: { cycles: reverse(cycles) } }
}

export default Page
