import Head from 'next/head'

export default ({
  title = 'Gun Funded',
  description = 'Visualize & analyze the gun lobby’s funding of the U.S. Congress.',
  image = 'https://cdn.glitch.com/00f3a6a0-e06b-437a-9b4f-558bc4fa01b1%2Fcard.png?v=1576435737382',
  color
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
    <meta key="og_img" property="og:image" content={image} />
    <meta key="twitter_card" name="twitter:card" content="summary_large_image" />
    <meta key="twitter_img" name="twitter:image" content={image} />
    <meta key="theme_color" name="theme-color" content={color} />
  </Head>
)
