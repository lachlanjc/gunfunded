import {
  Flex,
  Card,
  Box,
  Heading,
  Image,
  Text,
  Link as A,
  IconButton,
  Button
} from '@theme-ui/components'
import Router from 'next/router'
import Stat, { StatGrid } from '../components/stat'
import Link from 'next/link'
import {
  Phone as PhoneIcon,
  Edit as FormIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  ChevronsRight,
  Share
} from 'react-feather'

import commaNumber from 'comma-number'

const getYear = date => date.slice(0, 4)

const avatarUrl = id =>
  `https://lachlanjc.me/congress-images/congress/225x275/${id}.jpg`

const Badge = ({ party, sx, ...props }) => (
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
      borderRadius: 12,
      ...sx
    }}
    title={party}
    children={party.slice(0, 1)}
    {...props}
  />
)

const Item = ({ label, color, ...props }) => {
  const Icon = {
    Call: PhoneIcon,
    Contact: FormIcon,
    Twitter: TwitterIcon,
    Facebook: FacebookIcon,
    Instagram: InstagramIcon
  }[label]
  return (
    <A
      sx={{
        color: color || label.toLowerCase(),
        pl: [3, 4],
        lineHeight: 0
      }}
      title={label}
      target="_blank"
      {...props}
    >
      <Icon />
    </A>
  )
}

const tel = num => `tel:` + num.match(/\d+/g).join('')

const Contact = ({ phone, form, twitter, facebook, instagram }) => (
  <div onClick={e => e.preventDefault()}>
    {phone && (
      <Item
        href={tel(phone)}
        label="Call"
        icon="notification"
        color="red"
        title={`Call ${phone}`}
      />
    )}
    {form && <Item href={form} label="Contact" color="orange" />}
    {twitter && (
      <Item href={`https://twitter.com/${twitter}`} label="Twitter" />
    )}
    {facebook && (
      <Item href={`https://facebook.com/${facebook}`} label="Facebook" />
    )}
    {instagram && (
      <Item href={`https://instagram.com/${instagram}`} label="Instagram" />
    )}
  </div>
)

const onClick = id => Router.push(`/profiles/${id}`)

const buttonOnClick = () => alert('Coming soon')

const Profile = ({ label, data, full = false, sx = {} }) => (
  <Card
    as="section"
    sx={{ p: [3, 4], textAlign: 'left', ...sx }}
    onClick={e => !full && onClick(data.id)}
  >
    {label && (
      <Text
        variant="caps"
        sx={{ color: 'green', fontWeight: 'bold', mb: [2, 3] }}
        children={label}
      />
    )}
    <Flex as="header" sx={{ alignItems: 'center' }}>
      <Box sx={{ position: 'relative', flexShrink: '0', mr: 3 }}>
        <Badge
          party={data.party}
          sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
        <Image
          src={avatarUrl(data.ids.bioguide)}
          variant="avatar"
          sx={{
            width: [64, 72],
            height: [64, 72]
          }}
        />
      </Box>
      <Box sx={{ mr: 'auto', textAlign: 'left' }}>
        <Heading as="h2" variant="headline" sx={{ color: 'text', my: 0 }}>
          {data.role === 'sen' ? 'Sen.' : 'Rep.'} {data.name.full}
        </Heading>
        <Text sx={{ color: 'muted', fontSize: [1, 2] }}>
          {data.role === 'rep' ? data.id : data.state}
          {', current term '}
          {getYear(data.termStart)}–{getYear(data.termEnd)}
        </Text>
      </Box>
      {!full && (
        <IconButton
          sx={{
            color: data.party.toLowerCase().slice(0, 3),
            border: '2px solid currentColor',
            borderRadius: 18,
            width: 36,
            height: 36,
            flexShrink: '0',
            ml: 3
          }}
        >
          <ChevronsRight size={24} />
        </IconButton>
      )}
    </Flex>
    <StatGrid as="article" quad={full} sx={{ mb: full ? [3, 4] : 0 }}>
      <Stat
        value={commaNumber(data.gunRightsTotal)}
        label="from gun rights"
        lg
      />
      {full ? (
        <>
          <Stat
            value={commaNumber(data.gunRightsSupport)}
            label="rights support"
            half
          />
          <Stat
            value={commaNumber(data.gunRightsOpposed)}
            label="rights opposition"
            half
          />
          <Stat
            value={commaNumber(data.gunControlTotal)}
            label="from gun control"
            lg
          />
          <Stat
            value={commaNumber(data.gunControlSupport)}
            label="control support"
            half
          />
          <Stat
            value={commaNumber(data.gunControlOpposed)}
            label="control opposition"
            half
          />
          <Stat value={commaNumber(data.net)} label="net gun funding" lg />
          <Stat
            value={data.rank}
            unit="#"
            of="539"
            label="rank in Congress"
            lg
          />
        </>
      ) : (
        <Stat
          value={data.rank}
          unit="#"
          of="539"
          label="gun-funded in Congress"
          lg
        />
      )}
    </StatGrid>
    {full && (
      <Flex as="footer" sx={{ alignItems: 'center' }}>
        <Button onClick={buttonOnClick} variant="primary" sx={{ mr: 'auto' }}>
          <Share size={24} />
          Share
        </Button>
        <Contact id={data.id} {...data.contact} />
      </Flex>
    )}
  </Card>
)

export default Profile
