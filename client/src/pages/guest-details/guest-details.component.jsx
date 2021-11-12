import React from 'react'
import { GuestDetailsForm, PageStepper } from '../../components'
import { Box } from '@material-ui/core'

const GuestDetails = () => {
  return (
    <Box p={2}>
      <Box mb={2}>
        <PageStepper activeStep={1} />
      </Box>
      <Box>
        <GuestDetailsForm />
      </Box>
    </Box>
  )
}

export default GuestDetails
