import Head from 'next/head'
import { palette } from './theme'

const makeTitle = title =>
  title === 'Gun Funded' ? title : `${title} – Gun Funded`

export default ({
  title = 'Gun Funded',
  description = 'Visualization of the gun lobby’s $40M+ funding of the U.S. Congress.',
  image = 'https://cdn.glitch.com/00f3a6a0-e06b-437a-9b4f-558bc4fa01b1%2Fcard.png?v=1576435737382',
  color = palette.red
}) => (
  <Head>
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content="Gun Funded" />
    <meta key="twitter_site" name="twitter:site" content="@gunfunded" />
    <title>{makeTitle(title)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title)} />
    <meta key="twitter_title" name="twitter:title" content={makeTitle(title)} />
    <meta key="desc" name="description" content={description} />
    <meta key="og_desc" property="og:description" content={description} />
    <meta key="twitter_desc" name="twitter:description" content={description} />
    <meta key="og_img" property="og:image" content={image} />
    <meta
      key="twitter_card"
      name="twitter:card"
      content="summary_large_image"
    />
    <meta key="twitter_img" name="twitter:image" content={image} />
    <meta key="theme_color" name="theme-color" content={color} />
    <meta key="tile_color" name="msapplication-TileColor" content={color} />
    <link
      key="safari_icon"
      rel="mask-icon"
      href="/safari-pinned-tab.svg"
      color={color}
    />
    <link
      key="apple_icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />
    <link
      key="favicon_32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />
    <link
      key="favicon_16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />
    <link key="manifest" rel="manifest" href="/site.webmanifest" />
    <script
      key="heap"
      type="text/javascript"
    >{`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};heap.load("1510743292");`}</script>
  </Head>
)
