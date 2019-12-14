import { useColorMode } from 'theme-ui'
import { Box, Container, Heading } from '@theme-ui/components'
import Meta from './meta'

export default ({
  centered = false,
  title,
  desc,
  img,
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
        pt: [4, null, null, null, 5],
        pb: [4, 5, null, null, 6],
        px: [2, 3],
        textAlign: centered && [null, 'center']
      }}
    >
      {includeMeta && <Meta title={title} description={desc} image={img} />}
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
              maxWidth: ['narrowplus', null, 'subcontainer', 'subwide'],
              mx: centered ? [null, 'auto'] : null
            }}
            children={desc}
          />
        )}
        {children}
      </Container>
    </Box>
  )
}
