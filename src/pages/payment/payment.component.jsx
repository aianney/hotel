import React, { useContext } from 'react'
import { Box } from '@material-ui/core'
import PaymentContent from '../../components/payment-method/payment-content/payment-content.component'
import PageStepper from '../../components/page-stepper/page-stepper.component'
import { AppContext } from '../../components'
import './payment.styles.css'

const Payment = ({ handlePressGuestDetails }) => {
  const { info } = useContext(AppContext)

  return (
    <Box className="payment" p={4}>
      {console.log(info.roomSelection)}
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
