import React, { useContext } from 'react'
import {
  Box,
  Card,
  Divider,
  Fade,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core'
import { Theme, AppContext } from '..'

const PriceBreakdown = (props) => {
  const { info } = useContext(AppContext)

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          zIndex: 1200,
        }}
      >
        {/* Backdrop START */}
        <Fade in={props.priceBreakdownOpen}>
          <Box
            onClick={() => props.setPriceBreakdownOpen(false)}
            sx={{
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,.75)',
              bottom: 0,
              height: '100vh',
              left: 0,
              width: '100vw',
              position: 'fixed',
            }}
          ></Box>
        </Fade>
        {/* Backdrop END */}

        {/* Filter Card START */}
        <Slide direction="up" in={props.priceBreakdownOpen}>
          <Card
            sx={{
              backgroundColor: Theme.palette.background.light,
              width: {
                xs: '100%',
                sm: '50vw',
              },
              position: 'fixed',
              bottom: {
                xs: 0,
                sm: 100,
              },
              left: {
                xs: 0,
                sm: 30,
              },
              borderRadius: {
                xs: Theme.shape.borderRadius,
                sm: Theme.shape.borderRadiusLg,
              },
              borderBottomLeftRadius: {
                xs: 0,
                sm: Theme.shape.borderRadiusLg,
              },
              borderBottomRightRadius: {
                xs: 0,
                sm: Theme.shape.borderRadiusLg,
              },
            }}
          >
            <Box p={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="filterLabel">Price Breakdown</Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex' }}>
                  <Typography
                    variant="priceBreakdownTitle"
                    sx={{ fontWeight: Theme.typography.bold }}
                  >
                    Deluxe Sea View
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography>
                    x{info.roomSelection.deluxeSeaView.length}
                  </Typography>
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
                <Grid
                  item
                  xs={2}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
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
                <Grid
                  item
                  xs={2}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography>
                    x{info.roomSelection.standardRoom.length}
                  </Typography>
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
                  <Typography
                    variant="priceBreakdownTitle"
                    sx={{ FontSize: 22.5 }}
                  >
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
          </Card>
        </Slide>
        {/* Filter Card END */}
      </Box>
    </>
  )
}

export default PriceBreakdown
