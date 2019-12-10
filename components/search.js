import React, { useState, useRef } from 'react'
import fetch from 'isomorphic-unfetch'
import useFocusable from '../lib/use-focusable'
import Profile from './profile'
import { Box, Card, Label, Input, Button, Spinner } from '@theme-ui/components'
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
    // fetchRep()
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
        <div>
          <Label htmlFor="address">U.S. home address</Label>
          <Input
            type="text"
            name="address"
            onChange={onChange}
            value={address}
            ref={input}
            placeholder={placeholder}
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
