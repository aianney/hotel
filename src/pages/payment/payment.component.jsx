import React, { useContext } from 'react'
import { Box, Grid } from '@material-ui/core'
import PageStepper from '../../components/page-stepper/page-stepper.component'
import { AppContext } from '../../components'
import './payment.styles.css'
import PaymentContent from '../../components/payment-method/payment-content/payment-content.component'
import PaymentPrice from '../../components/payment-method/paymentprice/paymentprice.component'

const PaymentPage = ({ handlePressGuestDetails, ...rest }) => {
  const {
    info: guestDetails,
    payment,
    roomSelection,
    filters: reservationDates,
  } = useContext(AppContext)

  console.log(
    JSON.stringify({
      guestDetails,
      payment,
      roomSelection,
      filters: reservationDates,
    }),
  )

  return (
    <Box p={4}>
      {/* {console.log(info.roomSelection)} */}
      <Box mb={4}>
        <PageStepper activeStep={2} onClick={handlePressGuestDetails} />
      </Box>
      {/* <Mods /> */}
      <Grid item xs={6}>
        <PaymentContent />
      </Grid>
      <PaymentPrice />
    </Box>
  )
}

export default PaymentPage
