import {
  useColorMode,
  Box,
  Container,
  Heading,
  Card,
  Button,
  Flex,
  Grid,
  Divider,
  Link as A
} from 'theme-ui'
import {
  Phone as PhoneIcon,
  Edit as FormIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Mail as MailIcon,
  Share as ShareIcon
} from 'react-feather'
import Error from 'next/error'
import Link from 'next/link'
import Meta from '../../components/meta'
import Profile from '../../components/profile'
import Search from '../../components/search'
import Methodology from '../../components/profile-methodology.mdx'
import loadJsonFile from 'load-json-file'
import commaNumber from 'comma-number'
import { map, capitalize, find } from 'lodash'

const Header = ({ title, desc, img, ...props }) => {
  const [mode] = useColorMode()
  return (
    <Box
      as="header"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'red',
        pt: [4, null, null, null, 5],
        pb: [4, 5, null, null, 6],
        px: [2, 3]
      }}
    >
      <Container>
        <Heading
          as="h1"
          sx={{
            color: mode === 'dark' ? 'red' : 'white',
            fontSize: [4, 5],
            fontWeight: 'heading',
            lineHeight: 'heading',
            letterSpacing: 'headline'
          }}
          children={title}
        />
        {desc && (
          <Heading
            as="h2"
            variant="subtitle"
            sx={{
              mt: 3,
              color: 'snow',
              maxWidth: ['narrowplus', null, null, 'subcontainer', 'subwide'],
              fontSize: [2, 3, null, 4],
              fontWeight: 'body',
              letterSpacing: 'headline',
              lineHeight: 'subheading'
            }}
            children={desc}
          />
        )}
      </Container>
    </Box>
  )
}

const Item = ({ label, color, ...props }) => {
  const Icon = {
    Email: MailIcon,
    Contact: FormIcon,
    Twitter: TwitterIcon,
    Facebook: FacebookIcon,
    Instagram: InstagramIcon
  }[label]
  return (
    <A
      sx={{
        color: color || label.toLowerCase(),
        pr: 4,
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
  <Flex sx={{ alignItems: 'center' }}>
    {phone && (
      <Button as="a" href={tel(phone)} title={`Call ${phone}`} sx={{ mr: 4 }}>
        <PhoneIcon />
        Call
      </Button>
    )}
    {form && <Item href={form} label="Contact" color="orange" />}
    {twitter && (
      <Item href={`https://twitter.com/${twitter}`} label="Twitter" />
    )}
    {instagram && (
      <Item href={`https://instagram.com/${instagram}`} label="Instagram" />
    )}
    {facebook && (
      <Item href={`https://facebook.com/${facebook}`} label="Facebook" />
    )}
  </Flex>
)

const twitterURL = (text, u) =>
  `https://twitter.com/intent/tweet?text=${text
    .split(' ')
    .join('%20')}&url=${u}`
const facebookURL = u => `https://www.facebook.com/sharer/sharer.php?u=${u}`
const emailURL = (subject, body) =>
  `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`

const Page = ({ state, profile }) => {
  if (!state || !profile) return <Error statusCode={404} />
  const role = profile.role === 'sen' ? 'Senator' : 'Representative'
  const url = `https://gunfunded.com/profiles/${profile.id}`
  const img = `https://cards.gunfunded.com/${profile.id}.png`
  const name = `${role.slice(0, 3)}. ${profile.name.full}`
  const title = `${name} on Gun Funded`
  const total =
    profile.fundingType === 'control'
      ? profile.gunControlTotal
      : profile.gunRightsTotal
  const desc = `View ${state.name} ${role} ${
    profile.name.full
  }’s gun lobby funding ($${commaNumber(total)}) on Gun Funded.`
  const body = [desc, url].join('\n\n')
  return (
    <Box as="main" sx={{ bg: 'background' }}>
      <Meta title={name} description={desc} image={img} />
      <Header title={name} />
      <Container sx={{ py: [3, 4] }}>
        <Profile data={profile} full />
        <Grid gap={4} columns={[null, null, 2]} as="section" sx={{ my: 4 }}>
          <div>
            <Heading
              as="h2"
              variant="subheadline"
              sx={{ color: 'text', mt: 0 }}
            >
              Share
            </Heading>
            <Flex sx={{ alignItems: 'center' }}>
              <Button
                sx={{ mr: 4 }}
                onClick={async e => {
                  try {
                    await navigator.share({ title, body, url })
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                <ShareIcon />
                Share
              </Button>
              <Item href={emailURL(title, body)} label="Email" />
              <Item
                href={twitterURL(
                  profile.contact.twitter
                    ? `.@${profile.contact.twitter}’s gun lobby funding on Gun Funded`
                    : `${name} on Gun Funded`,
                  url
                )}
                label="Twitter"
              />
              <Item href={`${img}?variant=story`} label="Instagram" />
              <Item href={facebookURL(url)} label="Facebook" />
            </Flex>
          </div>
          <div>
            <Heading
              as="h2"
              variant="subheadline"
              sx={{ color: 'text', mt: 0 }}
            >
              Contact {capitalize(profile.role)}.
            </Heading>
            <Contact id={profile.id} {...profile.contact} />
          </div>
        </Grid>
        <Divider sx={{ my: [3, 4] }} />
        <Grid gap={4} columns={[null, 2]} as="section">
          <Link
            href="/states/[state]"
            as={`/states/${state.abbrev.toUpperCase()}`}
            passHref
          >
            <Card as="a" variant="nav">
              See all from {state.name}
            </Card>
          </Link>
          <Link href={`/top-${role.toLowerCase()}s`} passHref>
            <Card as="a" variant="nav">
              See top {role}s
            </Card>
          </Link>
        </Grid>
        <Card
          sx={{
            mt: 4,
            'input, a': { bg: 'sunken', boxShadow: 'none' }
          }}
        >
          <Heading as="h2" variant="headline" sx={{ mt: 0 }}>
            Find your Representative
          </Heading>
          <Search />
        </Card>
        <Card
          variant="sunken"
          sx={{
            color: 'secondary',
            mt: [3, 4],
            a: { color: 'accent' },
            ul: { pl: 0, mb: 0 },
            'p:last-of-type': { mb: 0 }
          }}
        >
          <Methodology />
        </Card>
      </Container>
    </Box>
  )
}

export async function getStaticPaths() {
  const profiles = await loadJsonFile('./data/records.json')
  const paths = map(map(profiles, 'id'), id => ({ params: { id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const profiles = await loadJsonFile('./data/records.json')
  const profile = find(profiles, ['id', params.id])
  const states = await loadJsonFile('./data/states.json')
  const state = find(states, ['abbrev', profile.state.toUpperCase()])
  return { props: { profile, state } }
}

export default Page
