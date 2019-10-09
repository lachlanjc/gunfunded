import { Box, Flex, Text } from 'rebass'
import { isEmpty } from 'lodash'

export const StatGrid = props => (
  <Box
    {...props}
    sx={{
      display: 'grid',
      gridTemplateColumns: ['auto', 'repeat(2, 1fr)'],
      gridGap: 3,
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
  reversed = false,
  lg = false,
  ...props
}) => (
  <Flex
    {...props}
    sx={{
      flexDirection: reversed ? 'column-reverse' : 'column',
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
            color: 'slate',
            position: [null, unit === '%' ? null : 'absolute'],
            left: [null, -3],
            ml: [null, unit === '%' ? 1 : null],
            mr: [null, 1],
            pt: [null, 1]
          }}
          children={unit}
        />
      )}
      <Text
        as="span"
        sx={{ fontSize: lg ? [4, 5] : [3, 4], fontWeight: 'stat', my: 0 }}
        children={value}
      />
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