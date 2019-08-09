import React from 'react'
import { Box } from 'rebass'
import Icon from '@hackclub/icons'

export default ({ sx, ...props }) => (
  <Box sx={sx}>
    <Icon {...props} />
  </Box>
)
