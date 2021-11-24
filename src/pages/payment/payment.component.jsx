import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import PageStepper from '../../components/page-stepper/page-stepper.component'
import {
  PaymentContent,
  PaymentPrice,
  PaymentInformation,
} from '../../components'
import './payment.styles.css'

const PaymentPage = ({ handlePressGuestDetails, ...rest }) => {
  // const {
  //   info: guestDetails,
  //   payment,
  //   roomSelection,
  //   filters,
  //   reservationDates,
  //   reservationInformation,
  // } = useContext(AppContext)

  return (
    <Box>
      <Box my={4}>
        <PageStepper activeStep={2} onClick={handlePressGuestDetails} />
      </Box>
      <Box px={4}>
        <Grid container sx={{ mb: 2 }}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'block',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="pageTitle">Booking Details</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3} sx={{ px: 4, mb: 8 }}>
        <Grid item xs={12} md={6}>
          <PaymentInformation />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <PaymentInformation />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentContent />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentPrice />
        </Grid>
      </Grid>
    </Box>
  )
}

export default PaymentPage
