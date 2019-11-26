import { useColorMode } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'

export default ({ centered = false, title, desc, children, ...props }) => {
  const [mode] = useColorMode()
  return (
    <Box
      as="header"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
        pt: 4,
        pb: [4, 5],
        px: 2,
        textAlign: centered && 'center'
      }}
    >
      <Box variant="container">
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
            sx={{
              mt: [2, 3],
              color: 'snow',
              fontWeight: 'body',
              lineHeight: 'body',
              maxWidth: 'small',
              mx: centered && 'auto'
            }}
            children={desc}
          />
        )}
        {children}
      </Box>
    </Box>
  )
}
