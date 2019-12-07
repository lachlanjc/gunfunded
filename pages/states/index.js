import React, { useState } from 'react'
import { Container, Heading, Box, Flex, Link as A } from '@theme-ui/components'
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
      <Header title="States" centered />
      <Container
        as="article"
        variant="wide"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: [0, 3, 4],
          px: 0
        }}
      >
        <Map onClick={mapHandler} />
      </Container>
      <Container sx={{ py: [2, 3, 4] }}>
        <Heading as="h2" variant="headline">
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
      </Container>
    </Box>
  )
}
