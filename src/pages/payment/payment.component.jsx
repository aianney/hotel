import React, { useContext } from 'react'
import { Box, Grid } from '@material-ui/core'
import PageStepper from '../../components/page-stepper/page-stepper.component'
import { AppContext } from '../../components'
import './payment.styles.css'
import PaymentContent from '../../components/payment-method/payment-content/payment-content.component'
import PaymentPrice from '../../components/payment-method/payment-price/payment-price.component'
//import PaymentOption from '../../components/payment-method/payment-options/payment.options.component'

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
    <Box mt={3}>
      {/* {console.log(info.roomSelection)} */}
      <Box mb={4}>
        <PageStepper activeStep={2} onClick={handlePressGuestDetails} />
      </Box>
      <Grid item xs={6}>
        <PaymentContent />
      </Grid>
      <PaymentPrice />
      {/* <PaymentOption /> */}
      {/* <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <PaymentPrice />
        </Grid>
        <Grid item xs={6} md={4}>
          <PaymentOption />
        </Grid>
      </Grid> */}
    </Box>
  )
}

export default PaymentPage
