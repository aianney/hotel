import React from 'react'
import { GuestDetailsForm, PageStepper } from '../../components/components.component'
import { Box } from '@material-ui/core';

const GuestDetails = () => {
  return (
    <Box p={3}>
      <Box>
        <PageStepper activeStep={1} />
      </Box>
      <Box>
        <GuestDetailsForm />
      </Box>
    </Box>
  )
}

export default GuestDetails
