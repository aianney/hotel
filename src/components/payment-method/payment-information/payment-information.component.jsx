import React, { useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { AppContext, Theme } from '../..'
import moment from 'moment'

const PaymentInformation = () => {
  const {
      info: { filters, guestDetails },
    } = useContext(AppContext),
    font = {
      fontWeight: Theme.typography.bold,
      fontSize: `calc(${Theme.typography.fontSize} - 2px)`,
    },
    alignCenter = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }

  return (
    <Grid container>
      <Grid item xs={12} sx={alignCenter}>
        <Typography variant="priceBreakdownTitle" sx={{ ...font }}>
          Name:
        </Typography>
        <Typography variant="pageTitle" sx={{ ...font }}>
          {`${guestDetails.firstName} ${guestDetails.lastName}`}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={alignCenter}>
        <Typography variant="priceBreakdownTitle" sx={{ ...font }}>
          Email:
        </Typography>
        <Typography variant="pageTitle" sx={{ ...font }}>
          {guestDetails.email}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={alignCenter}>
        <Typography variant="priceBreakdownTitle" sx={{ ...font }}>
          Contact No.:
        </Typography>
        <Typography variant="pageTitle" sx={{ ...font }}>
          {guestDetails.phoneNumber}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={alignCenter}>
        <Typography variant="priceBreakdownTitle" sx={{ ...font }}>
          Stay Period:
        </Typography>
        <Typography variant="pageTitle" sx={{ ...font }}>
          {`${moment(filters.reservationDates.start).format(
            'MMM. DD, YYYY',
          )} - ${moment(filters.reservationDates.end).format('MMM. DD, YYYY')}`}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PaymentInformation
