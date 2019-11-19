import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Profile from './profile'
import { Box, Label, Input, Button, Spinner } from '@theme-ui/components'

export default () => {
  const [address, setAddress] = useState('')
  const [rep, setRep] = useState(null)
  let value = <div />
  let submit = 'Search'

  const fetchRep = async () => {
    const res = await fetch(
        `/api/locate?address=${encodeURIComponent(address)}`
    )
    const data = await res.json()
    console.log(data)
    setRep(data)
    submit = 'Search'
  }
  const onSubmit = e => {
    e.preventDefault()
    submit = <Spinner size={24} />
    fetchRep()
  }
  const onChange = e => {
    setAddress(e.target.value)
  }

  if (rep) {
    value = <Profile data={rep} />
  }

  return (
    <section>
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
          <Label htmlFor="address">Home address</Label>
          <Input type="text" name="address" onChange={onChange} />
        </Box>
        <Button as="input" type="submit" onClick={onSubmit} value={submit} />
      </Box>
      {value}
    </section>
  )
}
