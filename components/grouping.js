import { Heading, Text, Box, Container } from '@theme-ui/components'
import Head from 'next/head'
import Header from './header'
import Profile from './profile'

const Grouping = ({
  title = 'Gun Funded',
  desc = '',
  profiles = [],
  centeredHeader,
  header,
  children
}) => (
  <Box as="main" sx={{ bg: 'background' }}>
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>
    <Header
      title={title}
      desc={desc}
      centered={centeredHeader}
      children={header}
    />
    {children && (
      <Container as="section" sx={{ pt: [3, 4] }}>
        {children}
      </Container>
    )}
    <Container
      as="article"
      sx={{
        maxWidth: ['container', null, null, 'wide'],
        display: 'grid',
        gridTemplateColumns: ['auto', null, null, 'repeat(2, 1fr)'],
        gridGap: [3, 4]
      }}
    >
      {profiles.map(profile => (
        <Profile data={profile} key={profile.id} />
      ))}
    </Container>
  </Box>
)

export default Grouping
