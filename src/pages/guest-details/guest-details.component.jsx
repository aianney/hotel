import React from 'react'
import { GuestDetailsForm, PageStepper } from '../../components'
import { Box } from '@material-ui/core'

const GuestDetails = () => {
  return (
    <Box px={1}>
      <Box my={4}>
        <PageStepper activeStep={1} />
      </Box>
      <Box>
        <GuestDetailsForm />
      </Box>
    </Box>
  )
}

export default GuestDetails
