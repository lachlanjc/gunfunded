import { Flex, Box, Text } from 'theme-ui'

const Breakdown = ({ segments, sx = {} }) => (
  <Flex sx={{ flexDirection: 'column', minWidth: 196, maxWidth: 208, ...sx }}>
    <Flex
      sx={{
        borderRadius: 12,
        alignItems: 'center',
        overflow: 'hidden',
        mb: 1
      }}
    >
      {segments.map(segment => (
        <Box
          sx={{
            bg: segment.color,
            color: 'inverseText',
            display: 'inline-block',
            width: segment.value * 100 + '%',
            height: 8
          }}
          key={segment.label}
        />
      ))}
    </Flex>
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {segments.map(segment => (
        <Text
          as="span"
          variant="caption"
          sx={{ fontSize: [0, 1] }}
          key={segment.label}
          children={segment.label}
        />
      ))}
    </Flex>
  </Flex>
)

export default Breakdown
