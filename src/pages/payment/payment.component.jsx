import React, { useContext } from 'react'
import { Box } from '@material-ui/core'
import PageStepper from '../../components/page-stepper/page-stepper.component'
import { AppContext } from '../../components'
import './payment.styles.css'
import PaymentCard from '../../components/payment-method/payment-card/payment-card.component'
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
      <PaymentCard />
      <PaymentPrice />
    </Box>
  )
}

export default PaymentPage
