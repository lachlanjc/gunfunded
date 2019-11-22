import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Profile from './profile'
import { Box, Card, Label, Input, Button, Spinner } from '@theme-ui/components'
import { isEmpty } from 'lodash'

const Loading = () => (
  <Spinner size={24} color="currentColor" sx={{ margin: '-4px 0 -6px' }} />
)

const ErrorCard = () => (
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
    Something went wrong :(
  </Card>
)

export default ({ defaultAddress = '' }) => {
  const [address, setAddress] = useState(defaultAddress)
  const [rep, setRep] = useState({})
  const [submit, setSubmit] = useState('Search')

  let value = null

  const fetchRep = async () => {
    const res = await fetch(
      `/api/locate?address=${encodeURIComponent(address)}`
    )
    const data = await res.json()
    if (isEmpty(data) || data.error) {
      value = <ErrorCard />
    } else {
      setSubmit('Search')
      setRep(data)
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

  if (rep.party) {
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
        <Button
          type="submit"
          onClick={onSubmit}
          sx={{ minWidth: 72 }}
          children={submit}
        />
      </Box>
      {value}
    </section>
  )
}
