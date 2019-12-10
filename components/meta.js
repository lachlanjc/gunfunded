import Head from 'next/head'
import theme from '../components/theme'

export default ({
  title = 'Gun Funded',
  description = 'Analyze & visualize the gun lobby’s funding of the U.S. Congress.',
  image
}) => (
  <Head>
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content="Gun Funded" />
    <meta key="twitter_site" name="twitter:site" content="@gunfunded" />
    <title>{title === 'Gun Funded' ? title : `${title} – Gun Funded`}</title>
    <meta key="og_title" property="og:title" content={title} />
    <meta key="twitter_title" name="twitter:title" content={title} />
    <meta key="desc" name="description" content={description} />
    <meta key="og_desc" property="og:description" content={description} />
    <meta key="twitter_desc" name="twitter:description" content={description} />
    {image && <meta key="og_img" property="og:image" content={image} />}
    {image && <meta key="twitter_card" name="twitter:card" content="summary_large_image" />}
    {image && <meta key="twitter_img" name="twitter:image" content={image} />}
    <meta key="theme_color" name="theme-color" content={theme.colors.primary} />
  </Head>
)
