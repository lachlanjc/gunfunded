import { useColorMode } from 'theme-ui'
import { Box, Container, Heading } from '@theme-ui/components'
import Meta from './meta'

export default ({
  centered = false,
  title,
  desc,
  children,
  includeMeta = false,
  ...props
}) => {
  const [mode] = useColorMode()
  return (
    <Box
      as="header"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
        pt: 4,
        pb: [4, 5],
        px: [2, 3],
        textAlign: centered && 'center'
      }}
    >
      {includeMeta && <Meta title={title} description={desc} />}
      <Container>
        <Heading
          as="h1"
          variant="title"
          sx={{ color: mode === 'dark' ? 'red' : 'white' }}
          children={title}
        />
        {desc && (
          <Heading
            as="h2"
            variant="subtitle"
            sx={{
              mt: 3,
              color: 'snow',
              maxWidth: 576,
              mx: centered ? 'auto' : null
            }}
            children={desc}
          />
        )}
        {children}
      </Container>
    </Box>
  )
}
