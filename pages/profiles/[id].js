import useSWR from 'swr'
import Link from 'next/link'
import {
  Box,
  Container,
  Heading,
  Card,
  Button,
  Flex,
  Grid,
  Link as A
} from '@theme-ui/components'
import {
  Phone as PhoneIcon,
  Edit as FormIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Mail as MailIcon,
  Share as ShareIcon
} from 'react-feather'
import Meta from '../../components/meta'
import Profile from '../../components/profile'
import Methodology from '../../components/profile-methodology.mdx'
import states from '../../data/states.json'
import commaNumber from 'comma-number'
import { capitalize, find, last } from 'lodash'

const Item = ({ label, color, ...props }) => {
  const Icon = {
    Call: PhoneIcon,
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
  <div>
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

const url = 'http://hackpenn.com/'
const twitterURL = (text, u) =>
  `https://twitter.com/intent/tweet?text=${text
    .split(' ')
    .join('%20')}&url=${u}`
const facebookURL = u => `https://www.facebook.com/sharer/sharer.php?u=${u}`
const emailURL = (subject, body) =>
  `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`

const Page = ({ profile }) => {
  const state = find(states, ['abbrev', profile.state.toUpperCase()])
  const url = `https://gunfunded.now.sh/profiles/${profile.id}`
  const name = `${profile.role === 'sen' ? 'Sen.' : 'Rep.'} ${
    profile.name.full
  }`
  const title = `${name} on Gun Funded`
  const desc = `View ${state.name} ${
    profile.role === 'sen' ? 'Senator' : 'Representative'
  } ${profile.name.full}’s gun lobby funding ($${commaNumber(
    profile.gunRightsTotal
  )}) on Gun Funded.`
  const body = [desc, url].join('\n\n')
  return (
    <Box as="main" sx={{ bg: 'background' }}>
      <Meta title={name} description={desc} />
      <Container sx={{ py: [3, 4] }}>
        <Profile data={profile} full />
        <Grid gap={4} columns={[null, 2]} as="section" sx={{ my: 4 }}>
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
                onClick={e => {
                  try {
                    navigator.share({ title, body, url })
                  } catch {}
                }}
              >
                <ShareIcon />
                Share
              </Button>
              <Item href={emailURL(title, body)} label="Email" />
              <Item
                href={twitterURL(
                  profile.contact.twitter
                    ? `.@${profile.contact.twitter}’s gun lobby funding on @gunfunded`
                    : `${name} on @gunfunded`,
                  url
                )}
                label="Twitter"
              />
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
        <Grid gap={4} columns={[null, 2]} as="section" sx={{ my: 4 }}>
          <Link
            href="/states/[state]"
            as={`/states/${state.abbrev.toLowerCase()}`}
            passHref
          >
            <Card as="a" variant="nav">
              See all from {state.name}
            </Card>
          </Link>
        </Grid>
        <Card
          variant="sunken"
          sx={{
            color: 'secondary',
            mt: [3, 4],
            a: { color: 'accent' },
            'p:last-of-type': { mb: 0 }
          }}
        >
          <Methodology />
        </Card>
      </Container>
    </Box>
  )
}

Page.getInitialProps = async context => {
  const { id } = context.query
  const data = await fetch(`https://gunfunded.now.sh/api/profiles?id=${id}`)
  if (data.ok) {
    const profile = await data.json()
    return { profile }
  } else {
    return { statusCode: 404 }
  }
}

export default Page
