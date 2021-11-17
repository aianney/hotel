import React from 'react'
import { GuestDetailsForm, PageStepper } from '../../components'
import { Box } from '@material-ui/core'

const GuestDetails = () => {
  return (
    <Box
      mt={3}
      p={2}
      xs={0}
      sx={{
        padding: {
          xs: 0,
          md: 2,
        },
      }}
    >
      <Box mb={4}>
        <PageStepper activeStep={1} />
      </Box>
      <Box>
        <GuestDetailsForm />
      </Box>
    </Box>
  )
}

export default GuestDetails
