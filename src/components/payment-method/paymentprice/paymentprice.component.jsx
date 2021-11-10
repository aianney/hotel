import React, { useContext } from 'react'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import Theme from '../../theme/theme.component'
import AppContext from '../../app-context/app-context.component'
import './paymentprice.styles.css'

const PriceBreakdown = (props) => {
  const { info } = useContext(AppContext)

  return (
    <>
      <Box p={4}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
            <Typography variant="filterLabel">Price Breakdown</Typography>
          </Grid> */}
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography
              variant="priceBreakdownTitle"
              sx={{ fontWeight: Theme.typography.bold }}
            >
              Deluxe Sea View
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>x{info.roomSelection.deluxeSeaView.length}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              ₱{' '}
              {info.roomSelection.deluxeSeaView
                .map((e) => e.price)
                .reduce((a, b) => a + b, 0)
                .toLocaleString()}
              .00
            </Typography>
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
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>
              x{info.roomSelection.superiorSeaView.length}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              ₱{' '}
              {info.roomSelection.superiorSeaView
                .map((e) => e.price)
                .reduce((a, b) => a + b, 0)
                .toLocaleString()}
              .00
            </Typography>
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
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>x{info.roomSelection.standardRoom.length}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="priceBreakdownTitlePrice">
              ₱{' '}
              {info.roomSelection.standardRoom
                .map((e) => e.price)
                .reduce((a, b) => a + b, 0)
                .toLocaleString()}
              .00
            </Typography>
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
              {` ₱ ${parseInt(
                info.roomSelection.totalPayment,
              ).toLocaleString()}.00`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PriceBreakdown
