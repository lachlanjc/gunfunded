import { Heading, Text, Box } from '@theme-ui/components'
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
    <Header title={title} desc={desc} centered={centeredHeader} children={header} />
    <Box as="article" variant="container" sx={{ py: 4, px: [2, 0] }}>
      {children}
      {profiles.map(profile => (
        <Profile data={profile} key={profile.id} />
      ))}
    </Box>
  </Box>
)

export default Grouping
