import React, { useState } from 'react'
import { Heading, Box, Flex, Link as A } from '@theme-ui/components'
import { filter } from '../'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import Header from '../../components/header'
import Map from 'react-usa-map'
import states from 'react-usa-map/src/data/usa-states-dimensions.json'

const mapHandler = e => {
  Router.push('/states/' + e.target.dataset.name.toLowerCase())
}

export default () => {
  const [filter, setFilter] = useState('')
  const list = Object.values(states)

  return (
    <Box sx={{ minHeight: '100vh', bg: 'background' }}>
      <Head>
        <title>States – Gun Funded</title>
      </Head>
      <Header title="States" />
      <Box
        as="article"
        variant="container"
        sx={{
          maxWidth: 1024,
          display: 'flex',
          justifyContent: 'center',
          py: [2, 3, 4]
        }}
      >
        <Map onClick={mapHandler} />
      </Box>
      <Box as="article" variant="container" sx={{ py: [2, 3, 4] }}>
        <Heading as="h2" sx={{ color: 'blue' }}>
          All states
        </Heading>
        <Flex sx={{ flexWrap: 'wrap', mx: -2, py: 3 }}>
          {Object.values(states).map(state => (
            <Link
              href={`/states/${state.abbreviation}`}
              key={state.abbreviation}
            >
              <A
                sx={{
                  cursor: 'pointer',
                  borderRadius: 'circle',
                  fontWeight: 'bold',
                  color: 'text',
                  px: 2,
                  py: 1,
                  mr: 2,
                  mb: 2,
                  ':focus, :hover': {
                    bg: 'smoke'
                  },
                  ':active': {
                    color: 'blue'
                  }
                }}
              >
                {state.name}
              </A>
            </Link>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
