import React from 'react'
import { ThemeProvider } from 'theme-ui'

import theme from '../components/theme'
import Meta from '../components/meta'
import NProgress from '../components/nprogress'
import Nav from '../components/nav'
import Footer from '../components/footer'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Meta />
      <ThemeProvider theme={theme}>
        <NProgress color={theme.colors.nav} />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
