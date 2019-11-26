import { useColorMode } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'

export default ({ title, desc, children, ...props }) => {
  const [mode] = useColorMode()
  return (
    <Box
      as="header"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
          pt: 4,
        pb: [4, 5],
        px: 2,
        textAlign: 'center'
      }}
    >
      <Heading
        as="h1"
        sx={{
          my: 0,
          color: mode === 'dark' ? 'red' : 'white',
          fontSize: [5, 6]
        }}
        children={title}
      />
      {desc && (
        <Heading
          as="h2"
          sx={{ mt: [2, 3], color: 'snow', fontWeight: 'body' }}
          children={desc}
        />
      )}
      {children}
    </Box>
  )
}
