import React from 'react'
import { GuestDetailsForm, PageStepper } from '../../components'
import { Box } from '@material-ui/core'

const GuestDetails = () => {
  return (
    <>
      {(document.body.style.overflowY = 'scroll')}
      <Box my={4}>
        <PageStepper activeStep={1} />
      </Box>
      <GuestDetailsForm />
    </>
  )
}

export default GuestDetails
