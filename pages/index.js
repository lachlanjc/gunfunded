import fetch from 'isomorphic-unfetch'
import Grouping from '../components/grouping'

const Page = ({ profiles }) => (
  <Grouping title="Gun Funded" profiles={profiles} />
)

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const data = await fetch(`${origin}/api/profiles`)
  const profiles = await data.json()
  return { profiles }
}

export default Page
