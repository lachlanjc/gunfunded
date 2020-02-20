import {
  Flex,
  Card,
  Box,
  Heading,
  Image,
  Text,
  Link as A,
  IconButton
} from 'theme-ui'
import { ChevronsRight } from 'react-feather'
import Stat, { StatGrid } from '../components/stat'
import Link from 'next/link'
import commaNumber from 'comma-number'

const getYear = date => date.slice(0, 4)
const avatarUrl = id => `https://avatars.gunfunded.com/${id}.jpg`

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

const Profile = ({ label, data, full = false, sx = {}, ...props }) => (
  <Card
    as={full ? 'article' : 'a'}
    sx={{ display: 'block', p: [3, 4], textAlign: 'left', ...sx }}
    {...props}
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
          alt={data.name.full}
          variant="avatar"
          loading="lazy"
          sx={{
            width: [64, 72],
            height: [64, 72]
          }}
        />
      </Box>
      <Box sx={{ mr: 'auto' }}>
        <Heading
          as="h2"
          variant="headline"
          sx={{ color: 'text', textAlign: 'left !important', mt: 0, mb: 0 }}
        >
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
          role="presentation"
          tabIndex="-1"
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
    <StatGrid as="article" quad={full} sx={{ mt: [2, 3], mb: 0 }}>
      {full ? (
        <>
          <Stat
            value={commaNumber(data.gunRightsDirect)}
            label="gun rights direct"
            color={full ? 'rep' : 'text'}
            lg
          />
          <Stat
            value={commaNumber(data.gunRightsSupport)}
            label="rights support"
            color="rep"
            half
          />
          <Stat
            value={commaNumber(data.gunControlOpposed)}
            label="control opposition"
            color="rep"
            half
          />
          <Stat
            value={commaNumber(data.gunControlDirect)}
            label="gun control direct"
            color="dem"
            lg
          />
          <Stat
            value={commaNumber(data.gunControlSupport)}
            label="control support"
            color="dem"
            half
          />
          <Stat
            value={commaNumber(data.gunRightsOpposed)}
            label="rights opposition"
            color="dem"
            half
          />
        </>
      ) : (
        <Stat
          value={commaNumber(data.gunRightsTotal)}
          unit="$"
          label="gun rights funding"
          lg
        />
      )}
      <Stat
        value={data.rank}
        unit="#"
        of="531"
        label={`${full ? 'rank' : 'gun-funded'} in Congress`}
        lg
      />
    </StatGrid>
  </Card>
)

const Wrapper = ({ full, data, ...props }) =>
  full ? (
    <Profile data={data} full {...props} />
  ) : (
    <Link
      href="/profiles/[id]"
      as={`/profiles/${data.id}`}
      passHref
      prefetch={false}
    >
      <Profile
        data={data}
        sx={{
          display: 'block',
          textDecoration: 'none',
          WebkitTapHighlightColor: 'transparent',
          transition:
            'transform .125s ease-in-out, box-shadow .125s ease-in-out',
          ':hover,:focus': { transform: 'scale(1.0625)', boxShadow: 'elevated' }
        }}
        {...props}
      />
    </Link>
  )

export default Wrapper
