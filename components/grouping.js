import { Heading, Text, Box } from '@theme-ui/components'
import Head from 'next/head'
import Profile from '../components/profile'

const Grouping = ({
  title = 'Gun Funded',
  desc = '',
  profiles = [],
  header,
  children
}) => (
  <Box as="main" sx={{ bg: 'background' }}>
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>
    <Box
      as="header"
      sx={{
        bg: 'red',
        color: 'white',
        py: [4, 5],
        px: 2,
        textAlign: 'center'
      }}
    >
      <Heading as="h1" sx={{ fontSize: [5, 6] }}>
        {title}
      </Heading>
      {desc && (
        <Text as="h2" sx={{ mt: [2, 3], fontWeight: 'body' }}>
          {desc}
        </Text>
      )}
      {header}
    </Box>
    <Box as="article" variant="container" sx={{ py: [3, 4] }}>
      {children}
      {profiles.map(profile => (
        <Profile data={profile} key={profile.id} />
      ))}
    </Box>
  </Box>
)

export default Grouping
