import {
  Flex,
  Card,
  Box,
  Heading,
  Image,
  Text,
  Link as A,
  Button
} from '@theme-ui/components'
import Stat, { StatGrid } from '../components/stat'
import Icon from '../components/icon'

import commaNumber from 'comma-number'

const getYear = date => date.slice(0, 4)

const avatarUrl = id =>
  `https://lachlanjc.me/congress-images/congress/225x275/${id}.jpg`

const Badge = ({ party, ...props }) => (
  <Box
    sx={{
      bg: party.toLowerCase().slice(0, 3),
      color: 'white',
      fontSize: 0,
      fontWeight: 'bold',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      lineHeight: 0,
      borderRadius: 12
    }}
    title={party}
    children={party.slice(0, 1)}
    {...props}
  />
)

const Item = ({ label, icon, color, ...props }) => (
  <A
    sx={{
      color: color || icon || label.toLowerCase(),
      ml: [2, 3],
      lineHeight: 0
    }}
    title={label}
    target="_blank"
    {...props}
  >
    <Icon glyph={icon || label.toLowerCase()} size={36} />
  </A>
)

const tel = num => `tel:` + num.match(/\d+/g).join('')
const Phone = ({ num }) => (
  <Item
    href={tel(num)}
    label="Call"
    icon="notification"
    color="red"
    title={`Call ${num}`}
  />
)

const Form = ({ url }) => (
  <Item href={url} label="Contact" icon="message" color="orange" />
)

const Twitter = ({ slug }) => (
  <Item href={`https://twitter.com/${slug}`} label="Twitter" />
)

const Facebook = ({ slug }) => (
  <Item href={`https://facebook.com/${slug}`} label="Facebook" />
)

const Instagram = ({ slug }) => (
  <Item href={`https://instagram.com/@${slug}`} label="Instagram" />
)

const Contact = ({ phone, form, twitter, facebook, instagram }) => (
  <Flex as="footer" sx={{ alignItems: 'center' }}>
    <Button
      as="a"
      href="#"
      sx={{ display: 'flex', alignItems: 'center', bg: 'red', mr: 'auto' }}
    >
      <Icon glyph="share" sx={{ mt: -1, mb: -2, ml: -1, mr: 2 }} />
      Share
    </Button>
    {phone && <Phone num={phone} />}
    {form && <Form url={form} />}
    {twitter && <Twitter slug={twitter} />}
    {facebook && <Facebook slug={facebook} />}
    {instagram && <Instagram slug={instagram} />}
  </Flex>
)

const Profile = ({ label, data, sx = {} }) => (
  <Card as="section" sx={{ p: [3, 4], mb: [3, 4], ...sx }}>
    {label && <Text variant="caps" sx={{ color: 'green', fontWeight: 'bold', mb: [2, 3] }} children={label} />}
    <Flex as="header" sx={{ alignItems: 'center', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <Badge party={data.party} />
      </Box>
      <Image
        src={avatarUrl(data.ids.bioguide)}
        variant="avatar"
        sx={{
          mr: 3,
          width: [64, 72],
          height: [64, 72]
        }}
      />
      <Box sx={{ align: 'left' }}>
        <Heading as="h2" sx={{ fontSize: [3, 4] }}>
          {data.role === 'sen' ? 'Sen.' : 'Rep.'} {data.name.full}
        </Heading>
        <Text sx={{ color: 'muted', fontSize: [1, 2] }}>
          {data.role === 'rep' ? data.id : data.state}
          {', current term '}
          {getYear(data.termStart)}–{getYear(data.termEnd)}
        </Text>
      </Box>
    </Flex>
    {/* 
    "gunRightsTotal": 26050,
  "gunRightsSupport": 1270,
  "gunRightsOpposed": 0,
  "gunControlTotal": 0,
  "gunControlSupport": 0,
  "gunControlOpposed": 861, */}
    <StatGrid as="article">
      <Stat
        value={commaNumber(data.gunRightsTotal)}
        label="from gun rights"
        lg
      />
      {/* <Stat
        value={commaNumber(data.gunControlTotal)}
        label="from gun control"
        lg
      />
      <Stat value={commaNumber(data.net)} label="net gun money" /> */}
      <Stat value={data.rank} unit="#" of="539" label="rank in Congress" lg />
    </StatGrid>
    <Contact {...data.contact} />
  </Card>
)

export default Profile
