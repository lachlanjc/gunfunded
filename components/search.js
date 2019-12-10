import React, { useState, useRef } from 'react'
import fetch from 'isomorphic-unfetch'
import useFocusable from '../lib/use-focusable'
import Profile from './profile'
import { Box, Card, Label, Input, Button, Spinner } from '@theme-ui/components'
import { isEmpty } from 'lodash'

const Loading = () => (
  <Spinner size={24} color="currentColor" sx={{ margin: '-4px 0 -6px' }} />
)

const Error = ({ error = '' }) => (
  <Card
    variant="sunken"
    sx={{
      color: 'text',
      display: 'flex',
      placeContent: 'center',
      py: [3, 4],
      mb: [3, 4],
      fontWeight: 'bold'
    }}
  >
    {error}
  </Card>
)

export default ({ defaultAddress = '' }) => {
  const [address, setAddress] = useState(defaultAddress)
  const [submit, setSubmit] = useState('Search')
  const [value, setValue] = useState(null)

  const fetchRep = async () => {
    const res = await fetch(
      `/api/locate?address=${encodeURIComponent(address)}`
    )
    if (res.ok) {
      const data = await res.json()
      if (isEmpty(data)) {
        setValue(<Error error="Something went wrong" />)
      } else if (!isEmpty(data.error)) {
        setValue(<Error error="Invalid address" />)
      } else {
        setSubmit('Search')
        setValue(<Profile data={data} />)
      }
    } else {
      setValue(<Error error="Something went wrong" />)
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
  const placeholder = useFocusable(input, '')

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
        <Box sx={{ color: 'text' }}>
          <Label htmlFor="address">U.S home address</Label>
          <Input
            type="text"
            name="address"
            onChange={onChange}
            value={address}
            ref={input}
            placeholder={placeholder}
          />
        </Box>
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
