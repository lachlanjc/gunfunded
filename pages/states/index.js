import React, { useEffect, useRef, useState } from 'react'
import {
  Container,
  Heading,
  Box,
  Flex,
  Label,
  Input,
  Link as A
} from '@theme-ui/components'
import { filter, orderBy } from 'lodash'
import Router from 'next/router'
import Link from 'next/link'
import Header from '../../components/header'
import Map from 'react-usa-map'
import allStates from 'react-usa-map/src/data/usa-states-dimensions.json'
import useFocusable from '../../lib/use-focusable'

const states = orderBy(Object.values(allStates), 'name')

const StateList = () => {
  const [jump, setJump] = useState('')
  const [list, setList] = useState(states)
  const onChange = e =>
    setJump(e.target.value.toString().match(/[A-Za-z\s]+/g) || '')
  useEffect(() => {
    if (jump.toString().length > 0) {
      const j = jump.toString().toLowerCase()
      setList(
        filter(
          states,
          s =>
            s.name.toLowerCase().includes(j) ||
            s.abbreviation.toLowerCase().includes(j)
        )
      )
    } else {
      setList(states)
    }
  }, [jump])

  const input = useRef(null)
  const placeholder = useFocusable(input, 'Filter list')

  return [
    <Label htmlFor="state" variant="hidden" key="label">
      Filter list
    </Label>,
    <Input
      key="input"
      type="text"
      name="state"
      placeholder={placeholder}
      onChange={onChange}
      value={jump}
      ref={input}
    />,
    <Flex sx={{ flexWrap: 'wrap', mx: -2, mt: 3 }} key="list">
      {list.map(state => (
        <Link
          href={`/states/${state.abbreviation}`}
          key={state.abbreviation}
          passHref
        >
          <A
            children={state.name}
            sx={{
              cursor: 'pointer',
              borderRadius: 'circle',
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'text',
              px: 2,
              py: 1,
              mr: 2,
              mb: 2,
              ':focus, :hover': { bg: 'sunken' },
              ':active': { color: 'accent' }
            }}
          />
        </Link>
      ))}
    </Flex>
  ]
}

const mapHandler = e => {
  Router.push('/states/' + e.target.dataset.name.toLowerCase())
}

export default () => (
  <Box as="main" sx={{ minHeight: '100vh', bg: 'background' }}>
    <Header title="All States" includeMeta />
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
      <StateList />
    </Container>
  </Box>
)
