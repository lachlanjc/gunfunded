import { Badge, Box, Flex, Grid, Heading, Text } from 'theme-ui'
import Breakdown from '../components/breakdown'
import Stat from '../components/stat'
import commaNumber from 'comma-number'
import { capitalize } from 'lodash'

export const Group = ({ id, pac, cycle, amount, type, ...props }) => (
  <Flex
    as="section"
    {...props}
    sx={{
      flexDirection: ['column', 'row'],
      borderTop: '1px solid',
      borderColor: 'border',
      color: 'text',
      py: 2,
      cursor: props.onClick && 'pointer'
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

export const CycleStats = ({
  total,
  rightsTotal,
  controlTotal,
  totalLabel = 'total funding',
  ...props
}) => (
  <Grid
    as="aside"
    gap={[2, null, 3, 4]}
    columns={[null, 2]}
    {...props}
    sx={{ alignItems: 'end', ...props.sx }}
  >
    <Stat
      value={commaNumber(total)}
      label={totalLabel}
      sx={{
        justifySelf: [null, null, null, 'end']
      }}
    />
    {rightsTotal + controlTotal > 0 ? (
      <Breakdown
        segments={[
          {
            color: 'rep',
            value: rightsTotal / total,
            label: 'rights'
          },
          {
            color: 'dem',
            value: controlTotal / total,
            label: 'control'
          }
        ]}
      />
    ) : (
      <Breakdown
        segments={[
          {
            color: 'sunken',
            value: 0.5,
            label: 'rights'
          },
          {
            color: 'sunken',
            value: 0.5,
            label: 'control'
          }
        ]}
      />
    )}
  </Grid>
)

export const CycleHeader = ({ cycle }) => (
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
    <CycleStats {...cycle.stats} />
  </Box>
)
