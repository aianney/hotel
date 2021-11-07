import React from 'react'
import { Box } from '@material-ui/core'
import PaymentContent from '../../components/payment-method/payment-content/payment-content.component'
import PageStepper from '../../components/page-stepper/page-stepper.component'

const Payment = ({ handlePressGuestDetails }) => {
  return (
    <Box p={4}>
      <Box mb={4}>
        <PageStepper activeStep={2} onClick={handlePressGuestDetails} />
      </Box>
      <Box>
        <PaymentContent />
      </Box>
    </Box>
  )
}

export default Payment