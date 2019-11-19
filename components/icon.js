import React from 'react'
import { Box } from '@theme-ui/components'
import Icon from '@hackclub/icons'

export default ({ sx, ...props }) => (
  <Box sx={sx}>
    <Icon {...props} />
  </Box>
)
