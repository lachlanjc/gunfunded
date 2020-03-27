import React, { useEffect, useRef, useState } from 'react'
import {
  Container,
  Heading,
  Box,
  Flex,
  Label,
  Input,
  Link as A
} from 'theme-ui'
import { filter, orderBy } from 'lodash'
import Router from 'next/router'
import Link from 'next/link'
import Header from '../../components/header'
import Map from 'react-usa-map'
import states from '../../data/states.json'
import useFocusable from '../../lib/use-focusable'

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
            s.abbrev.toLowerCase().includes(j)
        )
      )
    } else {
      setList(states)
    }
  }, [jump])

  const input = useRef(null)
  useFocusable(input, 'Filter list')

  return [
    <Label htmlFor="state" variant="hidden" key="label">
      Filter list
    </Label>,
    <Input
      key="input"
      type="search"
      name="state"
      onChange={onChange}
      placeholder="Filter list…"
      value={jump}
      ref={input}
    />,
    <Flex sx={{ flexWrap: 'wrap', mx: -2, mt: 3 }} key="list">
      {list.map(state => (
        <Link
          href={`/states/${state.abbrev}`}
          key={state.abbrev}
          prefetch={false}
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
  Router.push('/states/' + e.target.dataset.name)
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
        py: [1, 3, 4],
        px: 0,
        svg: { maxHeight: ['50vh', 'auto'] }
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
