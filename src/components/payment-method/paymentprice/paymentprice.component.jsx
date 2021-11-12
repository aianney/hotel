import React, { useContext } from 'react'
import { Box, Divider, Grid, Typography, Button } from '@material-ui/core'
import Theme from '../../theme/theme.component'
import AppContext from '../../app-context/app-context.component'
import './paymentprice.styles.css'
import PaymentButton from '../paymentbutton/paymentbutton.component'

const PaymentPrice = (props) => {
  const { info } = useContext(AppContext)

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Deluxe Sea View
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>x{info.roomSelection.deluxeSeaView.length}</Typography>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {info.filters.currency && info.filters.currencyRate
                ? `${info.filters.currency} ${(
                    info.roomSelection.deluxeSeaView
                      .map((e) => e.price)
                      .reduce((a, b) => a + b, 0) * info.filters.currencyRate
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`
                : 0}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: info.roomSelection.deluxeSeaView.length
                ? 'flex'
                : 'none',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => props.setDeluxeSeaView([])}
            >
              Remove Deluxe Sea View
            </Button>
          </Grid>
          <Divider />
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Superior Sea View
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>
              x{info.roomSelection.superiorSeaView.length}
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {info.filters.currency && info.filters.currencyRate
                ? `${info.filters.currency} ${(
                    info.roomSelection.superiorSeaView
                      .map((e) => e.price)
                      .reduce((a, b) => a + b, 0) * info.filters.currencyRate
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`
                : 0}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: info.roomSelection.superiorSeaView.length
                ? 'flex'
                : 'none',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => props.setSuperiorSeaView([])}
            >
              Remove Superior Sea View
            </Button>
          </Grid>
          <Divider />
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Standard Room
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>x{info.roomSelection.standardRoom.length}</Typography>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              {info.filters.currency && info.filters.currencyRate
                ? `${info.filters.currency} ${(
                    info.roomSelection.standardRoom
                      .map((e) => e.price)
                      .reduce((a, b) => a + b, 0) * info.filters.currencyRate
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`
                : 0}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: info.roomSelection.standardRoom.length ? 'flex' : 'none',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => props.setStandardRoom([])}
            >
              Remove All Standard Rooms
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography variant="priceBreakdownTitle" sx={{ FontSize: 22.5 }}>
              {'Total: '}
            </Typography>
            <Typography
              variant="priceBreakdownTitlePrice"
              sx={{ FontSize: 20 }}
            >
              {info.filters.currency && info.filters.currencyRate
                ? ` ${info.filters.currency} 
                                    ${(
                                      parseInt(
                                        info.roomSelection.totalPayment,
                                      ) * info.filters.currencyRate
                                    ).toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                    })}`
                : 0}
            </Typography>
          </Grid>
          <PaymentButton />
        </Grid>
      </Box>
    </>
  )
}

export default PaymentPrice
