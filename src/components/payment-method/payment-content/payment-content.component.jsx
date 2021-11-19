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
      {/* <Box mb={1}> */}
      <Box px={4}>
        <Grid container>
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
              {info.guestDetails.phoneNumber}
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
