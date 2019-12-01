import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider, ColorMode } from 'theme-ui'
import { Global } from '@emotion/core'

import theme from '../components/theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import withError from '../components/with-error'

const name = 'Gun Funded'
const desc = 'Analyzing the gun lobby’s funding of the US Congress.'

class Root extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>{name}</title>
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="@lachlanjc" />
          <meta property="twitter:description" content={desc} />
          <meta property="og:title" content={name} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://gunfunded.now.sh/" />
          <meta property="description" content={desc} />
          <meta name="theme-color" content={theme.colors.primary} />
        </Head>
        <ThemeProvider theme={theme}>
          <ColorMode />
          <Global styles={theme => ({ body: theme.styles.root })} />
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </>
    )
  }
}

export default withError(Root)
