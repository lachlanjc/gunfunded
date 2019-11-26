import { Box, Donut, Flex, Text } from '@theme-ui/components'
import { isEmpty } from 'lodash'

export const StatGrid = props => (
  <Box
    {...props}
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: 3,
      alignItems: 'flex-end',
      mt: [3, 4],
      mb: [3, 4],
      ...props.sx
    }}
  />
)

export default ({
  value,
  label,
  unit = '$',
  of,
  reversed = false,
  lg = false,
  ...props
}) => (
  <Flex
    {...props}
    sx={{
      flexDirection: reversed ? 'column-reverse' : 'column',
      gridColumn: lg ? ['span 2', 'initial'] : 'initial',
      lineHeight: 1,
      ...props.sx
    }}
  >
    <Flex
      sx={{
        flexDirection: unit === '%' ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        justifyContent: unit === '%' ? 'flex-end' : 'flex-start',
        my: 2,
        position: 'relative'
      }}
    >
      {!isEmpty(unit) && (
        <Text
          as="sup"
          sx={{
            fontSize: lg ? [2, 3] : [1, 2],
            color: 'secondary',
            position: [null, null, unit === '%' ? null : 'absolute'],
            left: [null, null, -3],
            ml: [null, unit === '%' ? 1 : null],
            mr: [null, 1],
            pt: [null, 1]
          }}
          children={unit}
        />
      )}
      <Text
        as="span"
        sx={{
          color: 'text',
          fontSize: lg ? [4, 5] : 4,
          fontWeight: 'stat',
          my: 0
        }}
        children={value}
      />
      {!isEmpty(of) && (
        <Text
          as="sup"
          sx={{
            fontSize: lg ? [2, 3] : [1, 2],
            color: 'muted',
            ml: [null, 1],
            pt: [null, 1],
            '::before': {
              content: '"/"'
            }
          }}
          children={of}
        />
      )}
      {unit === '%' && <Donut value={value / 100} size={lg ? 48 : 32} strokeWidth={lg ? 3 : 2} sx={{ mr: 2 }} />}
    </Flex>
    {!isEmpty(label) && (
      <Text
        as="span"
        variant="caps"
        sx={{ color: 'muted', fontSize: [0, 1], fontWeight: 'medium' }}
        children={label}
      />
    )}
  </Flex>
)
