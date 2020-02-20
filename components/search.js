import React, { useState, useRef } from 'react'
import fetch from 'isomorphic-unfetch'
import useFocusable from '../lib/use-focusable'
import Profile from './profile'
import { Box, Card, Label, Input, Button, Spinner, Text } from 'theme-ui'
import { isEmpty } from 'lodash'

const Loading = () => (
  <Spinner
    size={24}
    color="currentColor"
    sx={{ margin: '0 !important', textAlign: 'center', minWidth: '54px' }}
  />
)

const Error = ({ error = '' }) => (
  <Card variant="error" sx={{ mb: [3, 4] }}>
    {error}
  </Card>
)

const disclaimer = (
  <Text sx={{ color: 'muted', fontSize: 0, mt: [-2, -28], textAlign: 'left' }}>
    Never stored, saved, or sold.
  </Text>
)

export default ({ defaultAddress = '' }) => {
  const [address, setAddress] = useState(defaultAddress)
  const [submit, setSubmit] = useState('Search')
  const [value, setValue] = useState(disclaimer)

  const fetchRep = async () => {
    const res = await fetch(
      `/api/locate?address=${encodeURIComponent(address)}`
    )
    setSubmit('Search')
    if (res.ok) {
      const data = await res.json()
      if (isEmpty(data) || data.error) {
        setValue(<Error error="Something went wrong" />)
      } else {
        setValue(<Profile data={data} />)
      }
    } else {
      setValue(
        <Error error="Couldn’t find a Representative for this address." />
      )
    }
  }

  const onSubmit = e => {
    setSubmit(<Loading />)
    fetchRep()
    e.preventDefault()
  }
  const onChange = e => {
    setAddress(e.target.value)
  }

  const input = useRef(null)
  useFocusable(input)

  return (
    <>
      <Box
        as="form"
        onSubmit={onSubmit}
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          mb: [3, 4]
        }}
      >
        <div>
          <Label htmlFor="address">U.S. home address</Label>
          <Input
            type="text"
            id="address"
            onChange={onChange}
            value={address}
            ref={input}
            placeholder="725 5th Ave, New York, NY"
          />
        </div>
        <Button
          type="submit"
          onClick={onSubmit}
          sx={{ minWidth: 72 }}
          children={submit}
        />
      </Box>
      {value}
    </>
  )
}
