import React, { useContext } from 'react'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import Theme from '../../theme/theme.component'
import AppContext from '../../app-context/app-context.component'
import './payment-content.styles.css'

const Payment = (props) => {
  const { info, setInfo } = useContext(AppContext)
  console.log(info)

  React.useEffect(() => {
    setInfo({
      ...info,
      reservationDates: {
        ...info.filters.reservationDates.start,
        ...info.filters.reservationDates.end,
      },
    })
    // eslint-disable-next-line
  }, [info.filters.reservationDates.start, info.filters.reservationDates.end])

  return (
    <div className="booking-details">
      <Box mb={3}>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Typography variant="pageTitle" sx={{ display: 'flex' }}>
            Booking Details
          </Typography>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Name :{' '}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {`${info.guestDetails.firstName} ${info.guestDetails.lastName}`}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Email :
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {info.guestDetails.email}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Contact :
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {info.guestDetails.number}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Stay Period :
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">{`${info.filters.reservationDates.start} ${info.filters.reservationDates.end}`}</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Payment
