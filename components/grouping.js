import { Heading, Text, Box, Container } from '@theme-ui/components'
import Meta from './meta'
import Header from './header'
import Profile from './profile'

export const ProfileGrouping = ({ profiles = [], children, ...props }) => (
  <Container
    as="article"
    {...props}
    sx={{
      maxWidth: ['container', null, null, 'wide'],
      display: 'grid',
      gridTemplateColumns: ['auto', null, null, 'repeat(2, 1fr)'],
      gridGap: [3, 4],
      ...props.sx
    }}
  >
    {profiles.map(profile => (
      <Profile data={profile} key={profile.id} />
    ))}
    {children}
  </Container>
)

const Grouping = ({
  title = 'Gun Funded',
  desc = '',
  profiles = [],
  centered = false,
  header,
  footer,
  sx = {},
  children
}) => (
  <Box as="main" sx={{ bg: 'background', textAlign: centered && ['left', 'center'], ...sx }}>
    <Meta title={title} description={desc} />
    <Header
      title={title}
      desc={desc}
      centered={centered}
      children={header}
    />
    {children && (
      <Container as="section" sx={{ pt: [3, 4] }}>
        {children}
      </Container>
    )}
    <ProfileGrouping profiles={profiles} children={footer} />
  </Box>
)

export default Grouping
