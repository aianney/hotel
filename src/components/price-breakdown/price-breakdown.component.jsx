import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  Divider,
  Fade,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core'
import { Theme, AppContext } from '..'
import moment from 'moment'

const PriceBreakdown = (props) => {
  // eslint-disable-next-line
  const { info, setInfo } = useContext(AppContext),
    history = useHistory(),
    dateDifference = moment
      .duration(
        moment(info.filters.reservationDates.end).diff(
          moment(info.filters.reservationDates.start),
        ),
      )
      .asDays()

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
            onClick={() => {
              props.setPriceBreakdownOpen(false)
              props.setProceed(false)
            }}
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
                sm: props.proceed ? 'auto' : 30,
              },
              right: {
                xs: 0,
                sm: props.proceed ? 30 : 'auto',
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
                  <Typography variant="filterLabel">
                    Price Breakdown (For {dateDifference} day
                    {dateDifference !== 1 ? 's' : ''})
                  </Typography>
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
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography>
                    x{info.roomSelection.deluxeSeaView.length}
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
                          info.roomSelection.deluxeSeaView
                            .map((e) => e.price)
                            .reduce((a, b) => a + b, 0) *
                          info.filters.currencyRate
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
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
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
                            .reduce((a, b) => a + b, 0) *
                          info.filters.currencyRate
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
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Typography>
                    x{info.roomSelection.standardRoom.length}
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
                          info.roomSelection.standardRoom
                            .map((e) => e.price)
                            .reduce((a, b) => a + b, 0) *
                          info.filters.currencyRate
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
                    display: info.roomSelection.standardRoom.length
                      ? 'flex'
                      : 'none',
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
              </Grid>
            </Box>

            <Box
              mb={2}
              mx={2}
              sx={{
                display: props.proceed ? 'flex' : 'none',
                justifyContent: 'flex-end',
              }}
            >
              <Box>
                {/* Action Buttons START */}
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: Theme.shape.borderRadius,
                  }}
                  onClick={() => {
                    history.push('/guest-details')
                  }}
                >
                  <Box
                    px={2}
                    py={1}
                    sx={{
                      fontWeight: Theme.typography.fontWeightBold,
                      textDecoration: 'none',
                      color: 'unset',
                    }}
                  >
                    Proceed
                  </Box>
                </Button>
                {/* Action Buttons END */}
              </Box>
            </Box>
          </Card>
        </Slide>
        {/* Filter Card END */}
      </Box>
    </>
  )
}

export default PriceBreakdown
