import React from 'react'
import ErrorPage from 'next/error'
import { isEmpty } from 'lodash'

const withError = App => {
  const WithErrorComponent = props => {
    const {
      pageProps: { statusCode }
    } = props
    return !isEmpty(statusCode) || statusCode !== 200 ? (
      <ErrorPage statusCode={statusCode} />
    ) : (
      <App {...props} />
    )
  }
  WithErrorComponent.getInitialProps = async appContext => {
    const props = await App.getInitialProps(appContext)
    const { ctx } = appContext
    const { statusCode } = props.pageProps
    if (statusCode) {
      if (ctx.res) ctx.res.statusCode = statusCode
    }
    return props
  }
  WithErrorComponent.displayName = 'withError(App)'
  return WithErrorComponent
}

export default withError
